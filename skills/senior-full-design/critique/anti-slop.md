# Portões anti-slop

Lista numerada de checagens. Rode **depois de construir**, antes de entregar. Cada portão pega um tell específico de output gerado — coisas que passam batido mesmo com tokens bons.

Portão reprovado = corrige, ou justifica em uma linha por que o brief ganha dele. "Ficou bonito assim" não é justificativa.

---

## Cor e superfície

**1. Gradiente de default.** Roxo→rosa, índigo→violeta, ciano→azul em fundo, botão ou texto. Reprovado, salvo se a marca usa.

**2. Gradiente no fundo de seção.** Fundo é chapado. A exceção única é texto de headline de hero, e mesmo essa é uma escolha, não um default.

**3. Contagem de cor.** Mais de quatro cores em uso sem estrutura de papel (primária, secundária, acento, escala neutra). Conte.

**4. Contraste checado num par só.** Texto/fundo passa e o resto foi presumido. Rode a matriz: rótulo de botão sobre preenchimento primário reprova o tempo todo.

**5. Escuro de default.** `#0D1117`, `#0F172A` ou near-black chapado com acento neon. Escolha uma base escura com subtom próprio.

**6. Sombra preta pura sobre fundo colorido.** Acinzenta. Use a hue neutra do projeto com alpha.

---

## Tipografia

**7. Inter, Roboto, Arial, Open Sans, system-ui como display.** Reprovado, salvo se a marca ou a recipe manda.

**8. Três ou mais famílias.** Máximo dois. Riqueza vem de peso e tamanho.

**9. Tamanho fora da escala.** Qualquer `text-[19px]`, `font-size: 22px`, `1.4rem` solto. Todo tamanho num degrau.

**10. Razão título/corpo abaixo de 2,5×.** Hierarquia chapada.

**11. Line-height de display abaixo do piso físico.** Em display bold e grande, `0.87` ou menos costuma fazer descendente encostar na linha de baixo. Confira olhando, não pelo número.

**12. Palavra órfã.** Última linha com uma palavra sozinha, em heading ou parágrafo. `text-wrap: balance` e `pretty` aplicados.

**13. Peso 900/black, ou itálico na interface.**

**14. Número que muda sem `tabular-nums`.** Contador, preço, relógio, célula de tabela.

---

## Estrutura e layout

**15. O template genérico.** hero centralizado → três cards de feature com ícone → depoimento → CTA → rodapé. Se a página tem essa forma sem escolha declarada, reprovou.

**16. Eyebrow em toda seção.** O mesmo empilhamento rótulo-caixa-alta + título + parágrafo repetido. Varie a abertura das seções.

**17. Zigue-zague monótono.** Três ou mais splits de imagem/texto seguidos alternando lado. Alternância não é composição.

**18. Cardificação.** Todo parágrafo, métrica e ícone dentro de um card arredondado. Container só quando agrupar, selecionar ou elevar significa algo.

**19. Bento sem ritmo.** Célula em branco de enchimento, tile só-texto uniforme, span arbitrário. Cada célula precisa de conteúdo e papel.

**20. Deriva de forma.** Pílula, card reto, card macio e controle circular convivendo sem regra semântica. Raio por papel.

**21. Split de cabeçalho sem função.** Headline grande à esquerda e um parágrafo pequeno flutuando à direita, comunicando nada. Empilhe ou dê papel real à segunda coluna.

**22. Padding de seção chapado.** Toda seção com o mesmo valor. Pese pelo papel: conectiva, padrão, pivô.

**23. Interno maior que externo.** Padding de card maior que o gap entre cards.

**24. `h-screen` em seção que não é hero.** Força altura que o conteúdo não pede.

---

## Conteúdo

**25. Muro de texto onde cabia visual.** Seção majoritariamente parágrafo com ícone decorativo, em vez de majoritariamente algo pra olhar com legenda. **Este é o portão mais importante da lista.**

