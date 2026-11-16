package br.pucminas.moeda.web;

import br.pucminas.moeda.domain.ArquivoUpload;
import br.pucminas.moeda.repository.ArquivoUploadRepository;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
public class ArquivoController {

    private final ArquivoUploadRepository repositorio;

    public ArquivoController(ArquivoUploadRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping("/uploads/{nome:.+}")
    public ResponseEntity<byte[]> baixar(@PathVariable String nome) {
        return repositorio.findById(nome)
                .map(this::resposta)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private ResponseEntity<byte[]> resposta(ArquivoUpload arquivo) {
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(arquivo.getContentType()))
                .cacheControl(CacheControl.maxAge(Duration.ofHours(1)).cachePublic())
                .body(arquivo.getConteudo());
    }
}
