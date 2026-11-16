# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Projeto da disciplina Projeto de Software (PUC Minas, Laboratório 3). Quem vê e usa as telas, na prática, são os professores da disciplina e a banca durante a apresentação e a avaliação da demo, navegando pelos três perfis com contas de demonstração.

Os perfis simulados pelo sistema:

- **Professor:** recebe 1.000 moedas por semestre e as envia a alunos, sempre com um motivo, como reconhecimento.
- **Aluno:** cadastra-se, recebe moedas, consulta o extrato e troca o saldo por vantagens.
- **Empresa parceira:** cadastra-se, publica vantagens (descrição, foto e custo em moedas) e confere os cupons dos resgates.

## Product Purpose

Sistema de mérito estudantil: o professor reconhece um aluno com moedas e registra o motivo, o aluno troca o saldo por vantagens de empresas parceiras e a empresa confere o cupom na hora da troca. O sucesso da demo depende de o avaliador entender o ciclo envio → saldo → resgate → cupom e de as regras (saldo, crédito semestral, e-mail com cupom) aparecerem corretas e legíveis.

## Positioning

O reconhecimento é pessoal e justificado: cada moeda carrega o nome do professor e um motivo escrito, e cada resgate gera um cupom com código verificável pela empresa.

## Operating Context

- Demo em sala, geralmente em notebook ou projetor, alternando entre os perfis.
- Professores pré-cadastrados: ana.souza@pucminas.br e carlos.lima@ufmg.br, senha prof123.
- E-mails das notificações são capturados localmente pelo Mailpit (http://localhost:8025) e não chegam às caixas reais.
- O front React (Vite) roda em `frontend/` e fala com a API Spring em `/api`, com sessão por cookie. O build é servido pelo Spring em `src/main/resources/static`.

## Capabilities and Constraints

- Rotas: visitante (`/`, `/entrar`, `/cadastro/aluno`, `/cadastro/empresa`); aluno (`/aluno`, `/aluno/extrato`, `/aluno/vantagens`, `/aluno/editar`); professor (`/professor`, `/professor/enviar`, `/professor/extrato`); empresa (`/empresa`, `/empresa/editar`, `/empresa/vantagens/nova`, `/empresa/vantagens/:id`).
- Crédito semestral automático de 1.000 moedas ao professor, com recuperação de semestres pendentes.
- E-mail registra situação: pendente, falha, enviado (aceito pelo SMTP) ou legado.
- Fotos de vantagens só são aceitas a partir de `/uploads/`.
- Terminologia em uso: "moedas", "saldo", "vantagem", "resgate", "cupom", "extrato", "Meu balcão".
- Interface toda em português do Brasil.

## Brand Commitments

Nenhum. O nome e o visual podem mudar livremente.

## Evidence on Hand

- Dados reais vêm só do banco local da demo; não há clientes, depoimentos, métricas nem parceiros reais. Não inventar números de uso, instituições parceiras ou empresas.
- Instituições existentes no seed: PUC Minas e UFMG.

## Product Principles

1. O saldo é o centro: cada perfil deve ver o próprio saldo e o próximo passo possível sem procurar.
2. Todo movimento de moedas é rastreável: quem, quanto, quando e por quê.
3. Clareza para quem avalia: o fluxo deve ser compreensível por quem vê a demo pela primeira vez.
4. Ações destrutivas (excluir cadastro, excluir vantagem) ficam visíveis, porém separadas e confirmadas.

## Accessibility & Inclusion

Manter o link "Ir para o conteúdo", foco visível, rótulos em todos os campos e contraste legível em projetor.
