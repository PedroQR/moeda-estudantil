package br.pucminas.moeda.repository;

import br.pucminas.moeda.domain.ArquivoUpload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArquivoUploadRepository extends JpaRepository<ArquivoUpload, String> {
}
