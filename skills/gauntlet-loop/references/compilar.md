# Compilar para outro agente

Entregar apenas um prompt autocontido, preenchido com o contexto conhecido. Não executar a tarefa nem acrescentar oferta ou confirmação automática. Se faltar decisão indispensável, explicitar a lacuna; não inventar referência, orçamento ou ferramenta disponível.

```text
Entregue [artefato] para [uso/público], no escopo [alvos], respeitando [restrições e autorização]. Alvo: [atingir contrato / igualar ou vencer referência acessível]. Critérios decisivos: [critérios]. Provas: [testes/observações]. Invariantes: [o que preservar].

Se houver mudança repetida, enumere alvos e estado esperado, confira consumidores e variantes e prove cada alvo. Na busca final, proíba chamadas antigas onde inválidas; preserve ocorrências legítimas classificadas. Consolidação não exige igualdade entre contagens de palavras. Amostra não prova cobertura total.

Preserve a baseline relevante; sem artefato, construa primeiro uma V1 coerente, e com a abordagem em aberto até 3 V1 distintas em paralelo, escolhendo às cegas. Divida apenas partes independentes, com um dono por parte acoplada e um responsável pela integração. Tarefa determinística pequena admite alteração e prova direta. Em julgamento substantivo, use crítica independente quando disponível e autorizada, sem impor número de agentes; se não houver, declare autorrevisão. O verificador pode ser um teste.

Antes de abrir a entrega, quem julga escreve as provas a partir do contrato; o autor não recebe essa lista. Prove do barato ao caro: checagem determinística, crítico rápido sobre o que mudou, crítico forte na saída. O rápido reprova sozinho; aprovação exige o forte. Compare a saída real com o contrato/barra em condições equivalentes, às cegas e com a ordem invertida na repetição. Identifique o maior gap: classe inteira de faltantes para cobertura; causa de maior impacto para qualidade. Faça uma mudança dirigida, verifique efeito e regressões e mantenha a campeã: versão nova só a substitui com melhora comprovada. Em UI, observe a renderização durante a iteração quando necessário e reutilize a sessão. Provas identificam versão e estado; reaproveite apenas as ainda válidas.

Se o mesmo gap voltar, meça a afirmação do crítico antes de tentar de novo. Se resistir a duas rodadas ou faltar evidência nova, investigue a causa e mude a estratégia. Sem caminho útil, informe o bloqueio. Respeite limites definidos pelo usuário; nunca invente métricas ou vitória.

Antes de concluir, verifique a versão final integrada, que é a campeã e pode não ser a última: requisitos, cobertura, função, coerência, alvo e invariantes. Só declare concluído sem requisito obrigatório pendente ou gap crítico e com evidência. Em bloqueio/teto, entregue o melhor estado verificado e pendências. Comunique resultado, prova e limitações com concisão.
```
