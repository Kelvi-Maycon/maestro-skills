---
name: imagegen
description: 'Gera imagem raster real (foto, ilustração, mockup, produto, hero, sprite, textura, thumbnail, capa, anúncio, cena, personagem, background) com a ferramenta de geração de imagem disponível no assistente. Usar sempre que o Kelvi pedir para gerar, criar, fazer ou desenhar uma imagem de verdade ("imagem de X", "foto de", "mockup", "faz essa capa", "gera thumbnail"). Não usar para só escrever o prompt (viral-image-prompt), para arte em HTML/SVG/CSS nem para diagrama vetorial.'
---

# Image Gen

Gera bitmap com a ferramenta que este assistente tiver no Maestro. Antes, a imagem vinha de uma ponte para outro runtime que não existe aqui.

## Ferramenta, em ordem

1. Ferramenta nativa de geração de imagem do Maestro, se aparecer na lista de ferramentas da sessão.
2. Conector de geração ligado neste assistente: Magnific (Freepik) ou Higgsfield.
3. Nenhuma das duas: entregar o prompt pronto ao Kelvi, dizer em uma linha qual conector falta (Magnific ou Higgsfield) e parar a geração. Não fingir que gerou.

## Quando NÃO usar
- Só o prompt de imagem: `viral-image-prompt`.
- Arte em HTML/SVG/CSS, carrossel, slide: fazer em código.
- Editar ícone/SVG/vetor já existente: editar direto.

## Fluxo

1. Montar o prompt antes de chamar: cena, sujeito, detalhes, restrições; texto que aparece na imagem entre aspas e verbatim; o que evitar.
2. Uma chamada por imagem. Variantes: uma chamada por variante, cada uma com nome próprio.
3. Salvar o arquivo em `artifacts/imagens/<nome-curto>.png` no workspace do assistente.
4. Abrir a imagem e conferir antes de mandar: assunto, texto, enquadramento, defeitos.
5. Mandar a imagem ao Kelvi no chat. Sem o envio, ela não chega a ele.

## Regras
- Destino padrão é `artifacts/imagens/`. Outro caminho só com pedido explícito do Kelvi.
- Geração pode levar de 30 a 90 s; avisar antes quando forem várias.
- Fundo transparente: só se a ferramenta suportar alpha real; senão, avisar antes de gerar.
- Edição determinística sobre imagem existente (trocar um número ou palavra, recortar, recolorir área, redimensionar) pode ser feita localmente com Pillow, preservando o resto, e provada com dimensões e área alterada.
- Conector pago: cada geração consome crédito da conta ligada. Lote grande (10+) pede OK do Kelvi com a quantidade.

## Exemplo de prompt
"Hero minimalista de uma caneca de cerâmica vermelha sobre fundo branco, product photography limpa, luz de estúdio suave, espaço negativo à direita para copy. Sem logos, sem texto, sem marca d'água."
