package br.pucminas.moeda.service;

import br.pucminas.moeda.domain.ArquivoUpload;
import br.pucminas.moeda.repository.ArquivoUploadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
public class FotoStorage {

    private static final Set<String> EXTENSOES = Set.of(".png", ".jpg", ".jpeg", ".webp", ".gif");

    private final ArquivoUploadRepository repositorio;

    public FotoStorage(ArquivoUploadRepository repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional
    public String salvar(MultipartFile foto) {
        if (foto == null || foto.isEmpty()) {
            return null;
        }
        String extensao = extensaoDe(foto);
        if (!EXTENSOES.contains(extensao)) {
            throw new IllegalArgumentException("Envie uma imagem PNG, JPEG, WEBP ou GIF");
        }
        if (foto.getSize() > 4L * 1024 * 1024) {
            throw new IllegalArgumentException("A foto deve ter no máximo 4 MB.");
        }
        try {
            String nome = UUID.randomUUID() + extensao;
            ArquivoUpload arquivo = new ArquivoUpload();
            arquivo.setNome(nome);
            arquivo.setContentType(tipoDe(extensao));
            arquivo.setConteudo(foto.getBytes());
            repositorio.save(arquivo);
            return "/uploads/" + nome;
        } catch (IOException ex) {
            throw new IllegalArgumentException("Não foi possível salvar a foto");
        }
    }

    private String extensaoDe(MultipartFile foto) {
        String tipo = foto.getContentType() == null ? "" : foto.getContentType().toLowerCase(Locale.ROOT);
        String porTipo = switch (tipo) {
            case "image/png" -> ".png";
            case "image/jpeg" -> ".jpg";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            default -> "";
        };
        if (!porTipo.isEmpty()) {
            return porTipo;
        }
        String original = foto.getOriginalFilename();
        if (original == null || !original.contains(".")) {
            return "";
        }
        return original.substring(original.lastIndexOf('.')).toLowerCase(Locale.ROOT);
    }

    private String tipoDe(String extensao) {
        return switch (extensao) {
            case ".png" -> "image/png";
            case ".webp" -> "image/webp";
            case ".gif" -> "image/gif";
            default -> "image/jpeg";
        };
    }
}
