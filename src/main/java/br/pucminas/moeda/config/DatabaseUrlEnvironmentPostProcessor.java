package br.pucminas.moeda.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String explicita = System.getenv("SPRING_DATASOURCE_URL");
        if (explicita != null && !explicita.isBlank()) {
            return;
        }
        String bruto = primeiro(
                environment.getProperty("DATABASE_URL"),
                environment.getProperty("POSTGRES_URL"));
        if (bruto == null || bruto.isBlank() || bruto.startsWith("jdbc:")) {
            return;
        }
        URI uri = URI.create(bruto.replaceFirst("^postgres://", "postgresql://"));
        String usuario = "";
        String senha = "";
        String userInfo = uri.getUserInfo();
        if (userInfo != null) {
            int separador = userInfo.indexOf(':');
            if (separador >= 0) {
                usuario = decodificar(userInfo.substring(0, separador));
                senha = decodificar(userInfo.substring(separador + 1));
            } else {
                usuario = decodificar(userInfo);
            }
        }
        String consulta = uri.getRawQuery();
        String jdbc = "jdbc:postgresql://" + uri.getHost()
                + (uri.getPort() > 0 ? ":" + uri.getPort() : "")
                + uri.getPath()
                + (consulta == null || consulta.isBlank() ? "?sslmode=require" : "?" + consulta);
        if (uri.getHost() != null && uri.getHost().contains("-pooler") && !jdbc.contains("prepareThreshold=")) {
            jdbc = jdbc + "&prepareThreshold=0";
        }
        Map<String, Object> propriedades = new LinkedHashMap<>();
        propriedades.put("spring.datasource.url", jdbc);
        propriedades.put("spring.datasource.username", usuario);
        propriedades.put("spring.datasource.password", senha);
        propriedades.put("spring.datasource.driver-class-name", "org.postgresql.Driver");
        propriedades.put("spring.datasource.hikari.maximum-pool-size", "2");
        environment.getPropertySources().addFirst(new MapPropertySource("databaseUrl", propriedades));
    }

    private static String primeiro(String... valores) {
        for (String valor : valores) {
            if (valor != null && !valor.isBlank()) {
                return valor;
            }
        }
        return null;
    }

    private static String decodificar(String valor) {
        return URLDecoder.decode(valor, StandardCharsets.UTF_8);
    }
}
