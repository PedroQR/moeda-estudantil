---
name: Moeda estudantil
description: Sistema de mérito estudantil em que o saldo aparece como sinal público, em campos de cor chapada.
colors:
  ultramar: "#2433b8"
  ultramar-escuro: "#1a2690"
  ultramar-claro: "#e3e6f7"
  amarelo: "#f6c21b"
  amarelo-vivo: "#ffd447"
  amarelo-claro: "#fdf1c7"
  amarelo-tinta: "#4d3c00"
  vermelho: "#d23a26"
  vermelho-texto: "#b02b18"
  vermelho-claro: "#fbe3de"
  tinta: "#121212"
  n0: "#ffffff"
  n50: "#f5f5f2"
  n100: "#ebebe6"
  n200: "#d9d9d2"
  n400: "#a3a39b"
  n600: "#5a5a53"
typography:
  saldo:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "7.5rem"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.035em"
    fontVariation: '"wdth" 125'
  display:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "6rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
    fontVariation: '"wdth" 122'
  headline:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 850
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontVariation: '"wdth" 112'
  title:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontVariation: '"wdth" 108'
  numeral:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 850
    letterSpacing: "-0.02em"
    fontVariation: '"wdth" 112'
  body-lead:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"tnum"'
  label:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
  table-head:
    fontFamily: "Archivo Variable, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.07em"
  cupom:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  regua-gap: "3px"
  acoes-gap: "0.75rem"
  coluna-gap: "1.25rem"
  saldo-margem: "2.5rem"
  secao-topo: "3.25rem"
  trilho: "15.5rem"
  form-max: "46rem"
  miolo-max: "78rem"
components:
  button-primary:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.n0}"
    rounded: "{rounded.none}"
    padding: "0 1.35rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.ultramar-escuro}"
  button-amarelo:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "0 1.35rem"
    height: "3rem"
  button-amarelo-hover:
    backgroundColor: "{colors.amarelo-vivo}"
  button-secundario:
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "0 1.35rem"
    height: "3rem"
  button-secundario-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.n0}"
  button-claro:
    textColor: "{colors.n0}"
    rounded: "{rounded.none}"
    padding: "0 1.35rem"
    height: "3rem"
  button-claro-hover:
    backgroundColor: "{colors.n0}"
    textColor: "{colors.tinta}"
  button-perigo:
    textColor: "{colors.vermelho-texto}"
    rounded: "{rounded.none}"
    padding: "0 1.35rem"
    height: "3rem"
  button-perigo-hover:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.n0}"
  button-pequeno:
    padding: "0 0.9rem"
    height: "2.35rem"
  button-disabled:
    backgroundColor: "{colors.n100}"
    textColor: "{colors.n600}"
  input:
    backgroundColor: "{colors.n0}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "0.6rem 0.8rem"
    height: "3rem"
  trilho:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.n0}"
    width: "{spacing.trilho}"
  nav-link-ativo:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.tinta}"
    padding: "0.85rem 1.5rem"
  saldo:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.tinta}"
    typography: "{typography.saldo}"
    padding: "1.75rem 2.25rem 2rem"
  saldo-acoes:
    backgroundColor: "{colors.tinta}"
    padding: "2rem"
    width: "17.5rem"
  regua-bloco-entrada:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.n0}"
    height: "4.25rem"
  regua-bloco-saida:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.n0}"
    height: "4.25rem"
  regua-bloco-ativo:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.tinta}"
  linha-ativa:
    backgroundColor: "{colors.amarelo-claro}"
  faixa:
    backgroundColor: "{colors.ultramar-claro}"
    textColor: "{colors.ultramar-escuro}"
    padding: "0.9rem 1.1rem"
  faixa-erro:
    backgroundColor: "{colors.vermelho-claro}"
    textColor: "{colors.vermelho-texto}"
  selo-ok:
    backgroundColor: "{colors.ultramar-claro}"
    textColor: "{colors.ultramar-escuro}"
    padding: "0.25rem 0.6rem"
  selo-espera:
    backgroundColor: "{colors.amarelo-claro}"
    textColor: "{colors.amarelo-tinta}"
    padding: "0.25rem 0.6rem"
  selo-falha:
    backgroundColor: "{colors.vermelho-claro}"
    textColor: "{colors.vermelho-texto}"
    padding: "0.25rem 0.6rem"
  cupom:
    backgroundColor: "{colors.n100}"
    textColor: "{colors.tinta}"
    typography: "{typography.cupom}"
    padding: "0.15rem 0.5rem"
  peca-preco:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.tinta}"
    padding: "0.6rem 0.9rem"
