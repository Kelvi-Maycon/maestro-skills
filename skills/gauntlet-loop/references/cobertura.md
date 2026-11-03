# Cobertura de mudanças repetidas

Aplicar quando o pedido abrange várias instâncias, instalações, estados ou consumidores. Cobertura é estado correto de cada alvo, não igualdade entre contagens de palavras.

1. **Delimitar:** raízes e consumidores autorizados, variantes de nome, instâncias dinâmicas e exclusões justificadas. Arquivo inacessível entra como lacuna, não desaparece do inventário. Não ampliar uma mudança local para todos os projetos.
2. **Enumerar:** usar busca/glob ou consulta somente leitura para listar alvo, localização, estado atual e estado esperado. Incluir chamadas, configuração, espelhos, registro e fonte sincronizada quando pertinentes. Agrupar milhares de itens por classe verificável, conservando identificadores.
3. **Conferir a descoberta:** em propagação ampla, cruzar outro ângulo: símbolo vs chamada, configuração vs consumidor, código vs estado renderizado. Investigar divergências; não exigir um crítico só para aprovar uma lista mecânica.
4. **Definir prova por alvo:** regra executável ou observação que distingue correto de apenas presente. Busca textual prova texto; não prova que o runtime carregou a configuração nem que todo estado visual está certo.
5. **Corrigir por classe e verificar o conjunto final:** alterar a origem e consumidores afetados; não refatorar arquitetura apenas porque há repetição. Centralizar só quando resolver a causa dentro do escopo e preservar os contratos.

## Renomear e consolidar

- Proibir o nome antigo **onde ele funciona como chamada obsoleta**. Exigir zero nesse conjunto, com padrão e raízes explícitos.
- Histórico, backups, nome real de aplicativo e alias compatível podem conservar o termo quando houver razão. Registrar a classificação; não usar “legado” para esconder consumidor que continua chamando a skill removida.
- Não exigir `quantidade nova = quantidade antiga`: consolidação pode mapear várias instâncias para uma fonte. Provar cada ligação e destino esperado, além da ausência de chamadas inválidas.
- Exemplo: renomear a skill `notas` para `conhecimento-pessoal` exige corrigir invocações e caminhos da skill. Uma pasta real `notas/` no repo e o nome de um aplicativo continuam válidos.

## Superfícies dinâmicas

Inventariar telas, estados e variantes pertinentes: modal aberto, menu, erro, conteúdo vindo de CMS, viewport que muda layout. Uma captura pode provar vários itens visíveis; itens escondidos exigem outra observação. Contagem de screenshots não demonstra cobertura. Renderização, acessibilidade e teste funcional se complementam conforme o requisito.

Fechar com `verificados / esperados`, faltantes e exclusões justificadas. Amostra não é total; se o universo não pôde ser enumerado, limitar explicitamente a conclusão.
