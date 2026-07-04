# Heirloom — architecture

## Position in the stack

```
AI assistants / agents (any vendor)
        |        read/write via one interface (MCP in production)
        v
HEIRLOOM  -- permission filter -> role-scoped recall
   |   |
   |   +-- open export format (open-memory/v1): exit rights
   +------ owned by the company, not by any AI vendor
```

## Design decisions

1. **Filter before scoring.** `recall()` applies permissions before relevance
   ranking, so a lower role cannot infer the existence of hidden memories from
   ranking artifacts. Leaking *that* a memory exists is already a leak.
2. **Fail closed.** Unknown roles read nothing; unknown sensitivity defaults
   to exec-only.
3. **Supersession, not deletion.** Corrections point at what they replace.
   Recall surfaces current truth; the record keeps history (governance and
   disputes need it).
4. **Provenance is mandatory in spirit.** Every memory carries author and
   source; an answer without provenance is a rumor with confidence.
5. **Schema over smarts.** Keyword retrieval is a placeholder; the schema and
   permission contract are the product. Embeddings are an implementation
   detail behind the same filter.

## Production path

| Prototype | Production |
|---|---|
| In-memory list | Postgres + object store; per-org encryption keys held by the customer |
| Keyword overlap scoring | Hybrid retrieval (BM25 + embeddings), permission filter unchanged |
| Role tiers + allow-lists | Map to the customer's IdP groups (Okta/AD); attribute-based rules |
| JSON export | Signed, versioned export; scheduled escrow copies to customer-controlled storage |
| Single store | Namespaces per team with cross-team sharing grants |

## The moat

Neutrality (no competing assistant), permissioning correctness (auditable),
and the export standard. Each new tool that reads Heirloom makes the layer
more valuable and harder to displace: the Okta dynamic, replayed for memory.
