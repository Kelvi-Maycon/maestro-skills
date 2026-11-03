> Referencia da skill growth-data-expert. Carregar sob demanda conforme o indice de Referencias do SKILL.md.

## Padroes De Leitura

### Reembolso

Nao basta taxa. Sempre olhar:
- vendas;
- reembolsos;
- taxa;
- receita total;
- receita reembolsada;
- tempo ate reembolso quando relevante;
- tipo_venda e produto/grupo_produto.

Fonte financeira canonica:

- receita bruta: `gold__fact__receita_bruta_gerencial.valor`;
- receita reembolsada: `gold__fact__reembolso_gerencial.valor`;
- grao dos dois fatos: `sale_uid x bu`;
- join: `sale_uid + bu`, com `LEFT JOIN` da receita para o reembolso;
- taxa financeira: `SUM(reembolso.valor) / SUM(receita.valor)` na mesma `dt_competencia` e com os mesmos filtros;
- contagens: `COUNT(DISTINCT sale_uid)`; contagens por BU nao sao aditivas;
- maturidade: `dt_competencia + 30 dias <= snapshot`, sem congelar a coorte. Reembolsos tardios voltam para a coorte original.

Segmentacao canonica, nesta ordem: grupo B2B; outros grupos fora de Adapta Gold; Adapta Gold renovacao por `is_renovacao=1`; novas vendas por `is_renovacao=0` + Self-Service/Inside Sales; demais novas vendas em B2C outros canais.

### Custo IA

Nao basta custo total. Separar:
- confirmar autorizacao explicita do Kelvi para usar a excecao Silver `user_cost_ai_gateway`;
- usuarios;
- `request_count`;
- `total_cost`;
- custo por usuario;
- produto/plano/status;
- cliente vs team interno (`is_adapta`);
- uso antes/depois do cancelamento quando houver reembolso.

### Venda x Uso IA

Join por email pode ser bom em B2C e perigoso em B2B.

Ao cruzar:
- medir cobertura do join;
- declarar que email pode ser pagador em B2B;
- agregar antes do join para evitar duplicar receita;
- tratar ausencia em `user_cost_ai_gateway` como sem registro na fonte, nao como nao uso absoluto.

---

## B2C Operacional

No gold, `grupo_produto` ja separa B2B (`'Adapta Gold B2B'`) do B2C (`'Adapta Gold'`) — dispensa o `NOT LIKE '%b2b%'`.

Quando Kelvi pedir B2C Adapta Gold, usar:

```sql
FROM gold__fact__vendas v
JOIN gold__dim__produto p
  ON p.empresa=v.empresa AND p.plataforma=v.plataforma AND p.produto_biu=v.produto_biu
 AND p.product_name_guru=v.product_name_guru AND p.product_offer_name=v.product_offer_name
WHERE p.grupo_produto = 'Adapta Gold'   -- B2B e grupo proprio
  AND v.tipo_venda = 'Self-Service'
```

Cartao/Adyen: + `v.payment_method='credit_card'` + join `gold__dim__adquirente` (`adquirente_canonico='adyen'`). Chamar sempre de **B2C operacional/provavel**.