**26. Métrica inventada.** "+47% de conversão", "usado por 50.000 times", "99,9% de uptime" sem fonte. Reprovado sempre.

**27. Logo wall sem permissão.** Logo de cliente que não autorizou, ou logo genérico de placeholder passando por prova.

**28. Depoimento fabricado.** Nome, rosto e cargo inventados.

**29. Lorem ipsum, "Acme Corp", "John Doe".**

**30. Número redondo falso.** `99.99%`, `50%`, `$100.00`. Dado real é orgânico.

**31. Clichê de IA na copy.** "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer", "revolucionário", "no mundo de hoje", "delve".

**32. Title Case Em Tudo.** Sentence case.

**33. Exclamação em sucesso, "Ops!" em erro.**

**34. CTA duplicado com rótulos diferentes.** "Começar", "Testar grátis" e "Criar conta" apontando pro mesmo lugar sem distinção real.

---

## Asset

**35. Seção sem asset onde cabia visual.** Bloco de cor chapada ou texto puro no lugar de foto, ilustração, mockup ou gráfico.

**36. Emoji como ícone.** 🚀 ⚡ ✨ no lugar de um set de verdade.

**37. Ícone de sets misturados.** Espessura de traço diferente na mesma tela.

**38. SVG de figura desenhado pelo modelo.** Rosto, cena, objeto. Sempre sai torto.

**39. Silhueta em CSS no lugar do produto real.** Zero valor de reconhecimento.

**40. Logo como letra dentro de um quadrado colorido.**

**41. Imagem sem `alt`, ou sem dimensão explícita.** Uma quebra leitor de tela, a outra pula o layout no carregamento.

**42. Crédito de licença visível na página.** Crédito vai em comentário no código.

---

## Motion

**43. `transition: all`.**

**44. `ease-in` em UI.**

**45. Entrada com `scale(0)`.**

**46. Duração de UI acima de 300ms sem motivo.**

**47. Página completamente estática.** Zero motion não é escolha minimalista — é passo pulado, salvo se o dial de motion foi declarado em 1–2.

**48. `prefers-reduced-motion` ausente** em qualquer motion além de feedback simples de estado.

**49. Hover sem gate de ponteiro.**

**50. Dois motores de smooth scroll instalados.**

**51. Espetáculo repetido.** Vários marquees, capítulos pinados ou loops ambientes competindo na mesma superfície.

**52. Animação que, removida, não muda entendimento nenhum.**

---

## Estado e craft

**53. Estado faltando.** Falta hover, focus visível, active, disabled, loading, empty ou error em elemento que precisa.

**54. Anel de foco removido.** `outline: none` sem substituto visível.

**55. Link morto.** `href="#"` que não é nem link nem visualmente desabilitado.

**56. Item de nav atual não indicado.**

**57. Estado importante fora da URL.** Não dá pra recarregar, compartilhar nem voltar.

**58. Colar bloqueado** em campo de senha, código ou cartão.

**59. Data e número formatados à mão** em vez de `Intl.*`.

**60. Overflow não tratado.** Nome longo, lista longa, zoom 200% quebram o layout.

---

## Varredura mecânica

```bash
python3 scripts/anti_slop_scan.py <arquivos>
python3 scripts/audit_motion.py <arquivos>
python3 scripts/check_contrast.py --matrix text=#hex bg=#hex surface=#hex primary=#hex accent=#hex border=#hex on-primary=#hex
```

Os scripts pegam a parte detectável estaticamente (gradiente de default, texto em gradiente, `h-screen`, link morto, `alt` faltando, copy de placeholder, frase clichê, emoji-ícone, fonte default como display, spam de eyebrow, `transition-all`, `ease-in`, `scale(0)`, duração longa, animação de propriedade de layout, hover sem gate, reduced-motion ausente).

**HIGH corrige antes de entregar. MEDIUM corrige ou justifica em uma linha.** O resto da lista é olho — os scripts não veem hierarquia, ritmo, nem se a seção mostra ou conta.
