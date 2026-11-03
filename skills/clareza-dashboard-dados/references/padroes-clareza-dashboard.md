# Padroes De Clareza Para Dashboard

## Quando Ler

Leia este arquivo quando a execucao exigir criterio mais forte sobre clareza, acessibilidade, glossario, tooltip, semantic layer ou documento de implementacao.

## Principios De Linguagem

- Escrever para o usuario real da dashboard, nao para quem construiu a query.
- Usar palavras familiares antes de siglas.
- Preferir frases curtas, concretas e verificaveis.
- Evitar substantivos abstratos quando um verbo ou frase direta resolve.
- Repetir contexto essencial em cada bloco e evitar dependencia de memoria.
- Testar mentalmente: "uma pessoa sem contexto entende em ate 30 segundos?"

Fontes usadas como base: PlainLanguage.gov e Digital.gov plain language.

## Principios De Visualizacao

- O titulo deve dizer o que o grafico mostra, nao apenas nomear a entidade.
- Colocar contexto verbal perto do dado reduz busca mental e interpretacao errada.
- Toda comparacao precisa deixar claro base, periodo, filtro e grupo comparado.
- Graficos memoraveis nao compensam definicao fraca; a prioridade e interpretacao correta.
- Se a visualizacao responde uma pergunta, nomeie a pergunta antes de detalhar o numero.

Fontes usadas como base: Munzner, Segel/Heer, Franconeri et al. e pesquisa de visualizacao narrativa.

## Acessibilidade

- Nao depender so de cor para transmitir estado, alerta, grupo ou tendencia.
- Grafico precisa ter texto alternativo ou resumo textual quando a informacao nao estiver disponivel em tabela.
- Links precisam ter proposito claro no contexto.
- O asterisco `*` deve ser clicavel/focavel e ter rotulo acessivel.
- Contraste, foco de teclado e ordem de leitura precisam ser considerados quando houver implementacao web.

Fontes usadas como base: W3C WCAG 2.2, Use of Color, Link Purpose e Non-text Content.

## Tooltip E Ajuda Contextual

Tooltip e suporte complementar.
Se o usuario precisa dele para nao entender errado, a informacao deve aparecer visivel como label, subtitulo, nota ou secao metodologica.

Use tooltip para:

- definicao curta;
- lembrete de filtro;
- detalhe secundario;
- explicacao de icone.

Nao use tooltip para:

- formula essencial;
- ressalva que muda a leitura do numero;
- fonte do dado quando a confianca depende dela;
- contexto sem o qual o card fica ambiguo.

Fonte usada como base: Carbon Design System tooltip guidance.

## Semantic Layer E Linhagem

Cada metrica deve separar:

- metrica: numero calculado;
- dimensao: forma de cortar o numero;
- filtro: condicao aplicada;
- entidade: usuario, cliente, lead, venda, conta, evento;
- grao: nivel da linha antes de agregar;
- fonte: tabela, model, query, endpoint ou planilha;
- freshness: quando a fonte atualiza.

Se a dashboard usa dbt, semantic layer, LookML, BI model ou queries SQL, priorize esses artefatos como fonte da verdade antes de inferir pelo texto da interface.

Fontes usadas como base: dbt semantic models, metrics, sources e lineage.

## Padrao De Glossario Com Asterisco

Exemplo de exibicao:

`CAC* (custo de aquisicao de cliente)`

Exemplo de destino:

```md
### CAC - custo de aquisicao de cliente

Definicao:
Media de investimento necessario para gerar um novo cliente considerado nesta dashboard.

Formula:
Investimento em aquisicao / novos clientes do periodo.

Fonte:
[tabelas/models/queries]

Como interpretar:
Quanto menor, mais eficiente foi a aquisicao, desde que a qualidade dos clientes nao tenha piorado.

Cuidado:
Nao comparar CAC de canais com janelas de atribuicao diferentes.
```

## Criterios De Aceite De Uma Correcao

Uma recomendacao so esta pronta se tiver:

- componente afetado;
- problema atual;
- risco de interpretacao;
- texto recomendado;
- definicao da metrica;
- fonte/logica ou status `nao inferivel`;
- instrucao de implementacao;
- criterio de aceite;
- perguntas pendentes quando houver.
