---
version: 1
slug: "frontend-src-app-jsx"
primary_target: "frontend/src/App.jsx"
related_targets: ["frontend/src/estilos.css","frontend/src/componentes/Moldura.jsx"]
---

# Front React do Moeda (todas as telas)

Modo: Operate. Público: professores e banca da disciplina durante a demo, alternando perfis de aluno, professor e empresa, geralmente em notebook ou projetor. Tarefas: ver saldo, enviar moedas com motivo, resgatar vantagem, conferir cupom, ler extrato e e-mails. Restrições: preservar rotas, chamadas à API, textos factuais, acessibilidade (pular para conteúdo, rótulos, foco) e o build servido pelo Spring.

## Direction contract

THESIS: O saldo como sinal público, no idioma dos programas de identidade brasileiros dos anos 60–70: campos de cor chapada, grade rígida, cantos retos. Recusa o painel SaaS de cartões brancos com acento azul.

OWN-WORLD: Trilho ultramar #2433b8 com a marca modular de quatro quartos; campo amarelo #f6c21b reservado a saldo, valor e seleção; tinta #121212; fundo #f5f5f2 com uma única rampa de neutros; vermelho #d23a26 só para erro e ações destrutivas. Archivo larga e pesada nos números, Archivo regular no texto, JetBrains Mono só em código de cupom. Sem sombras, sem raio.

STORY: O avaliador entra num perfil, vê o saldo e a próxima ação sem procurar, e entende de onde as moedas vieram e para onde foram.

FIRST VIEWPORT: Trilho de 15.5rem à esquerda (marca, navegação, identidade, sair). No miolo, nome e curso; campo amarelo de largura total com o saldo em números largos (~8rem) e, à direita, bloco preto com a ação primária e a secundária; abaixo, a régua de movimentos; abaixo, a tabela.

FORM: direção sorteada, candidata 3 de 7, seed:0248de55f824480f. Assinatura: régua de movimentos, blocos com largura proporcional ao valor (entrada ultramar, saída preta), cada bloco ligado à sua linha da tabela por hover e foco. Movimento: a régua cresce da esquerda uma vez ao carregar, ease-out exponencial, desligada com reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
