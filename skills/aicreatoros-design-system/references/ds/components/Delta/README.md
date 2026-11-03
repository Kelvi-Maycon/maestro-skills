# Delta

Variação com seta e cor juntas, em Instrument Sans 12/600 tabular: verde para cima, vermelho para baixo, traço cinza para estável.

**Quando usar.** Ao lado de um número que mudou contra o período anterior: "3,1%" em Assinantes, "2,3%" em Cliques.

**O que você fornece.**
- `direction`: `"up"` (padrão), `"down"` ou `"flat"`. Dá a seta.
- `tone` (opcional): `"good"` ou `"bad"` trocam a cor quando a direção engana (tempo por ticket caiu 53%: seta para baixo, verde); `"plain"` tira o fundo.
- `children`: a variação sem sinal ("12,4%"); a seta já diz a direção.

**Faça.**
- Diga o período de comparação no rodapé do painel ("eram 12.026 em 31 ago").

**Não faça.**
- Não use só a cor, sem a seta.

Classes do kit: `.delta`, `.delta-up`, `.delta-down`, `.delta-flat`, `.delta-good`, `.delta-bad`, `.delta-plain`.
