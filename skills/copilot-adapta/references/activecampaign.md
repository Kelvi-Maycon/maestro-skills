# ActiveCampaign (AC)

Conta da Adapta. Acesso por dois caminhos:
- **Conector "ActiveCampaign"** (catálogo do Maestro, conta adapta8655): lê campanhas, templates, automações e contatos. Cria template a partir de campanha (`save_campaign_as_template`). Não apaga nem renomeia template (`manage_campaign_template` delete volta `not_supported`).
- **Sessão do AC no `agent-browser`** (logada pelo Kelvi): numa aba do AC, `agent-browser eval` com `fetch('/api/3/...', {credentials:'include'})`. Escrita precisa do header `X-XSRF-TOKEN` com o valor do cookie `XSRF-TOKEN` (decodeURIComponent). POST e DELETE funcionam. PUT muda `name`, mas ignora mudança de `content`/`ed_version`: para trocar conteúdo, criar template novo e apagar o antigo.

- `/app/builder/<id>` é **automação**, não campanha: ler com `catalog_retrieve-automation-blocks` (`path_params.id` como string). Blocos `send` dão o `campaignid` dos e-mails; blocos `post` dão a URL do webhook (n8n prod).
- Automação copiada ganha e-mails próprios (campanhas novas), mas mantém os mesmos webhooks da original.

## Template de e-mail: sempre editável no designer

Regra fixa: template entregue ao Kelvi abre no editor arrastar-e-soltar. Template que só edita como código é erro.

- `ed_version 3` = designer (Stripo). `content` é `JSON.stringify({html, css})`, com marcação Stripo (`esd-structure`, `esd-block-text`, `esd-block-button`).
- `ed_version 1` = HTML legado, só código. Não entregar assim.

Receita que funcionou (5 e-mails da Renovação One 27, templates 100106 a 100110):
1. Achar uma campanha já feita no designer com o layout de referência (ex.: campanha 2545, "[Renovação Teste Jun] Email 01").
2. `save_campaign_as_template(<id da campanha>)` cria um template base em v3. Ler o `content` dele pela sessão (`GET /api/3/templates/<id>`).
3. No navegador, `JSON.parse(content)`, montar o DOM do `html`, trocar só textos, links e imagens dentro dos blocos `esd-block-*` e manter a estrutura e o `css`.
4. `POST /api/3/templates` com `ed_version: 3`, `content: JSON.stringify({html, css})` e o nome final.
5. Conferir: o `content` gravado é igual ao montado, e o template abre no designer (`/app/templates/<id>` → editar mostra blocos).
6. Apagar o template base temporário e versões antigas só com OK do Kelvi.

Cuidados:
- Não digitar HTML à mão: já gerou template truncado e com erro de digitação. Gerar por script e conferir por hash ou comparação de texto.
- Estado JS da aba se perde ao abrir o editor (diálogo "Sair do site?"). Guardar o que foi montado em arquivo/variável antes de navegar.
- Link de botão de e-mail: `https://go.adapta.org/campaign/<slug>?email=%EMAIL%&name=%FIRSTNAME%&phone=%PHONE%&utm_content=emailNN`.

## Trocar conteúdo de e-mail que já está na automação

E-mail criado a partir de template não acompanha mudança no template. Para trocar o conteúdo da mensagem da campanha da automação: `POST /api/3/content/autoSave {campaignId, messageId, html, css}` (a mesma chamada do editor; grava designer e html de envio). Preview: `PUT /api/3/messages/<id>` só com `preheader_text`. Conferir por GET da mensagem (texto no `body.textContent`; o html enviado não tem as classes `esd-block-*`).

## Onde o Kelvi usa o template

Na automação: bloco "Enviar e-mail" → "Criar um email novo" → aba de modelos. "Começar a partir de email existente" lista só campanhas, não templates. Se o Kelvi não achar o template, apontar esse caminho.
