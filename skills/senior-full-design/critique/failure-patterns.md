# Falhas por tipo de artefato

Os portões de `anti-slop.md` são a lista completa. Este arquivo diz **quais importam pra este artefato**, e o que fazer quando um dispara. Não leia inteiro — vá na sua seção.

Reporte só o que é consequente. Não despeje catálogo na resposta do usuário. Corrija o que é seguro e está no escopo; traga à tona o que envolve trade-off.

---

## Landing / página de marketing

Portões críticos: **15** (template genérico) · **16** (eyebrow repetido) · **17** (zigue-zague) · **25** (muro de texto) · **26–28** (prova inventada) · **35** (seção sem asset) · **22** (padding chapado).

| Falha | Reparo |
|---|---|
| Hero centralizado + gradiente + dois CTAs sem justificativa | reavalie hierarquia de conteúdo, papel do asset, público e viewport; escolha a composição que deixa **essas** restrições mais claras |
| Alternância esquerda/direita como única variação entre seções | insira uma prova full-width, uma narrativa vertical, uma comparação, uma galeria, ou uma pausa de texto focada |
| Rótulo minúsculo em caixa alta acima de todo título | remova os de baixa informação; varie com frase de abertura, imagem, número ou título direto |
| Métrica, depoimento, logo ou selo fabricado | placeholder marcado, ou peça a prova real. Falsa credibilidade é pior que lacuna honesta |
| CTAs com rótulos diferentes pro mesmo destino | normalize, ou deixe claro que os desfechos são diferentes |
| Hero com CTA abaixo da dobra, ou display cortando | recomponha. Não force limite universal de palavra — o artefato pode precisar de outra leitura |

**Exceções legítimas:** manifesto e página cerimonial de lançamento podem usar hero centralizado; sistema editorial indexado de propósito pode usar eyebrow em todas as seções.

---

## Dashboard e UI de produto

Portões críticos: **53** (estado faltando) · **22–23** (espaçamento) · **10** (hierarquia) · **57** (URL) · **60** (overflow) · **47** (motion — track de app shell, não de landing).

| Falha | Reparo |
|---|---|
| Estilo de marketing em UI operacional: título gigante, respiro exagerado, card cinematográfico | suba a densidade, estabilize a grade, deixe estado claro, priorize conclusão de tarefa |
| Visualização decorativa: gradiente, 3D, sombra e animação atrapalhando comparação | melhore data-ink, rótulos, cor semântica e alternativa acessível |
| Componente só no caminho feliz | adicione loading, empty, erro, permissão, disabled e overflow |
| Timeline de hero forçada num dashboard | o track certo é outro: transição de painel/aba, entrada escalonada de lista ao carregar dado, mudança de estado animada, skeleton |
| Padding de landing importado pra tela de configuração | volte pra densidade compacta; respiro de hero em settings só gasta scroll |

**Cor de métrica segue o negócio, não a direção da variação.** Onde menor é melhor (reembolso, churn, CAC), o valor menor é verde e o pior é vermelho — mesmo com variação negativa. Vale em tabela, card e gráfico.

---

## Deck / apresentação

Portões críticos: **10** (hierarquia) · **25** (mostrar vs. contar) · escala mínima.

| Falha | Reparo |
|---|---|
| Muro de texto no slide | uma ideia central por página; visual lidera, texto apoia |
| Texto abaixo de 24px em canvas 1920×1080 | suba a escala; distância de visão manda |
| Mais de duas cores de fundo no deck inteiro | consolide |
| Numeração 0-indexada | 1-indexada sempre — "slide 5" precisa corresponder ao rótulo `05` |

---

## Redesign de UI existente

Portões críticos: contratos protegidos (`../redesign/PLAYBOOK.md`) · **54** (foco removido) · **41** (`alt` removido).

| Falha | Reparo |
|---|---|
| Contrato protegido mudado em silêncio (rota, campo, evento, copy legal) | reverta e peça autorização |
| Ganho de acessibilidade removido pelo visual | leia o lado `-` do diff; restaure |
| Trabalho incremental virando redesign de portfólio | pare quando o brief foi atendido |
| Escopo pulando direto pra recompor hero | aplique a alavanca mais barata primeiro: função → hierarquia → espaçamento → token → estado → motion → composição |

---

## Motion e artefato cinematográfico

Portões críticos: **43–52**.

| Falha | Reparo |
|---|---|
| Motion só como espetáculo — removê-lo não muda entendimento nenhum | remova, ou baixe o dial, ou amarre a estado com significado |
| Estado amplo de framework atualizado a cada frame de scroll ou ponteiro | CSS, motion value, observer |
| Vários espetáculos competindo na mesma superfície | escolha um momento de assinatura; o resto fica quieto |
| Sem caminho de reduced motion | preserve ordem de conteúdo e conclusão da interação sem depender de animação; renderize estado final |
| Texto dividido palavra a palavra quebrando o nome acessível | mantenha o conteúdo não-dividido acessível; esconda as palavras decorativas da tecnologia assistiva |

---

## Trabalho com imagem gerada

| Falha | Reparo |
|---|---|
| Deriva entre imagens: paleta, material, luz, tipografia ou símbolo mudando de uma pra outra | reuse a bíblia visual e **regere** o frame divergente, não remende com decoração |
| Pílula e legenda sobrepostas na imagem sem identificar, controlar ou explicar | mova o metadado necessário pra uma legenda estável, ou remova |
| Imagem gerada anterior usada como referência da próxima | parta sempre do briefing atual + design system; iterar por cima acumula ruído |
| Cadeia de edições sobre output gerado | com a composição aprovada, **recrie do zero numa passada só** a partir das fontes originais |

---

## Fechamento

Corrija o que é seguro e está no escopo. Traga à tona só o que envolve trade-off ou muda a intenção. E quando um portão dispara mas o brief genuinamente ganha dele, diga a razão em uma linha — não deixe passar em silêncio, e não corrija por reflexo.
