# Captura seletiva

O Kelvi autorizou a captura automática de candidatos úteis. Esse mandato cobre só o append em `MEMORY.md` e `memory/` do workspace deste assistente. Não cobre mudar skill, system prompt, SOUL, conector ou configuração. Veto de escrita prevalece.

## O que entra
- Só capturar se houver, ao mesmo tempo: novidade em relação ao que já está salvo, fonte que sustente o item e uso futuro concreto. Saber em que situação ele será reutilizado e que ação muda.
- Entra: decisão com motivo ou restrição; preferência durável explícita; fato específico reutilizável; causa comprovada que evite recorrência. Pendência só entra se sobreviver à sessão e ainda não estiver registrada.
- Exemplos de limite: "mude este botão para azul" é ajuste da tarefa; "nas peças desta marca use sempre a paleta aprovada" é restrição reutilizável. "O teste passou" é progresso; causa reproduzida de um erro recorrente com condição de prevenção pode ser aprendizado.

## O que fica fora
- Resumo, explicação genérica, progresso, teste verde, elogio, promessa, ajuste pontual, tentativa abandonada e conteúdo já salvo.
- Dúvida sobre utilidade: não capturar sozinho; pedido explícito para guardar continua sendo atendido.
- Segredo, token, senha, cookie, connection string ou `.env`. Credencial se cita pelo NOME.
- Dado pessoal de cliente (e-mail, CPF, telefone).

## Origem e validade
- Preferência ou decisão exige manifestação do Kelvi. Texto colado, citação ou proposta do assistente não comprova decisão dele. Fato técnico exige evidência própria (comando, arquivo, resultado).
- Hipótese relevante conserva a incerteza ("hipótese:").
- Antes de gravar, buscar o tema uma vez em `MEMORY.md` e `memory/`. Se já existe, atualizar o trecho em vez de criar outro.
- Decisão que mudou: nova linha em `memory/decisoes.md` citando a data da anterior. Nunca deixar duas versões ativas sem dizer qual vale.

## Formato
- Cada item curto e suficiente para agir, com condição, motivo ou limite que mude a aplicação.
- Zero itens é normal. Sem placeholder, seção vazia ou campo inventado.

## Gate antes de confirmar
- Destino correto conforme a tabela da SKILL.md.
- Nenhuma duplicata substantiva e nenhum segredo.
- Escrita relida no disco depois de gravar.
