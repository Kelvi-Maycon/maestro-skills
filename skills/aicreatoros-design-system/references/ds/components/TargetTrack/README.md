# TargetTrack

Régua de meta sobre tinta: barra preenchida até o valor medido com o número em cima, tracejado até a meta, marcador com o rótulo da meta e escala embaixo.

**Quando usar.** Para comparar um resultado com a meta declarada antes do teste: "Aderência medida contra a meta declarada".

**O que você fornece.**
- `label`, `value` e `target` (0 a 100).
- `valueLabel`: padrão "N%", sobre a ponta da barra.
- `gapLabel`: padrão "faltam N pontos"; `null` esconde. `targetLabel`: padrão "Meta N%".
- `ticks`: escala embaixo, padrão `[minLabel ou "0", "25", "50", "75", maxLabel ou "100%"]`; `false` esconde.
- Contêiner: painel `.ink`, normalmente dentro de `DataPanel`.

**Faça.**
- Declare a meta antes de mostrar o resultado.

Classes do kit: `.rule`, `.rule-lbl`, `.track`, `.fill`, `.gapfill`, `.target`, `.ticks`.
