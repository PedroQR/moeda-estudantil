package br.pucminas.moeda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MoedaEstudantilApplication {

    public static void main(String[] args) {
        boolean bancoNoAmbiente = System.getenv("DATABASE_URL") != null
                || System.getenv("DATABASE_URL_UNPOOLED") != null
                || System.getenv("POSTGRES_URL") != null;
        System.err.println(bancoNoAmbiente
                ? "Variavel de banco encontrada no ambiente."
                : "Nenhuma variavel de banco no ambiente.");
        SpringApplication.run(MoedaEstudantilApplication.class, args);
    }
}