---

# Design System: Moeda estudantil

## Overview

**Creative North Star: "O Saldo como Sinal Público"**

O Moeda fala o idioma dos programas de identidade visual brasileiros dos anos 60 e 70: campos de cor chapada, grade rígida, cantos retos e uma marca modular de quatro quartos (dois quadrados brancos e dois quartos de círculo amarelos) que se repete no favicon, no trilho, na abertura e no lugar de fotos ausentes. O saldo não é um número dentro de um cartão; é um campo amarelo de largura total, com algarismos largos e pesados, lido de longe num projetor. Cada perfil abre no "Meu balcão" e encontra o saldo e a próxima ação sem procurar.

A densidade é de ferramenta, não de vitrine: tabelas com fio preto no topo, rótulos curtos, formulários em duas colunas com limite de 46rem. A cor faz o trabalho que sombras e bordas arredondadas fariam num painel comum: ultramar é a moldura (trilho, cabeçalho de visitante, entradas de moedas), amarelo é valor e seleção, tinta é saída e contraste, vermelho é só erro e perigo. A profundidade vem do contraste entre campos, nunca de elevação.

A rejeição confirmada da direção é o painel SaaS de cartões brancos com acento azul: nada de cartões flutuando sobre cinza, nada de sombra, nada de raio.

**Key Characteristics:**
- Campos de cor chapada encostados uns nos outros, sem sombra e sem raio.
- Trilho ultramar fixo à esquerda (15.5rem) nas telas logadas; barra ultramar no topo para visitantes.
- Amarelo reservado a saldo, valor e seleção.
- Archivo variável com eixo de largura: números e títulos largos (108–125%) e pesados (800–900); texto corrido normal.
- Régua de movimentos como assinatura: blocos proporcionais ao valor, ligados à tabela por hover e foco.
- Quarto de círculo da marca como única curva de forma do sistema.

## Colors

Três campos primários chapados (ultramar, amarelo, tinta) sobre um fundo papel quente, com uma única rampa de neutros e vermelho contido.

