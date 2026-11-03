# Table

Tabela comparativa em card: título de seção, barra de ferramentas, cabeçalho em mono 11 caixa alta, linhas com divisória sólida fina, números em Instrument Sans tabular à direita, comparação em coluna própria como chip de cor, linha de total, rodapé "Mostrar mais" e nota de recorte.

**Quando usar.** Para comparar alternativas no mesmo critério (aderência, nota do júri, tempo, custo, estado) ou para listar matérias por leitura, conclusão e conversão.

**O que você fornece.**
- `columns`: `[{ key, label, num, sort, group }]`. `num` alinha à direita em tabular; `sort` (`"descending"` ou `"ascending"`) marca a coluna ordenada com a seta laranja e `aria-sort`.
- `group`: colunas vizinhas com o mesmo `group` ganham um cabeçalho em comum numa primeira linha do `thead` ("Qualidade", "Operação", "Custo"), e a coluna que abre cada grupo ganha o fio `.g0`. A seleção entra no primeiro grupo e as ações no último; grupo sem nome usa `''`.
- `rows`: objetos por `key`. Cada célula aceita:
  - texto ou nó (`Status`, `Badge`, `Delta`);
  - `{ value, sub }`: em coluna de texto, "Em revisão" e "desde 12 set";
  - `{ icon, title, sub, highlight }`: primeira coluna com o ícone do sprite no quadrado (`layers` modelo, `settings` agente, `sliders` ferramenta; `diag`, `pen`, `doc` para teste, análise e guia). `highlight` pinta o quadrado de laranja. `{ letter, title, sub }` põe uma letra no lugar do ícone;
  - `{ share, value, highlight }`: barra de 56 px com o número; `highlight` em laranja; uma coluna de barra por tabela;
  - `{ lvl, value }`: faixa colorida do nível, `'good'` na meta, `'warn'` perto, `'bad'` abaixo ("4,6", "64%");
  - `{ na: true }`: valor ausente, "–" em cinza. Fica sempre no fim da ordenação, nos dois sentidos.
- Qualquer célula objeto aceita `sort` (valor de ordenação: `{ value: Status, sub: "desde 12 set", sort: 2 }`). `selected: true` marca a linha; `key` identifica a linha na seleção; `label` nomeia a linha nos rótulos de seleção.
- `head` (opcional): um `SecHead` acima da barra ("Oito alternativas *lado a lado*").
- `toolbar` (opcional): um `Toolbar`.
- `sortable`: cabeçalhos viram botões. O primeiro clique ordena coluna `num` do maior para o menor e texto de A a Z; o segundo inverte. Sem `cell.sort`, coluna `num` ordena pelo número do texto ("R$ 2,10" vira 2,1).
- `selectable`: coluna de caixas, com "Selecionar todas" (fica indeterminada com seleção parcial). Estado inicial de `row.selected`; `onSelectionChange(keys)` recebe as chaves. Com `toolbar` sendo um `Toolbar` sem `note`, a contagem "<b>1</b> de 8 selecionada" entra nele.
- `limit` e `step` (opcionais): mostra as primeiras `limit` linhas e o rodapé "Mostrando 5 de 8 · Mostrar mais 3"; cada clique abre mais `step` (padrão igual a `limit`). Com tudo aberto, o botão vira "Mostrar menos". A ordenação respeita o limite.
- `actions` (opcional): `(row) => nó` na última coluna (`Button` `ghost` `sm` só ícone, "Abrir Claude Fable 5.1").
- `foot` (opcional): linha de total por `key` ("Média das oito", "29,4%").
- `density`: `"compacta"` (linha de 36 px, sem texto de apoio), padrão 48 px ou `"confortavel"` (60 px).
- `ink`: a tabela inteira sobre tinta.
- Melhor valor da coluna: `{ value, best: true }` (ou `best` na célula `share`). No claro, contorno laranja de 1 px; na tinta, lima. Um por coluna; `Badge` fica fora de célula numérica.
- Comparação ("vs antes", "vs média") vai em coluna `num` própria, com `{ value: Delta, sort }`: o chip tem 64 px fixos. O tom segue o sentido do resultado: tempo que cai é verde (`tone: 'good'`), custo acima da média é vermelho (`'bad'`).
- `footnote`: o recorte e a regra de leitura ("Nota do júri: 4 ou mais passa, 3 a 3,9 fica perto, abaixo de 3 não passa.").
- Coluna de nome mais larga: `style={{ '--alt-w': '420px' }}` para títulos de matéria.
- A tabela tem largura mínima de 700 px e rola na horizontal dentro da moldura, com seleção e primeira coluna fixas.

**Faça.**
- Uma linha por número; texto de apoio só nas colunas de nome e estado.
- Diga no rodapé de recorte a base da comparação e o que cada faixa de `lvl` significa.
- Use `Status` para estado dentro da tabela.

**Não faça.**
- Não use a tabela sem o rodapé de recorte.
- Não escreva "0" ou "n/d" para dado que não existe: use `{ na: true }`.

**Escopo.** O estilo de `table`, `thead`, `tbody`, `tfoot`, `tr`, `th` e `td` vale só dentro de `.tbl`: as regras do kit entram presas a `:where(.tbl)`, com a mesma especificidade do kit. Uma tabela fora do componente não herda nada.

Classes do kit: `.tbl`, `.tbl-box`, `.tbl-more`, `table`, `th`, `th.grp`, `.g0`, `td.na`, `tfoot`, `.num`, `.alt`, `.share`, `.lvl`, `.best`, `.th-sort`, `.sel`, `.act`, `.toolbar`, `.sec-head`.
