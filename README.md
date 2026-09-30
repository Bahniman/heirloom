# Heirloom

*Last updated: 1 October 2026*

**Live site:** <https://bahniman.github.io/heirloom/>

Heirloom explores portable, permission-aware organizational memory: records such as decisions, rationales, facts, and meeting notes carry provenance and access rules, and can be exported in an open JSON format. The website is an illustrative interface and uses fictional sample material. It does not connect to an identity provider, assistant, company knowledge base, or external memory service.

## Explore the site

- **Role-query simulator:** ask a sample question as different roles and compare which fictional records are visible.
- **Memory model and portability sections:** inspect the proposed record shape, permission approach, supersession, and export/import concepts.
- **Jargon decoder and sources:** find concise explanations and background references.

The site and Python library are separate demonstrations. The Python prototype in this repository implements a local in-memory store, simple keyword-overlap retrieval, role filtering, provenance fields, supersession, and JSON export/import. It has no hosted API, authentication, encryption-at-rest, identity-provider integration, assistant connector, or embedding search. Its role model is an illustrative access rule, not deployment-grade authorization; evaluate and harden such controls before any sensitive use.

## Design and accessibility

Heirloom uses the shared Riso Poster visual system and project header used by the other three concept demos. Desktop section links become a native disclosure menu on smaller screens; the header also links to the other projects and source repositories. The light/dark theme choice is saved in local storage.

Implemented accessibility details include a skip link, semantic headings and landmarks, labeled controls, keyboard-operable choices, and a horizontally scrollable comparison region with a label and keyboard focus. The page also uses reduced-motion styling. These features are not a formal WCAG conformance claim.

## Run the website locally

Requires Node.js 22.12+ and npm.

```bash
npm install
npm run dev       # local Vite development server
npm run build     # production assets in docs/
npm run preview   # preview the production build
npx tsc --noEmit  # TypeScript check
```

The Vite build is configured for `/heirloom/` and writes static output to `docs/` for GitHub Pages.

## Run the Python prototype

Requires Python 3.9+; the prototype uses the standard library only.

```bash
python demo.py
```

Use the library from the repository root:

```python
from heirloom import MemoryStore

store = MemoryStore("Example organisation")
store.remember(
    content="A sample decision and its rationale",
    kind="decision",
    min_role="analyst",
    author="Example author",
    source="Example meeting notes",
)
print(store.recall("decision rationale", role="manager"))
store.export("memory.openmemory.json")
```

The Python API is a local prototype, not a secure enterprise memory service.

## Source map

- `src/page.tsx` — website content.
- `src/components/` — query simulator, jargon decoder, and theme toggle.
- `heirloom/store.py`, `heirloom/permissions.py` — local store, retrieval, permissions, and open export/import.
- `demo.py` — sample CLI walkthrough.
- `vite.config.ts` — `/heirloom/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).
