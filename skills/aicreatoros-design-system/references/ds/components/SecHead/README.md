# SecHead

Título de seção de uma vista: contexto em mono laranja acima, título em h3 com uma palavra em itálico, linha de apoio e ferramentas à direita.

**Quando usar.** Acima de uma tabela ou de um bloco que ocupa a largura da tela: "Matérias · 1 – 14 set 2026" e "As doze mais *lidas*". Dentro de card com título de painel, use o `kicker` do `Panel`.

**O que você fornece.**
- `kicker` (opcional): recorte e período ("Teste · 400 tickets reais").
- `title`: o h3; marque uma palavra com `<em>`.
- `caption` (opcional): como ler o bloco ("Ícone diz o tipo, faixa colorida diz se passou da meta de leitura até o fim").
- `tools` (opcional): um nó, ou lista de nós que vai num `.panel-tools`.

**Faça.**
- Na `Table`, passe o `SecHead` em `head`.

**Não faça.**
- Não marque mais de uma palavra com `<em>`.

Classes do kit: `.sec-head`, `.kick`, `.panel-tools`.