### Primary
- **Ultramar** (#2433b8): a moldura do produto. Fundo do trilho logado e da barra de visitante, botão primário, link, anel de foco (`:focus-visible` 3px), `accent-color` e `caret-color`, blocos de entrada na régua, valores de entrada (`+200`) nas tabelas e fatos, painel de contas de demonstração na tela Entrar, `theme-color` do navegador e fundo do favicon.
- **Ultramar Escuro** (#1a2690): hover do botão primário e texto sobre ultramar-claro (faixas de aviso, selo "enviado").
- **Ultramar Claro** (#e3e6f7): fundo das faixas de confirmação/aviso e do selo de e-mail aceito.

### Secondary
- **Amarelo Sinal** (#f6c21b): o campo do saldo, a faixa de preço da vantagem, a prévia do envio, o link ativo da navegação, o bloco ativo da régua, o botão de ação principal sobre campo preto, o passo "Aluno" da abertura, a seleção de texto e o link "Ir para o conteúdo". Também é a cor do anel de foco sobre fundos ultramar ou pretos.
- **Amarelo Vivo** (#ffd447): hover do botão amarelo.
- **Amarelo Claro** (#fdf1c7): linha da tabela ligada ao bloco ativo da régua e selo "pendente".
- **Amarelo Tinta** (#4d3c00): texto secundário sobre amarelo (nota do saldo, destinatário na prévia) e texto do selo "pendente".

### Tertiary
- **Vermelho Alerta** (#d23a26): marcador circular da faixa de erro e fundo do botão de perigo no hover.
- **Vermelho Texto** (#b02b18): texto de erro, botão de perigo em repouso, ajuda de campo com erro, valor que excede o saldo na prévia, selo "falha".
- **Vermelho Claro** (#fbe3de): fundo da faixa de erro e do selo "falha".

### Neutral
- **Tinta** (#121212): todo texto principal, campo preto das ações do saldo, blocos de saída na régua, passo "Empresa" da abertura, fios de 2px no topo de tabelas, listas, fatos e legendas de formulário, contorno do botão secundário.
- **Branco** (`n0`, #ffffff): texto sobre ultramar e tinta, fundo de campos de formulário e do corpo de e-mail aberto.
- **Papel** (`n50`, #f5f5f2): fundo de página.
- **Papel Sombra** (`n100`, #ebebe6): fundo de cupom, selo neutro, bloco vazio, botão desabilitado, foto ausente e hover da linha de e-mail.
- **Fio** (`n200`, #d9d9d2): fios de 1px entre linhas e acima da zona de exclusão.
- **Cinza Médio** (`n400`, #a3a39b): borda de campo em repouso e cor da barra de rolagem.
- **Cinza Texto** (`n600`, #5a5a53): texto secundário (subtítulo, legendas, datas, ajuda, placeholder) e borda de campo no hover.

Sobre os campos coloridos, o sistema usa branco ou tinta translúcidos em vez de novos tons: hover de link no trilho com branco a 10%, divisória do pé do trilho com branco a 25%, sublinhado do "Sair" com branco a 45%, cupom no painel ultramar com branco a 16%, conta de demonstração com branco a 8% e fios da prévia amarela com tinta a 20%.

### Named Rules
**The Amarelo Reservado Rule.** Amarelo marca saldo, valor e seleção (item ativo, foco sobre campo escuro, seleção de texto) e a ação principal sobre campo preto. Fora disso, aparece só como cor da marca: os quartos de círculo do sinal, o passo "Aluno" do ciclo e a barra de carregando.

**The Vermelho Só Para Erro Rule.** Vermelho aparece apenas em erro e em ação destrutiva (faixa de erro, botão de perigo, ajuda com erro, selo de falha, valor que excede o saldo). Nunca como acento decorativo.

**The Rampa Única Rule.** Neutros vêm só de `n0`, `n50`, `n100`, `n200`, `n400`, `n600` e `tinta`. Sobre campo de cor, use branco ou tinta translúcidos, não um cinza novo.

## Typography

**Display Font:** Archivo Variable (com Segoe UI, sans-serif), auto-hospedada via `@fontsource-variable/archivo/wdth.css`, com eixo de largura.
**Body Font:** Archivo Variable (mesma família, largura 100%).
**Label/Mono Font:** JetBrains Mono (500 e 700 via `@fontsource/jetbrains-mono`), exposta como `--mono`.

**Character:** Uma só família grotesca que muda de voz pela largura: estendida e pesada nos números e títulos, como letreiro; normal e regular no texto, como formulário. A mono existe só para o código do cupom, que precisa ser lido e conferido caractere a caractere.

O eixo de largura é aplicado no código com `font-stretch` (os valores de `fontVariation` no frontmatter são a mesma largura). Todo o corpo usa `font-variant-numeric: tabular-nums`, então colunas de moedas e datas alinham. Títulos `h1`–`h3` têm `line-height: 1.1` e `text-wrap: balance`.

### Hierarchy
- **Saldo** (900, `clamp(4rem, 8.5vw, 7.5rem)`, line-height 0.85, largura 125%): o número do saldo no campo amarelo. Na versão compacta, `clamp(2.75rem, 5vw, 4rem)`. O total da prévia de envio usa a mesma voz em `clamp(2.75rem, 4.5vw, 3.75rem)`; o código 404 usa 6rem.
- **Display** (900, `clamp(3rem, 7.5vw, 6rem)`, line-height 0.92, largura 122%): só o título da abertura para visitantes. Os números do ciclo (1, 2, 3) usam 4.5rem a 125%; o título da tela Entrar usa `clamp(2.25rem, 4vw, 3.25rem)` a 118%.
- **Headline** (850, `clamp(2rem, 3.4vw, 2.75rem)`, line-height 1.1, largura 112%): título de cada página (nome do usuário no balcão, "Extrato", "Nova vantagem").
- **Title** (800, 1.375rem, largura 108%): títulos de seção ("Últimos movimentos", "E-mails"). Legendas de formulário usam 800 a 1.0625rem e 108%.
- **Numeral** (850, 1.75rem, largura 112%): números dos fatos em linha (totais) e, em 1.125rem, o rótulo dos blocos da régua e, em 1.0625rem, os valores da tabela. Preço da vantagem: 900, 1.75rem, 120%. Saldo no trilho: 900, 1.375rem, 120%. Marca "moeda": 900, 1.5rem, 120%.
- **Body** (400, 1rem, line-height 1.5): texto corrido. Lead da abertura em `clamp(1.125rem, 1.6vw, 1.375rem)` com line-height 1.45 e limite de 40ch; notas e legendas com limite de 52–70ch.
- **Label** (700, 0.9375rem): rótulos de campo. Texto secundário em 0.875–0.9375rem com `n600`.
- **Table Head** (700, 0.75rem, letter-spacing 0.07em, MAIÚSCULAS): só cabeçalhos de coluna de tabela, em `n600`.
- **Cupom** (JetBrains Mono 700, 0.875rem, letter-spacing 0.04em): só o código do cupom.

### Named Rules
**The Largura É Volume Rule.** Importância sobe pela largura e pelo peso, não por cor: números e títulos vão de 108% a 125% de largura e de 800 a 900 de peso; texto corrido fica em 100% e 400. Quanto mais público o número, mais largo (o saldo é 125%).

**The Mono Só no Cupom Rule.** JetBrains Mono (`--mono`) é exclusiva do código do cupom. Nenhum outro texto usa mono.

## Layout

**Moldura logada.** Grade de duas colunas: trilho de `--trilho` (15.5rem) e miolo flexível. O trilho é `sticky` com altura de 100vh e organiza, de cima para baixo, a marca, a navegação em lista vertical (links em bloco com padding 0.85rem 1.5rem) e o pé (nome, perfil, saldo em amarelo e "Sair"), empurrado para o fim com `margin-top: auto` e separado por fio branco a 25%. O fundo da `.app` repete o ultramar na largura do trilho para que a faixa azul nunca termine antes da página.

**Moldura de visitante.** Barra ultramar no topo (altura mínima 4.75rem) com a marca à esquerda e a navegação à direita; o conteúdo é centrado com o mesmo limite do miolo.

**Miolo.** Padding `2.5rem clamp(1.25rem, 4vw, 3.5rem) 5rem`, largura máxima 78rem. O cabeçalho de página alinha título e ações pela base (`align-items: flex-end`) e quebra linha quando falta espaço. O saldo vem logo abaixo, com 2.5rem de margem; seções seguintes abrem com 3.25rem acima do título. A zona de exclusão fica isolada no fim, 4.5rem abaixo, atrás de um fio `n200`.

**Grades recorrentes.** Formulários em duas colunas com `column-gap` 1.25rem e máximo de 46rem (variantes de uma coluna e estreita de 30rem). Vitrine de vantagens em `repeat(auto-fill, minmax(15.5rem, 1fr))` com gap 1.5rem. Fatos em `repeat(auto-fit, minmax(11rem, 1fr))`. Telas de envio e entrada em duas colunas com coluna lateral fixa (prévia de 16–22rem, demonstração de 18–25rem) e gap `clamp(2rem, 5vw, 4–4.5rem)`; a prévia é `sticky` a 2rem do topo. Abertura em três passos lado a lado, cada um com altura mínima de 17rem.

**Ritmo.** O espaçamento não está tokenizado em custom properties; os valores recorrentes são 0.75rem entre botões, 1.1rem entre campos, 1.25rem entre colunas e células, 1.5rem e 1.75rem para respiros de bloco, 2.5rem e 3.25rem entre seções. Os blocos da régua se separam por 3px.

**Responsivo.**
- **Até 960px:** a moldura vira uma coluna. O trilho deixa de ser fixo e vira barra de topo: marca à esquerda, saldo e "Sair" à direita na mesma linha, navegação horizontal com quebra embaixo; nome e perfil somem. O saldo empilha número e ações; as ações ficam em linha (botões com base de 12rem). Envio, Entrar e prévia passam a uma coluna e a prévia deixa de ser `sticky`. A abertura perde o sinal grande e os passos do ciclo empilham.
- **Até 640px:** formulários em uma coluna; a régua baixa para 3.25rem com rótulos de 0.9375rem; fatos em duas colunas; o botão de exclusão ocupa a largura toda; a navegação de visitante ocupa a linha inteira. Tabelas viram lista: o cabeçalho fica oculto visualmente, cada linha vira uma grade com movimento e valor na primeira linha e detalhe e data abaixo, com fio de 2px tinta no topo.
- **Container query:** cada bloco da régua esconde o rótulo quando fica com menos de 4.5rem de largura.

## Elevation & Depth

O sistema é plano. Não há `box-shadow` de elevação em nenhum elemento; profundidade é contraste entre campos chapados (amarelo encostado em preto, ultramar ao lado do papel) e fios de 1–2px. O único `box-shadow` em uso é inset de 2px, que funciona como contorno dos botões sem fundo, nunca como sombra.

### Shadow Vocabulary
- **Contorno inset** (`box-shadow: inset 0 0 0 2px var(--tinta)`, também com `var(--n0)`, `currentColor` e `var(--n200)`): contorno dos botões secundário, claro, perigo e do botão desabilitado dentro da vitrine. Não altera o tamanho do botão entre estados.

### Named Rules
**The Cor Chapada Rule.** Nenhuma superfície flutua. Uma área se destaca por mudar de cor de campo ou ganhar um fio, nunca por sombra.

## Shapes

Cantos retos em tudo: botões, campos (`border-radius: 0` explícito nos inputs), selos, faixas, fotos, campos de saldo e prévia. O seletor usa uma seta desenhada em SVG inline em vez da nativa. Fios definem estrutura: 2px tinta no topo de tabelas, listas de e-mail, fatos, legendas de formulário e na base das fotos; 1px `n200` entre linhas. Fotos de vantagem são recortadas em 4:3.

A única curva de forma do sistema é o quarto de círculo da marca modular. Ele aparece no próprio sinal (favicon, trilho, abertura, foto ausente) e no canto inferior direito de cada passo do ciclo na abertura, como quarto de círculo de 5rem em cor de outro campo. O marcador da faixa de erro é um pequeno círculo de 0.65rem; o da faixa comum é um quadrado.

### Named Rules
**The Canto Reto Rule.** Raio é 0. As únicas curvas são o quarto de círculo vindo da marca e o pequeno marcador circular da faixa de erro; nunca arredondamento de canto de componente.

## Components

### Buttons
Diretos e pesados: retângulos de cor chapada, texto 700, sem ícones.
- **Shape:** cantos retos (0), altura mínima 3rem, padding horizontal 1.35rem; variante pequena com 2.35rem de altura, padding 0.9rem e texto de 0.9375rem.
- **Primário:** fundo ultramar, texto branco.
- **Amarelo:** fundo amarelo, texto tinta; é a ação principal dentro do campo preto do saldo.
- **Secundário:** sem fundo, texto tinta e contorno inset de 2px tinta; no hover inverte para fundo tinta e texto branco.
- **Claro:** a versão do secundário para fundos escuros, com contorno e texto brancos; no hover inverte para fundo branco e texto tinta.
- **Perigo:** sem fundo, texto e contorno em vermelho-texto; no hover vira fundo vermelho com texto branco. Usado só na zona de exclusão e em exclusões de vantagem.
- **Hover / Focus / Active:** transições de cor de 160ms com `--saida`; `:active` desce 1px; foco com anel de 3px ultramar a 2px de distância (amarelo sobre campos escuros).
- **Disabled:** fundo `n100`, texto `n600`, sem contorno e cursor `not-allowed`; na vitrine, fundo transparente com contorno `n200`.
- **Sair:** link-botão sem fundo, sublinhado em branco a 45% que fica opaco no hover.

### Saldo
O campo que dá nome ao sistema. Grade de duas colunas: à esquerda o campo amarelo com rótulo (700, 1.0625rem), o número na voz Saldo seguido de "moedas" (700, 1.5rem) e uma nota opcional em amarelo-tinta (até 52ch); à direita o campo tinta de no mínimo 17.5rem com as ações empilhadas (amarelo e claro) e gap de 0.75rem. Variante compacta com padding e número menores. Até 960px as ações descem para baixo do número e ficam em linha.

### Régua de movimentos (assinatura)
Uma faixa horizontal de 4.25rem de altura (3.25rem até 640px) com blocos de largura proporcional ao valor de cada movimento (`flex-grow` igual ao valor, largura mínima 0.6rem), em ordem cronológica, separados por 3px. Entrada é ultramar, saída é tinta; cada bloco mostra o valor com sinal (+200, −150) em 850 a 112% e esconde o rótulo quando estreito demais. Cada bloco é um botão: hover ou foco o pinta de amarelo e pinta a linha correspondente da tabela de amarelo-claro; clique rola até a linha. Hover na linha da tabela acende o bloco de volta. Abaixo, as pontas da régua mostram "Mais antigo" e "Mais recente" com a legenda ao centro, em 0.875rem `n600`. Ao carregar, a régua cresce da esquerda uma única vez (`clip-path` de 65% a 0, 1100ms com `--saida`).

### Inputs / Fields
- **Style:** fundo branco, borda de 1.5px `n400`, cantos retos, altura mínima 3rem, padding 0.6rem 0.8rem; rótulo 700 acima, com 0.4rem de gap. Textarea com 8rem mínimos e redimensionamento vertical.
- **Hover:** borda passa a `n600`.
- **Focus:** borda ultramar mais contorno de 2px ultramar colado (offset 0).
- **Error:** texto de ajuda em vermelho-texto 600; ajuda normal em 0.875rem `n600`.
- **Arquivo:** o botão do seletor de arquivo é um bloco tinta com texto branco 700.

### Navigation
- **Trilho (logado):** links brancos 600 em bloco de largura total; hover com branco a 10%; ativo com fundo amarelo e texto tinta. Foco com anel amarelo para dentro (offset −3px).
- **Topo (visitante):** links brancos 600 com padding 0.55rem 0.9rem, mesmos estados do trilho.
- **Pular para o conteúdo:** link amarelo com texto tinta 700, escondido acima da tela até receber foco.
- **Mobile:** ver Layout (trilho vira barra de topo até 960px).

### Tabelas e listas
Cabeçalho na voz Table Head, apoiado em fio de 2px tinta; linhas separadas por 1px `n200`, padding 0.95rem 1.25rem. Data em `n600` 0.9375rem, movimento em 700, valor alinhado à direita em 850 a 112% (ultramar quando entrada). A lista de e-mails usa `details` com o mesmo fio de topo: cada linha tem uma seta desenhada com bordas de 2px que gira 90° ao abrir (180ms), assunto 700, data e selo; o corpo aberto aparece em bloco branco com até 68ch.

### Chips (selos e cupom)
- **Selo:** 0.8125rem 700, padding 0.25rem 0.6rem, cantos retos. Neutro em `n100`/`n600`; "ok" em ultramar-claro/ultramar-escuro; "espera" em amarelo-claro/amarelo-tinta; "falha" em vermelho-claro/vermelho-texto.
- **Cupom:** código em JetBrains Mono sobre `n100`; dentro do painel ultramar, sobre branco a 16% com texto branco.

### Faixas de aviso
Faixas de largura total com texto 600 e padding 0.9rem 1.1rem, precedidas por um marcador de 0.65rem. Confirmação e aviso em ultramar-claro com marcador quadrado ultramar; erro em vermelho-claro com marcador circular vermelho e `role="alert"`.

### Cards / Containers
O sistema não tem cartões elevados. Os contêineres são campos chapados ou peças sem moldura:
- **Peça da vitrine:** foto 4:3 com fio de 2px tinta na base, nome da empresa em `n600`, título 700 limitado a três linhas e faixa de preço amarela com o número a 120%. Fora do alcance do saldo, a foto fica em escala de cinza com 75% de opacidade e a faixa de preço passa a `n100`/`n600`.
- **Foto ausente:** campo `n100` com o sinal da marca em `n400`/`n200` ao centro.
- **Prévia de envio:** campo amarelo `sticky`, linhas com fio de tinta a 20% e o total final na voz Saldo.
- **Contas de demonstração:** painel ultramar com botões de conta em branco a 8% que ficam amarelos no hover.
- **Passos do ciclo:** três campos encostados (ultramar, amarelo, tinta), cada um com número na voz Display reduzida e um quarto de círculo da cor do próximo campo no canto.

### Estados
- **Carregando:** texto 600 `n600` precedido de uma barra de 3rem × 0.5rem metade ultramar, metade amarela, que desliza em loop (900ms, linear).
- **Vazio:** bloco `n100` com texto `n600`, padding 1.5rem, até 70ch; em tabelas, uma linha `n600`.
- **404:** código "404" em ultramar na voz Saldo (6rem), título 850 a 110% e texto `n600`.

### Movimento
Uma só curva, `--saida` (`cubic-bezier(0.16, 1, 0.3, 1)`, ease-out exponencial). Transições de cor entre 140ms e 200ms; a régua cresce uma vez em 1100ms. Com `prefers-reduced-motion: reduce`, todas as animações e transições são desligadas.

## Do's and Don'ts

### Do:
- **Do** colocar o saldo de cada perfil no campo amarelo de largura total logo abaixo do cabeçalho, com as ações no campo tinta à direita.
- **Do** usar só os tokens de `estilos.css` (`--ultramar`, `--amarelo`, `--tinta`, `--vermelho` e família, rampa `--n0` a `--n600`); sobre campos coloridos, usar branco ou tinta translúcidos.
- **Do** dar a números públicos (saldo, preço, totais, valores da régua) peso 800–900 e largura de 112% a 125% via `font-stretch`.
- **Do** separar estrutura com fios: 2px `--tinta` no topo de tabelas e listas, 1px `--n200` entre linhas.
- **Do** manter cantos retos e o contorno de botões sem fundo como `box-shadow` inset de 2px.
- **Do** usar `--saida` em toda transição e manter o bloco `prefers-reduced-motion` que desliga tudo.
- **Do** manter o foco visível: anel de 3px ultramar, trocado por amarelo sobre ultramar e tinta.
- **Do** ligar cada bloco da régua à sua linha de tabela por hover e foco, com o amarelo como cor de seleção.

### Don't:
- **Don't** construir o painel SaaS de cartões brancos com acento azul: nada de cartões elevados sobre fundo cinza.
- **Don't** usar `box-shadow` para elevação nem arredondar cantos de componentes; a curva de forma é o quarto de círculo da marca.
- **Don't** usar amarelo como fundo de conteúdo genérico (seções, listas, cabeçalhos) que não seja saldo, valor ou seleção.
- **Don't** usar vermelho fora de erro e ação destrutiva.
- **Don't** usar JetBrains Mono fora do código do cupom.
- **Don't** criar cinzas ou tons de azul fora da rampa de tokens.
