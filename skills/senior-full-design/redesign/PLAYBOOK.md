# Rota: Redesign

Mexer em produto visual que já existe. A regra que governa tudo aqui: **a menor mudança que satisfaz o pedido**.

O modo de falha desta rota não é fazer feio — é fazer bonito e quebrar coisa que funcionava. Rota quebrada, evento de analytics perdido, campo de formulário renomeado, acessibilidade removida em nome do visual. Nada disso aparece num screenshot.

---

## 1. Classifique o modo antes de editar

| Modo | O que é | Postura |
|---|---|---|
| **Extensão** | adicionar ou mudar um elemento delimitado dentro do sistema atual | case o vocabulário existente. O elemento novo deve ser indistinguível dos originais. Não "melhore" superfície não relacionada. |
| **Redesign · preserva** | modernizar mantendo identidade, arquitetura de informação, voz e contratos de comportamento | evolução dirigida. Pare quando o brief foi atendido. |
| **Redesign · reforma** | linguagem visual nova, mantendo produto, conteúdo e contratos técnicos | reforma **não** é permissão pra reescrever tudo. |

Preservar ou reformar mudaria materialmente o resultado e o pedido está ambíguo? Faça **uma** pergunta focada.

---

## 2. Auditoria antes da edição

Registre o estado atual. Sem isso, você não sabe o que está preservando.

**Sistema visual**
- Papéis de cor e as proporções reais de uso
- Famílias, escala, pesos, comprimento de linha
- Ritmo de espaçamento e largura de container
- Raio, borda, sombra, regras de elevação
- Ícone, ilustração, fotografia, tratamento de imagem
- Duração, curva, gatilho e estilo de feedback do motion

**Produto e conteúdo**
- Árvore de páginas, navegação, jornadas-chave, caminhos de conversão
- Blocos de conteúdo existentes e a função de cada um
- Voz da marca, copy legal, localização, dado real
- Estados de loading, vazio, erro, disabled e permissão

**Contratos técnicos**
- Rotas, slugs, âncoras, deep links
- Nome, ordem, validação e autofill dos campos de formulário
- Eventos de analytics, data-attributes, seletores de teste, hooks de experimento
- APIs de componente e quem consome elas
- Semântica de acessibilidade, comportamento de teclado, ordem de foco, anúncios
- Metadado de SEO, canonical, dado estruturado, card social

**Dívida** — separe em três listas:
- **Preservar** — força reconhecível ou crítica de contrato
- **Melhorar** — hierarquia fraca, espaçamento, contraste, responsividade, craft
- **Remover** — poluição sem suporte, padrão quebrado, interação morta, conteúdo fabricado

---

## 3. Contratos protegidos

Nunca mude em silêncio:

- Estrutura de rota, slug, ID de âncora, rótulo de navegação primária
- Logo, wordmark, asset crítico de identidade
- Nome e ordem de campo de formulário, comportamento de envio
- Copy legal, de consentimento, de privacidade, de preço, de compliance
- Evento de analytics, seletor, identificador de experimento
- Ganho de acessibilidade que já existe
- API pública de componente, chave de estado persistido
- Conteúdo e dado real fornecidos pelo usuário

Se o resultado pedido genuinamente exige mexer num desses, **peça autorização**.

---

## 4. Ordem de modernização — do menor risco pro maior

Aplique a alavanca mais barata que resolve o problema, e reavalie:

1. Corrigir falha funcional e de acessibilidade
2. Consertar hierarquia e tipografia
3. Normalizar espaçamento, alinhamento e responsividade
4. Consolidar tokens e remover estilo solto
5. Melhorar estados e feedback de interação
6. Adicionar motion justificado
7. Recompor hero ou seção-chave
8. Substituir bloco inteiro — só quando ele não tem conserto

**Em modo preserva, pare assim que o brief for atendido.** Não transforme trabalho incremental em redesign de portfólio.

Na prática, a maior parte do "esse site parece velho" morre nos passos 2 e 3. Quem começa pelo 7 gasta cinco vezes mais e entrega risco no lugar de resultado.

Os passos **1, 3 e 5** são a rota UI inteira — grade de controle, ritmo de espaço, affordance e magnitude de estado, com um censo mecânico do que já existe. Carregue `../ui/PLAYBOOK.md` pra executá-los. Se o pedido inteiro cabe neles, era rota UI, não redesign.

---

## 5. Diais

- **Extensão** — case todos os diais atuais; fidelidade de marca em 10.
- **Preserva** — densidade e assets estáveis; variância e motion mudam no máximo 1 ponto, salvo pedido.
- **Reforma** — derive variância e motion do brief, mas mantenha um **mapa de densidade de conteúdo** pra nenhuma informação sumir na troca.

---

## 6. Plano antes e depois

Pra redesign não-trivial, declare — é registro de decisão, não redação:

```
Modo:
Preservar:
Melhorar:
Remover:
Contratos protegidos:
Leitura + diais:
Mudança de maior risco:
Plano de volta:
```

Antes de refatorar arquivo já aprovado, **salve a versão anterior** (cópia ou commit) pra reverter em um passo.

---

## 7. Verificação

Confirme por inspeção que o escopo pedido foi atendido e que os contratos protegidos continuam de pé. Rode as varreduras:

```bash
python3 scripts/anti_slop_scan.py <arquivos alterados>
python3 scripts/audit_motion.py <arquivos alterados>
```

**Leia o lado removido do diff.** Regressão é invisível olhando só o estado final: `aria-label` que sumiu, anel de foco que sumiu, `prefers-reduced-motion` que sumiu, `alt` que sumiu. Só aparece nas linhas `-`.

Verificação renderizada (screenshot, preview) é o que fecha: mudança visual não se declara pronta por leitura de código. Não deu pra rodar? Escreva `não verificado: <motivo>`.

Nas jornadas preservadas, teste o caminho inteiro — não a tela isolada.
