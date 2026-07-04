# Heirloom

**Organizational memory as a portable, permissioned asset.**

### ▶ Try the live demo (no installation): https://bahniman.github.io/heirloom.html

---

## In plain English (no jargon)

Companies are pouring their decisions, meeting notes and hard-won lessons into AI tools — and each tool keeps that knowledge locked inside itself. Two things then go wrong: switch AI tools in three years and all that accumulated memory doesn't come with you; or lose the one employee who knew *why* a decision was made, and it's gone with them.

**Heirloom is a memory vault the company owns.** Every AI tool reads from it — but only what each person is allowed to see (the intern's assistant and the CFO's assistant get different answers to the same question). And because the memory lives in an open format the company controls, it survives both resignations and vendor switches.

The comparison that makes it click: when every app needed logins, the winner wasn't any single app — it was the neutral "sign in with..." layer they all plugged into. Company memory is having that same moment now.

<details>
<summary><b>Jargon decoder</b> (click to expand)</summary>

| Term | What it actually means |
|---|---|
| **Context / memory** | Everything an AI tool has learned about your company: decisions, reasons, notes, corrections. |
| **Vendor lock-in** | When leaving a software provider is painful because they hold something you can't take with you. |
| **Role-based permissions** | The intern's AI and the CFO's AI automatically see different things, based on job role. |
| **Provenance** | Where a memory came from ("partner meeting notes, 12 Mar 2025"). A source-less answer is just a rumor. |
| **Supersede** | A correction replaces the old memory in answers, but the old one stays in the record for audits. |
| **Export / exit rights** | A standard file format the memory can leave in, so switching vendors is a settings change, not amnesia. |
| **MCP** | A common "plug" standard AI tools use to connect to data; it's how any assistant would read Heirloom. |

</details>

---

Every company is feeding its decisions, meetings and know-how into AI tools, and each tool keeps that context in its own silo. A new form of lock-in is forming and nobody has named it: **context lock-in**.

- Switch AI vendors in three years and the accumulated memory does not come with you.
- An employee leaves and the context they built evaporates with their seat.
- Two teams use two tools and the company's memory forks.

Institutional knowledge is the most valuable asset most firms have, and right now it has no owner, no format, and no exit rights. Heirloom is the neutral layer: a permissioned store of organizational memory that **the company owns**, that any AI tool reads through one interface, and that survives both employee exits and vendor switches.

## Quickstart

Python 3.9+, zero dependencies.

```bash
python demo.py
```

The demo shows the four moments that matter:

1. **Same question, three roles, three correctly-scoped answers.** The intern's agent learns the decision; the manager's agent learns the real rationale; only the exec's agent sees the contract terms. The permission filter runs *before* retrieval scoring — a role never even learns that a hidden memory matched.
2. **The person leaves; the memory stays**, with provenance ("partner sync notes, 12 Mar 2025").
3. **The vendor changes; the memory walks** — exported to an open format (`open-memory/v1`), reimported into a fresh store, recall still works.
4. **Corrections supersede without erasing** — the record keeps history; recall surfaces only the current truth.

## Use as a library

```python
from heirloom import MemoryStore

org = MemoryStore("Acme LLP")
org.remember(content="We chose VendorX over VendorY.", kind="decision",
             tags=["vendorx"], min_role="intern", author="S. Rao",
             source="steering committee, 12 Mar 2025")

org.recall("why vendorx?", role="manager")   # permission-filtered retrieval
org.export("acme.openmemory.json")           # exit rights, exercised
```

The retrieval in this prototype is deliberately simple keyword scoring. The contract that matters is the **schema** (kind, provenance, sensitivity, supersession) and the **permission filter**; embeddings drop in later without changing either.

## Why this is a company, not a feature

The precedent is identity. When every SaaS app needed login, the winner was not any app — it was the neutral layer they all integrated. Memory is having its identity moment. Platforms will bundle memory for free, and that is exactly the pitch: CIOs do not want the company's memory *inside* the vendor they are trying to keep replaceable.

Wedge market: firms whose inventory is knowledge and whose turnover is high — consulting, law, agencies. Every departure today is a write-off.

## Status and roadmap

Working concept prototype.

- [x] Permissioned store, role-scoped recall, provenance, supersession, open export/import
- [ ] MCP server so any assistant reads memory through one interface
- [ ] Embedding-based retrieval behind the same permission filter
- [ ] Ingestion connectors (meeting notes, decision docs) with human confirmation
- [ ] Audit log of who recalled what (the compliance product hiding inside)
- [ ] `open-memory` format spec published for community review

## License

MIT
