# `.design-lock.md` — contrato do projeto

Um arquivo na raiz do projeto. Ele existe pra a **segunda tela não re-derivar o que a primeira já decidiu** — a causa número um de um produto onde cada tela parece de um produto diferente.

**Existe o arquivo → leia e reuse os valores exatos.** Só revise quando o usuário pedir mudança de direção explicitamente.

---

## Precedência

Quando duas fontes discordam, esta é a ordem:

1. Pedido atual do usuário
2. `.design-lock.md`
3. Decisões registradas no log do projeto
4. Preferência durável do usuário entre projetos

Decisão ainda pendente de revisão orienta a revisão, mas **nunca conta como aprovação**.

---

## Formato

```markdown
# Design lock — <projeto>

## Direção
- Âncora: linear | custom | <nome da recipe>
- Leitura: <artefato> pra <público>, linguagem visual <família específica>
- Diais: variância 6 · motion 5 · densidade 4 · asset 6 · marca 5
- Modo ativo: <se houver override estético>

## Contrato de cor
- text: #_____   bg: #_____   surface: #_____   border: #_____
- primary: #_____   on-primary: #_____   secondary: #_____   accent: #_____
- Pares seguros pra texto (≥ 4,5:1): text/bg, text/surface, on-primary/primary
- Pares seguros pra UI (≥ 3,0:1): border/bg, accent/bg
- Pares decorativos (não carregam texto): _____
- Dark mode: travado claro | travado escuro | toggle (mesmo seed, ambos verificados)
- Verificado em: <data> por check_contrast.py --matrix

## Tipografia
- Display: <família> <pesos> · tracking <valor>
- Corpo: <família> <pesos> · line-height <valor> · medida <ch>
- Mono: <família> — só pra <papel>
- Escala: <lista de degraus usados>

## Densidade e espaçamento
- Escala usada: <apenas os degraus realmente usados>
- Padding de card: compacto _____ · conteúdo _____ · showcase _____
- Padding de seção: conectiva _____ · padrão _____ · pivô _____
- Mobile: desce _____ tiers

## Forma
- Raio por papel: botão _____ · card _____ · painel _____ · input _____
- Elevação: 1 _____ · 2 _____ · 3 _____
- Borda: <cor + espessura + onde aparece>

## Motion
- Curvas: --ease-out _____ · --ease-in-out _____
- Durações: press _____ · popover _____ · dropdown _____ · modal _____
- Motor de scroll: <um só, ou nenhum>
- Reduced motion: <o que colapsa e pra quê>

## Assets
- Set de ícones: <um só>
- Divisão foto/ilustração: <regra usada>
- Logo: <caminho, ou "construído", ou "pendente">
- Fonte dos assets: <onde vieram>

## Estrutura
- Última macroestrutura usada: <nome>
- Arquétipos usados: nav <id> · hero <id> · prova <id> · CTA <id> · rodapé <id>
- Próxima construção rotaciona pra: <diferente da anterior>

## Decisões
- <data> · mantido: <escolha> — <motivo do usuário>
- <data> · rejeitado: <escolha> — <motivo>
- <data> · pendente: <escolha> — <precisa de resposta sobre o quê>
```

---

## Rotação de estrutura

O bloco **Estrutura** é o que impede a skill de construir a mesma forma toda vez. Antes de montar uma página nova, leia o que foi usado por último e escolha macroestrutura e arquétipos **diferentes** — reusando um arquétipo, mude ao menos um parâmetro dele.

Diga essa escolha em voz alta antes de construir. Escolher no papel é o que quebra o atrator padrão; escolher enquanto constrói volta pro default toda vez.

---

## Captura de decisão

Toda passada de design termina com uma pergunta de manter/rejeitar — **específica, uma só**, não um "o que achou?" aberto:

> "Mantenho essa densidade de hero, ou testo uma versão mais quieta?"

Registre a resposta real. Rodada autônoma sem ninguém pra responder: registre como **pendente**, com a escolha, a superfície e o motivo — nunca fabrique aprovação.

Na sessão seguinte, resolva as pendentes que afetam o trabalho novo antes de seguir. Não edite linha antiga pra deixar o histórico bonito.

No fim, diga o que mudou: lock atualizado ou não, decisão registrada ou não.
