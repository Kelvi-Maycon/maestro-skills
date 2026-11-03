# Avaliação que decide a próxima mudança

## Barra e evidência

A barra pode ser contrato verificável ou referência real. Referência comparativa precisa ser acessível, relevante e observada na mesma tarefa, formato e condições; guardar localização/versão. Usá-la como calibração não autoriza copiar material protegido. Não reduzir o alvo depois de falhar nem substituir a referência silenciosamente.

Definir critérios decisivos e falhas eliminatórias antes de otimizar. Classificar cada critério como abaixo, no nível ou acima, com exemplo observável. Não compensar requisito obrigatório quebrado com média alta em acabamento.

| Entrega | Evidência pertinente | Prova insuficiente sozinha |
|---|---|---|
| Código/configuração | Reprodução ou teste do comportamento, consumidores afetados, diff e invariantes | Build, lint ou presença de uma string |
| Interface/design | Render real nos estados e viewports relevantes; interação quando necessária | Código que parece certo ou screenshot sem o estado afetado |
| Dados/análise | Fonte, população, período, fórmula, consulta e reconciliação dos números | Gráfico bonito, amostra tratada como total ou conclusão sem proveniência |
| Documento/skill | Conteúdo e contrato; links/metadados; casos de uso quando a mudança altera comportamento | Texto mais curto, nota subjetiva ou testes que repetem frases da própria skill |

Dimensionar a prova pelo efeito: um typo pode fechar no diff; regra de execução exige caso que revele o comportamento. Configuração que altera UI pode exigir navegador. Não carregar ferramentas irrelevantes por categoria.

## Crítica e verificação

- Autor propõe; crítico julga a saída; verificador testa a afirmação. São responsabilidades distintas, não uma obrigação de três processos.
- Para qualidade substantiva, usar revisor independente com o mínimo de contexto suficiente e sem racionalização do autor, quando disponível e autorizado. Sem independência, chamar de autorrevisão; não simular um crítico fresco no mesmo contexto.
- Ordem do crítico: primeiro escrever, só com o contrato, as provas e o que caracteriza uma versão aprovada; depois abrir o artefato e aplicar. Com resposta verificável, resolver às cegas antes de ler a do autor.
- Comparação cega esconde origem, não requisitos, fontes ou limitações necessárias. Se impossível, declarar. Comparar versões sob condições equivalentes e repetir com a ordem invertida; veredito que muda com a ordem não decide.
- Saída do crítico: `critério | passa ou falha | evidência localizada | como medir | gap prioritário`. Veredito por critério; nota única infla entre rodadas. Seu elogio não substitui teste; seu palpite não vence prova objetiva pertinente. Divergência exige verificar a observação.
- Dois degraus. O crítico rápido confere regra explícita, cobertura, saída de checagem e rodadas intermediárias. O crítico forte julga o que precisa ser derivado (correção de lógica, coerência do conjunto) e toda aprovação de saída.
- Crítico carimbador: em execução longa, uma vez, entregar ao crítico uma versão com defeito plantado. Se ele aprovar, reescrever o brief antes de aceitar qualquer aprovação.
- Toda prova aponta para a versão e o estado avaliados. Mudança que afeta a prova a invalida. Reutilizar o restante; repetir a verificação integrada quando a integração alterar comportamento ou coerência.

## Casos de avaliação de skills

Escolher poucos casos discriminantes: uso normal, fronteira que deve ficar fora, falha conhecida e combinação que pode gerar regressão. Pedidos devem exercer o procedimento sem entregar a resposta esperada ao executor. Julgar critérios separadamente da execução. Comparar antes/depois só com entradas, recursos e condições compatíveis; chamar simulação de simulação. Menos tokens no arquivo mede contexto carregado, não inteligência ou economia total da conta.
