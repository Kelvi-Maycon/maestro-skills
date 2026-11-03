# Status

Ponto de estado de 7 px com texto em Instrument Sans 12/500 cinza.

**Quando usar.** Para estado que muda sozinho em tabela, lista, menu ou rodapé de painel: Sincronizado, Atrasado 2 h, Falhou, Pausado, Ao vivo.

**O que você fornece.**
- `tone`: `"positive"` (verde), `"warn"` (âmbar), `"neg"` (vermelho), `"info"` (azul), `"idle"` (anel vazio) ou `"live"` (laranja pulsando). Sem tom, ponto cinza.
- `children`: o texto do estado.
- Sem `children`, passe `label`: o ponto vira imagem com `aria-label` (item de menu, coluna estreita).

**Faça.**
- Diga o motivo no texto quando couber ("Atrasado 2 h").

**Não faça.**
- Não use ponto sem texto nem `label`: cor sozinha não informa.

Classes do kit: `.status`, `.status-pos`, `.status-warn`, `.status-neg`, `.status-info`, `.status-idle`, `.status-live`.
