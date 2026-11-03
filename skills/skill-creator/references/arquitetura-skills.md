# Arquitetura de skills

Material interno da Skill Creator: escolher escopo, acionamento, descrição e divisão de conhecimento. Mantém os métodos de arquitetura incorporados à skill, com as mecânicas dependentes do runtime separadas das heurísticas de escrita.

## Decidir o que merece uma skill

- Regra universal curta, usada em qualquer trabalho: instrução global. Regra de um repositório: instrução do projeto. Procedimento especializado e reutilizável: skill. Acesso a serviço: ferramenta/MCP, eventualmente usado pela skill. Distribuição de vários recursos: plugin.
- Não copiar um manual inteiro para AGENTS/CLAUDE só para garantir uso: seu texto passa a disputar contexto com todo pedido. Um gatilho curto e preciso pode apontar para procedimento sob demanda.
- Quando duas skills entregam o mesmo resultado e diferem por etapas, consolidar com rotas internas. Quando mudam o produto entregue ou os limites de escrita, manter separadas e explicitar a fronteira.
- A instrução deve mudar uma decisão, evitar erro real ou reutilizar informação que seria cara de redescobrir. Definições genéricas do que é PDF, API ou JSON não precisam estar aqui.

## Acionamento: conferir o runtime antes da descrição

| Instalação | Modo manual | Observação |
|---|---|---|
| Claude Code pessoal | `disable-model-invocation: true` no frontmatter | Invocação explícita com `/nome`; `user-invocable: false` trata a visibilidade do comando e não substitui o bloqueio de ativação |
| Conta Claude e plugins | Inspecionar também a origem e a política dessa superfície | Editar cache local pode ser desfeito pela sincronização ou atualização |

Nome e descrição ajudam o modelo a selecionar entre skills elegíveis; flags, configuração, disponibilidade e instruções também interferem. Não afirmar que descrição é o único filtro ou que toda skill instalada injeta seu corpo. A aparência na interface não prova acionamento automático.

Os caminhos efetivos variam por runtime: verificar as instalações atuais antes de criar ou mover. No Maestro cada assistente tem as skills em `skills/<nome>/SKILL.md` no próprio workspace; não há repositório compartilhado. Não confundir a Skill Creator pessoal com a homônima nativa de sistema/plugin.

## Escrever a descrição

- Automática: capacidade concreta + situação em que ajuda + limite que a diferencia quando necessário. Usar palavras do usuário e variações reais, sem lista artificial de keywords ou insistência que amplie o escopo.
- Manual: manter descrição mínima de invocação. Não otimizar para ativação espontânea uma skill que deve ficar bloqueada.
- Não impor 200–400 caracteres, mínimo de seis gatilhos ou qualquer cota de palavras. O critério é discriminar pedidos positivos e negativos com o menor texto que mantém essa precisão.
- Colocar o procedimento no corpo. A descrição não deve tentar substituir todas as instruções nem prometer um resultado que depende de recursos inexistentes.

Exemplo automático: “Extrai tabelas de PDFs e preserva colunas ao exportar para planilha. Use para tabela em PDF; não para planilha já estruturada.”

Exemplo manual: `Manual-only: $growth-data-expert.` acompanhado do bloqueio nativo de ativação.

## Distribuir o conteúdo

| Camada | Conteúdo | Custo a considerar |
|---|---|---|
| Catálogo elegível | Nome, descrição, caminho e metadados do runtime | Medir a listagem realmente injetada, não apenas número de pastas |
| `SKILL.md` | Contrato, fluxo compartilhado, limites e critérios de escolha dos módulos | Entra ao carregar a skill; evitar repetição e leitura integral desnecessária |
| `references/` e playbooks | Domínios, exemplos, fórmulas e detalhes especializados | Ler conforme o trabalho; indicar o gatilho e os arquivos diretamente |
| `scripts/` | Trabalho determinístico repetido | Código pode executar sem ser todo lido; chamadas, resultados e eventual leitura ainda têm custo |
| `assets/` | Templates, fontes, mídia e arquivos usados no entregável | Só viram contexto quando inspecionados; não prometer custo zero universal |

Corpo com até cerca de 500 linhas é uma referência de manutenção, não um limite técnico universal. Modularizar por tarefas reais, sem criar árvore de arquivos para uma skill simples. Referências longas ganham índice útil; evitar cadeias profundas sem necessidade. Critério crítico fica no corpo ou tem leitura obrigatória claramente acionada antes da etapa dependente.

Estrutura possível: objetivo → modos/rotas → procedimento → falhas conhecidas → recursos. É um exemplo, não template obrigatório. Preservar campos nativos e metadados existentes; validar YAML, nome e caminhos no runtime alvo.

## Escrita que reduz retrabalho

- Explicar o motivo das restrições não óbvias. Reservar passos rígidos para contratos e operações frágeis; não impor cerimônia a edição simples.
- Preferir default com exceção clara a menu de cinco ferramentas equivalentes. Reusar script quando ele evita reimplementação recorrente.
- Um exemplo completo e verificável vale mais que vários genéricos. Exemplos antigos não viram regra universal nem fatos atuais.
- Manter contexto específico de pessoa/projeto quando ele muda a execução; separar esse contexto dos métodos reutilizáveis.
- Não criar checkpoints de permissão para repetir autorização já dada. Entregar o arquivo e a evidência no escopo pedido; mostrar o texto inteiro apenas se solicitado.

## Coexistência e revisão

Comparar finalidade, gatilhos, pré-condições, saídas e efeitos das skills vizinhas. Sobreposição de assunto não basta para fundir. Nos casos ambíguos, delimitar a fronteira ou consolidar as etapas do mesmo trabalho; depois conferir chamadas, `vps/bots.tsv` e a instalação nos bots.

Revisão mínima: política manual/automática correta; caminhos existentes; conteúdo único preservado; procedimento proporcional; nenhuma regra de ferramenta/runtime inventada; usuário recebe o que pediu. Validação estática não prova melhora de inteligência ou qualidade. Avaliações independentes e custos estão em [mecânicas e avaliação](mecanicas-avaliacao.md).

## Fontes de mecânica

- [Skills no Claude Code](https://code.claude.com/docs/en/skills)

Conferidas em 2026-09-09; revalidar quando versão, política ou catálogo mudar. Não transportar números e regras de um runtime para o outro.

