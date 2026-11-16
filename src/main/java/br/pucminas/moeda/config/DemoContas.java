package br.pucminas.moeda.config;

import br.pucminas.moeda.domain.Aluno;
import br.pucminas.moeda.domain.ArquivoUpload;
import br.pucminas.moeda.domain.EmpresaParceira;
import br.pucminas.moeda.domain.InstituicaoEnsino;
import br.pucminas.moeda.domain.Usuario;
import br.pucminas.moeda.domain.Vantagem;
import br.pucminas.moeda.repository.AlunoRepository;
import br.pucminas.moeda.repository.ArquivoUploadRepository;
import br.pucminas.moeda.repository.EmpresaParceiraRepository;
import br.pucminas.moeda.repository.InstituicaoEnsinoRepository;
import br.pucminas.moeda.repository.ProfessorRepository;
import br.pucminas.moeda.repository.TransacaoEnvioRepository;
import br.pucminas.moeda.repository.UsuarioRepository;
import br.pucminas.moeda.repository.VantagemRepository;
import br.pucminas.moeda.service.ProfessorService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
@Order(200)
public class DemoContas implements CommandLineRunner {

    public static final String ALUNO_EMAIL = "aluno@pucminas.br";
    public static final String ALUNO_SENHA = "aluno123";
    public static final String EMPRESA_EMAIL = "empresa@pucminas.br";
    public static final String EMPRESA_SENHA = "empresa123";
    private static final String MOTIVO = "Reconhecimento na demonstração";
    private static final int MOEDAS_DO_ALUNO = 500;

    private final InstituicaoEnsinoRepository instituicaoRepository;
    private final EmpresaParceiraRepository empresaRepository;
    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final UsuarioRepository usuarioRepository;
    private final VantagemRepository vantagemRepository;
    private final ArquivoUploadRepository arquivoRepository;
    private final TransacaoEnvioRepository envioRepository;
    private final ProfessorService professorService;

    public DemoContas(InstituicaoEnsinoRepository instituicaoRepository,
                      EmpresaParceiraRepository empresaRepository,
                      AlunoRepository alunoRepository,
                      ProfessorRepository professorRepository,
                      UsuarioRepository usuarioRepository,
                      VantagemRepository vantagemRepository,
                      ArquivoUploadRepository arquivoRepository,
                      TransacaoEnvioRepository envioRepository,
                      ProfessorService professorService) {
        this.instituicaoRepository = instituicaoRepository;
        this.empresaRepository = empresaRepository;
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
        this.usuarioRepository = usuarioRepository;
        this.vantagemRepository = vantagemRepository;
        this.arquivoRepository = arquivoRepository;
        this.envioRepository = envioRepository;
        this.professorService = professorService;
    }

    @Override
    public void run(String... args) throws Exception {
        EmpresaParceira empresa = garantirEmpresa();
        garantirVantagem(empresa, "Café da cantina", 80, "demo-cafe.png", "demo/cafe.png");
        garantirVantagem(empresa, "Sessão de cinema", 200, "demo-cinema.png", "demo/cinema.png");
        garantirVantagem(empresa, "Livro do semestre", 350, "demo-livro.png", "demo/livro.png");

        Aluno aluno = garantirAluno();
        if (envioRepository.findByAlunoId(aluno.getId()).stream().noneMatch(envio -> MOTIVO.equals(envio.getMotivo()))) {
            Usuario ana = usuarioRepository.findByEmail(DataLoader.PROFESSOR_EMAIL)
                    .orElseThrow(() -> new IllegalStateException("Professora de demonstração não encontrada"));
            Professor professora = professorRepository.findByIdWithInstituicao(ana.getId()).orElseThrow();
            professorService.creditarSemestreSePendente(professora.getId());
            Professor atualizada = professorRepository.findById(professora.getId()).orElseThrow();
            if (atualizada.getSaldoMoedas() < MOEDAS_DO_ALUNO) {
                atualizada.creditarSemestre(MOEDAS_DO_ALUNO);
                professorRepository.save(atualizada);
            }
            professorService.enviarMoedas(professora.getId(), aluno.getId(), MOEDAS_DO_ALUNO, MOTIVO);
        }
    }

    private EmpresaParceira garantirEmpresa() {
        return empresaRepository.findByEmail(EMPRESA_EMAIL).orElseGet(() ->
                empresaRepository.save(new EmpresaParceira(
                        "Cantina do Campus", EMPRESA_EMAIL, EMPRESA_SENHA, "12.345.678/0001-90")));
    }

    private Aluno garantirAluno() {
        return alunoRepository.findByEmail(ALUNO_EMAIL).orElseGet(() -> {
            InstituicaoEnsino puc = instituicaoRepository.findByNome("PUC Minas")
                    .orElseThrow(() -> new IllegalStateException("PUC Minas não encontrada"));
            return alunoRepository.save(new Aluno(
                    "Marina Alves", ALUNO_EMAIL, ALUNO_SENHA,
                    "333.333.333-33", "MG-12.345.678",
                    "Rua da Demonstração, 10", "Engenharia de Software", puc));
        });
    }

    private void garantirVantagem(EmpresaParceira empresa, String descricao, int custo, String nomeArquivo, String recurso) throws Exception {
        boolean existe = vantagemRepository.findByEmpresaId(empresa.getId()).stream()
                .anyMatch(vantagem -> descricao.equals(vantagem.getDescricao()));
        if (existe) {
            return;
        }
        if (!arquivoRepository.existsById(nomeArquivo)) {
            ArquivoUpload arquivo = new ArquivoUpload();
            arquivo.setNome(nomeArquivo);
            arquivo.setContentType("image/png");
            arquivo.setConteudo(new ClassPathResource(recurso).getContentAsByteArray());
            arquivoRepository.save(arquivo);
        }
        Vantagem vantagem = new Vantagem();
        vantagem.setDescricao(descricao);
        vantagem.setCustoEmMoedas(custo);
        vantagem.setFotoUrl("/uploads/" + nomeArquivo);
        vantagemRepository.save(empresa.cadastrarVantagem(vantagem));
    }
}
