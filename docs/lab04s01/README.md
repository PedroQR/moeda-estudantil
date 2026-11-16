# Lab04S01 — Diagramas de sequência e visão geral de interação

Entrega da Sprint 1 do Laboratório 4. Os diagramas descrevem o código atual: a tela React chama a API REST, e os fluxos de moeda, extrato, vantagem e e-mail já implementados.

O envio SMTP aparece depois do commit. UC05 inclui UC08. UC07 inclui UC09, com o mesmo código de cupom para o aluno e para a empresa.

## PDF de entrega

Arquivo para envio da sprint: **[Lab04S01_Moeda_Estudantil.pdf](Lab04S01_Moeda_Estudantil.pdf)**

Para regenerar:

```powershell
java -jar .\.tools\plantuml.jar -tpng -charset UTF-8 -o "$PWD\docs\lab04s01\images" docs\lab04s01\*.puml
python docs\lab04s01\gerar_pdf.py
```

## Artefatos

1. **Visão geral de interação** — [`visao-geral-interacao.puml`](visao-geral-interacao.puml) · [PNG](images/visao-geral-interacao.png)
2. **UC01 — Realizar login** — [`sequencia-uc01-login.puml`](sequencia-uc01-login.puml) · [PNG](images/sequencia-uc01-login.png)
3. **UC02 — Cadastrar aluno** — [`sequencia-uc02-cadastrar-aluno.puml`](sequencia-uc02-cadastrar-aluno.puml) · [PNG](images/sequencia-uc02-cadastrar-aluno.png)
4. **UC03 — Cadastrar empresa parceira** — [`sequencia-uc03-cadastrar-empresa.puml`](sequencia-uc03-cadastrar-empresa.puml) · [PNG](images/sequencia-uc03-cadastrar-empresa.png)
5. **UC04 — Cadastrar vantagens** — [`sequencia-uc04-cadastrar-vantagem.puml`](sequencia-uc04-cadastrar-vantagem.puml) · [PNG](images/sequencia-uc04-cadastrar-vantagem.png)
6. **UC05 — Enviar moedas ao aluno** — [`sequencia-uc05-enviar-moedas.puml`](sequencia-uc05-enviar-moedas.puml) · [PNG](images/sequencia-uc05-enviar-moedas.png)
7. **UC06 — Consultar extrato** — [`sequencia-uc06-consultar-extrato.puml`](sequencia-uc06-consultar-extrato.puml) · [PNG](images/sequencia-uc06-consultar-extrato.png)
8. **UC07 — Resgatar vantagem** — [`sequencia-uc07-resgatar-vantagem.puml`](sequencia-uc07-resgatar-vantagem.puml) · [PNG](images/sequencia-uc07-resgatar-vantagem.png)
9. **UC08 — Notificar recebimento de moedas** — [`sequencia-uc08-notificar-recebimento.puml`](sequencia-uc08-notificar-recebimento.puml) · [PNG](images/sequencia-uc08-notificar-recebimento.png)
10. **UC09 — Enviar cupom de resgate** — [`sequencia-uc09-enviar-cupom.puml`](sequencia-uc09-enviar-cupom.puml) · [PNG](images/sequencia-uc09-enviar-cupom.png)
11. **UC10 — Creditar moedas semestrais** — [`sequencia-uc10-credito-semestral.puml`](sequencia-uc10-credito-semestral.puml) · [PNG](images/sequencia-uc10-credito-semestral.png)
