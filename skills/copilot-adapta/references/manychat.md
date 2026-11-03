# ManyChat (WhatsApp)

Conta WhatsApp da Adapta: `fb1409445`. Operação pelo `agent-browser`, na sessão do ManyChat que o Kelvi logou. Não há API usada até agora.

## Modelo de mensagem (template Meta)

- Criar: `https://app.manychat.com/fb1409445/settings/whatsapp/messageTemplates/create`
- Lista e status: `https://app.manychat.com/fb1409445/settings#whatsApp/templates` (Revisar → Aprovado; aprovação leva de segundos a horas).
- Nome: o Kelvi define. Colchetes, espaços e acento são aceitos. Padrão usado: `[Adapta one 27] [Renovação] [Recuperação de renovação] [api1]` … `[api7]`.
- Categoria Marketing, idioma Portuguese (BR), salvo pedido diferente.
- Limites Meta: corpo 1024 caracteres; texto de botão URL 25; um botão URL por template.
- Corpo não pode começar nem terminar com a variável: emoji ou espaço antes do nome não contam como texto ("Template body cannot start or end with a variable"). Pôr ao menos uma palavra antes, ex.: "⏰ Último aviso, {nome}.".
- Template aprovado pode ser editado ("Editar Modelo" → corpo → "Enviar Para Análise"); volta para "Revisar". Envio recusado não grava nada.
- O formulário de edição não guarda as amostras: "Enviar Para Análise" fica desabilitado até preencher de novo (Primeiro Nome: "Aluno"; E-mail: um e-mail de exemplo).
- Ler o template gravado sem editar: `/fb1409445/settings/whatsapp/messageTemplates/view/<nome>?language_code=pt_BR` (o `value` dos inputs traz a URL do botão).
- Template é compartilhado: a mesma tag/flow/template pode ser disparada por mais de uma automação do AC (ex.: 213 ativa e a cópia 339 usam `renovacao-many-msgNN-v2`). Antes de editar, ver quais automações chamam o webhook e avisar o Kelvi.
- **Trocar CTA de WhatsApp = template + flow.** Editar a URL só no template não basta: o `keyboard` do flow (getFlowData) guarda a URL antiga. No mesmo pedido, atualizar o botão em cada flow que usa o template e publicar (o Kelvi cobrou quando ficou só no template, 20/10/2026). A URL do botão no flow é só leitura: em `/cms/files/<id>/edit`, X da mensagem → "Apagar" → "Escolher Modelo de Mensagem" → buscar o nome → escolher (conferir o nome no painel: a lista recarrega e já pegou template errado) → "Atualização" (publica). Texto e Primeiro Nome voltam do template; as métricas do bloco zeram. Conferir por `fetch('/fb1409445/flow/getFlowData?ns=<content…>', {headers:{'X-CSRF-Token': __INIT__['app.csrf_token']}})`: keyboard, tag do gatilho, `has_unpublished_changes:false`. Depois de editar um template, o flow pode mostrar "Modelo não encontrado" até reescolher.
- Apagar ou publicar flow LIVE só com o OK do Kelvi na hora, na conversa com ele.
- "Invalid templateId provided" ao editar: o `template_id` passa de 2^53 e o front arredonda (api6: real …494, enviado …496). Pela interface não edita; editar no WhatsApp Manager da Meta ou pedir ao Kelvi outro caminho.
- **Botão de CTA em todo template** (regra do Kelvi): tipo "Botão URL", com texto e link da página de campanha (`https://go.adapta.org/campaign/<slug>`).
- Nome do contato: usar o campo nativo pelo ícone `{}` → "Campos do Sistema" → "Primeiro Nome" (vira `{{first_name}}`). Digitar `{{1}}` como texto não vira variável. Amostra para a Meta: **"Aluno"**.
- Sem cabeçalho e sem rodapé, salvo pedido.

Como preencher sem erro:
- O corpo pode ir pelo setter nativo do textarea (`Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set` + evento `input`). Digitar pelo teclado perdeu uma quebra de linha.
- Variável: gravar o corpo sem o `{{1}}`, pôr o cursor na posição com `setSelectionRange`, apertar `ArrowRight ArrowLeft` de verdade (o componente só registra o cursor com evento real), clicar no `{}` e escolher "Primeiro Nome". Variável inserida pelo setter fica texto puro e não pede amostra.
- O campo de amostra aparece depois que o textarea perde o foco.
- Logo após navegar, os primeiros cliques às vezes não pegam: tirar um screenshot e só então preencher; esperar ~0,5 s entre abrir dropdown e escolher opção.
- Conferir antes de enviar: `textarea.value` igual ao texto aprovado (com `{Primeiro Nome}` no lugar de `{{1}}`), texto e URL do botão, amostra.
- "Enviar Para Análise" manda para a Meta: só com OK do Kelvi. O envio demora até ~15 s; sucesso = página vira "Editar Modelo" com status "Revisar".

## Automação (flow) com template

- As automações ficam em `cms/files/<id>/edit`. O canvas do Flow Builder pode não carregar na aba do `agent-browser`: usar "Ir Para Construtor Básico" (menu ⋮ no topo direito).
- Passo: WhatsApp → "Enviar dentro da janela de 24 horas" → trocar para **"fora da janela de 24 horas"** → "Escolher Modelo de Mensagem" → buscar por `[apiN]` → escolher.
- Template com nome mapeia sozinho para "Primeiro Nome". Logo ao abrir, o chip pode mostrar "Nenhum campo selecionado" até carregar; reabrir e conferir antes de concluir que perdeu o mapeamento. A prévia do celular com o nome preenchido confirma.
- Edição salva sozinha como rascunho (DRAFT, "Salvo"). **Publicar** deixa LIVE e ativa o gatilho na hora: só com OK explícito do Kelvi, porque passa a enviar para contato real.
- Conferir por automação: nome do flow, template `[apiN]`, botão e LIVE/DRAFT via `document.body.innerText`.

## Funil de recuperação One 27 (referência)

Flows `rec-msg01-one27` … `rec-msg07-one27` (tags 97980132 … 97980262). Templates api1–api7 vinculados e publicados em 14/10/2026.
