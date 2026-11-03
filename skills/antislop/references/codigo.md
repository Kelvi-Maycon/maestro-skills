# Slop em código

Código gerado por IA tem a mesma doença da prosa gerada por IA: resolve o problema
médio, não este problema. Comentário inútil e cast para `any` são o S3 disso. O caro
está na estrutura.

---

## Protocolo antes de tocar no diff

```bash
git diff main...HEAD --stat
git diff main...HEAD
```

1. Leia o **arquivo inteiro**, não só o hunk. Slop é desvio do estilo local, e o hunk
   não mostra o estilo local.
2. Leia dois vizinhos do mesmo diretório. O padrão do repo manda, mesmo quando você
   faria diferente.
3. Antes de dizer que falta uma função, `grep` por ela. Metade do slop estrutural é
   reimplementar o que já existe três pastas ao lado.

**Regra invariante:** passada de limpeza não muda comportamento. Se você achar um bug
no caminho, reporte separado. Não conserte junto, não silencie, não "melhore de
brinde".

---

## S0. Nunca

- Mudar comportamento numa passada de limpeza.
- Remover validação de entrada não confiável (borda de rede, input de usuário, payload
  externo). Defensiva na borda é correta. Defensiva depois da borda é slop.
- Apagar tratamento de erro que trata um caso real que acontece.
- Remover teste para o build passar.
- Enfraquecer regra de lint, adicionar cast ou `@ts-ignore` para o check passar.
- Mexer em código não relacionado que "estava feio".

Código morto pré-existente e não relacionado: **mencione, não apague**. Órfão criado
pela sua mudança (import, variável, função que só existia para o trecho removido):
apague.

---

## S1. Forma genérica

Onde está o ganho real. Nenhuma dessas some com lint.

### Abstração para um consumidor só
`UserServiceFactory`, `PaymentManager`, `DataHelper` que existem para uma chamada.
**Conserto.** Inline a função no chamador. Abstração se cria no segundo consumidor,
não no primeiro.

### Camada que só repassa
`getUser()` que chama `fetchUser()` que chama `api.get('/user')`, sem transformar nada.
**Conserto.** Apague as camadas de repasse.

### Reimplementação
Escreveu um `formatCurrency` novo com `lib/format.ts` no repo.
**Conserto.** Use o que existe. Se o que existe está errado, conserte lá, um lugar só.

### Configuração que ninguém pediu
Flag, env var, options object ou arquivo de config para um comportamento que tem um
único valor válido hoje.
**Conserto.** Hardcode. Parametrize quando aparecer o segundo caso.

### Sobre-parametrização
`options` com seis campos opcionais e um usado. Genérico `<T>` onde o tipo concreto
bastava.
**Conserto.** Argumentos posicionais para o que existe. Amplie sob demanda.

### Defensiva para estado impossível
```ts
if (!user) return null;          // user vem de um caminho já validado
if (typeof id !== 'string') ...  // id é string pelo tipo
const name = user?.profile?.name ?? '';  // profile é obrigatório no schema
```
**Conserto.** Remova. Se o estado é possível de verdade, o tipo está mentindo:
conserte o tipo.

### `try/catch` de decoração
```ts
try { return await save(x) } catch (e) { console.error(e); throw e }
```
Não trata nada, só polui o stack trace.
**Conserto.** Remova o catch. Deixe o erro subir para quem sabe o que fazer com ele.
Catch que **engole** (`catch {}` ou catch que retorna default) é pior: vira bug mudo.

### 200 linhas onde 50 resolvem
**Teste do sênior.** Um sênior olharia isso e diria "tá complicado demais"? Se sim,
reescreva. Menos código com o mesmo comportamento é sempre a versão certa.

### Barril e estrutura de tutorial
`index.ts` reexportando dois módulos. `constants.ts` com uma constante. Pastas
`services/`, `repositories/`, `dtos/` num projeto de 12 arquivos.
**Conserto.** A estrutura segue o domínio e o tamanho real, não o diagrama do tutorial.

---

## S2. Padrão

| Tell | Exemplo | Conserto |
|---|---|---|
| Comentário que repete o código | `// incrementa i` acima de `i++` | apague |
| Banner de seção | `// ===== HELPERS =====` | apague, salvo se o arquivo já usa |
| Comentário ancorado no diff | `// substitui a abordagem antiga` | descreva o que o código faz hoje |
| JSDoc que repete a assinatura | `@param id The id` | apague, ou escreva o que não é óbvio |
| `any` para calar o compilador | `data as any` | tipe de verdade, ou parse na borda com schema |
| `as unknown as T` | lavagem de tipo em cadeia | idem, e comente o porquê se for inevitável |
| Validação duplicada | checa de novo o que a camada anterior já validou | remova a segunda |
| Log decorado | `console.log('✅ Concluído!')` | use o logger do projeto, sem emoji |
| Teste que verifica o mock | `expect(mockSave).toHaveBeenCalled()` como único assert | asserte o comportamento observável |
| Teste vazio | `expect(true).toBe(true)`, teste sem assert | apague ou escreva o teste real |
| Mock de módulo inteiro | `jest.mock('../db')` para trocar uma função | injete a dependência |
| Nome genérico | `data`, `result`, `item`, `processData`, `utils.ts` | nomeie pelo domínio |
| Variável de uso único | `const x = f(); return x` | `return f()` |
| `else` depois de `return` | escada de indentação | early return |
| Ternário aninhado | `a ? b : c ? d : e` | if/else ou mapa |
| Import inline em Python | `import json` dentro da função | topo do arquivo, com os outros |

---

## S3. Superfície

- Emoji em log, em mensagem de commit, em nome de branch.
- Aspas, ponto e vírgula, largura de linha ou ordem de import divergindo do arquivo.
- README com Features, Getting Started, Contributing e License para um script de 40
  linhas. Badge que não mede nada.
- Docstring em toda função privada trivial de um arquivo que não usa docstring.

Nada disso justifica um PR sozinho. Vai junto quando você já está no arquivo.

---

## Slop de teste

O teste é onde o slop mais se esconde, porque a suíte fica verde do mesmo jeito.

- Cobertura de linha sem cobertura de comportamento: chama a função e verifica que não
  explodiu.
- Um teste por método público, nenhum pelo caso de borda que quebra em produção.
- Setup gigante para asserção trivial.
- Teste que espelha a implementação. Se refatorar sem mudar comportamento quebra o
  teste, o teste testa a implementação, não o contrato.
- Nome que descreve o código, não o comportamento: `testProcessData` em vez de
  `rejeita pedido com carrinho vazio`.

---

## Correção na origem

Achou um card, um trecho ou um arquivo errado gerado por IA: audite a **família
inteira**, não o exemplo que te mostraram. Template, fonte, cache e todos os modos que
herdam aquilo. Consertar só o exemplo garante que o próximo apareça.

Em pipeline com loop de revisão, o conserto é no gerador: system prompt, estrutura,
template. Solução que exige trabalho manual por item não é solução.

---

## Saída

Antes de dizer que terminou:

1. Rode o que o repo tem: teste, lint, typecheck, build.
2. Confirme que o comportamento não mudou.
3. Releia o diff. Cada linha alterada traça direto para o que foi pedido? Se não,
   reverta essa linha.
4. Relate em 1 a 3 frases o que mudou. Sem tabela, sem seção, sem resumo do resumo.
5. Se não deu para verificar, escreva `não verificado: <motivo>`. Nunca "deve funcionar".
