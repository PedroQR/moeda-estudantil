package br.pucminas.moeda.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String explicita = System.getenv("SPRING_DATASOURCE_URL");
        if (explicita != null && explicita.startsWith("jdbc:")) {
            return;
        }
        String bruto = primeiro(
                System.getenv("DATABASE_URL_UNPOOLED"),
                System.getenv("POSTGRES_URL_NON_POOLING"),
                System.getenv("DATABASE_URL"),
                System.getenv("POSTGRES_URL"),
                explicita);
        if (bruto == null || bruto.isBlank()) {
            return;
        }
        Map<String, Object> propriedades = new LinkedHashMap<>();
        if (bruto.startsWith("jdbc:")) {
            propriedades.put("spring.datasource.url", bruto);
        } else {
            aplicarUrlLibpq(bruto, propriedades);
        }
        propriedades.put("spring.datasource.driver-class-name", "org.postgresql.Driver");
        propriedades.put("spring.datasource.hikari.maximum-pool-size", "2");
        propriedades.put(
                "spring.session.jdbc.schema",
                "classpath:org/springframework/session/jdbc/schema-postgresql.sql");
        environment.getPropertySources().addFirst(new MapPropertySource("databaseUrl", propriedades));
        Object url = propriedades.get("spring.datasource.url");
        String host = url == null ? "?" : String.valueOf(url).replaceFirst("^jdbc:postgresql://", "").split("/")[0];
        System.err.println("Banco configurado em " + host);
    }

    private static void aplicarUrlLibpq(String bruto, Map<String, Object> propriedades) {
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
        propriedades.put("spring.datasource.url", jdbc);
        propriedades.put("spring.datasource.username", usuario);
        propriedades.put("spring.datasource.password", senha);
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
