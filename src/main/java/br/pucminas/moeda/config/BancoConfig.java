package br.pucminas.moeda.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotatedTypeMetadata;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Configuration
@Conditional(BancoConfig.UrlRemota.class)
public class BancoConfig {

    @Bean
    public DataSource dataSource() {
        String bruto = primeiro(
                System.getenv("DATABASE_URL_UNPOOLED"),
                System.getenv("POSTGRES_URL_NON_POOLING"),
                System.getenv("DATABASE_URL"),
                System.getenv("POSTGRES_URL"));
        HikariConfig config = new HikariConfig();
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(2);
        if (bruto.startsWith("jdbc:")) {
            config.setJdbcUrl(bruto);
        } else {
            aplicarLibpq(bruto, config);
        }
        System.err.println("Banco configurado em " + hostDe(config.getJdbcUrl()));
        return new HikariDataSource(config);
    }

    private static void aplicarLibpq(String bruto, HikariConfig config) {
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
        config.setJdbcUrl(jdbc);
        config.setUsername(usuario);
        config.setPassword(senha);
    }

    private static String hostDe(String jdbc) {
        String resto = jdbc.replaceFirst("^jdbc:postgresql://", "");
        int arroba = resto.lastIndexOf('@');
        if (arroba >= 0) {
            resto = resto.substring(arroba + 1);
        }
        int barra = resto.indexOf('/');
        return barra >= 0 ? resto.substring(0, barra) : resto;
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

    static class UrlRemota implements Condition {
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            return primeiro(
                    System.getenv("DATABASE_URL_UNPOOLED"),
                    System.getenv("POSTGRES_URL_NON_POOLING"),
                    System.getenv("DATABASE_URL"),
                    System.getenv("POSTGRES_URL")) != null;
        }
    }
}
