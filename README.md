# Heirloom

*Last updated: 1 October 2026*

**Live site:** <https://bahniman.github.io/heirloom/>

Heirloom explores portable, permission-aware organizational memory: records such as decisions, rationales, facts, and meeting notes carry provenance and access rules, and can be exported in an open JSON format. The website is an illustrative interface and uses fictional sample material. It does not connect to an identity provider, assistant, company knowledge base, or external memory service.

## Explore the site

- **Record-stack illustration:** inspect a fictional status record with role scope, source, and a simulated correction; the separate role-query simulator lets you compare which fixed-corpus records are visible to different roles.
- **Memory model and portability sections:** inspect the proposed record shape, permission approach, supersession, and export/import concepts.
- **Jargon decoder and sources:** find concise explanations and background references.

The site and Python library are separate demonstrations. The Python prototype in this repository implements a local in-memory store, simple keyword-overlap retrieval, role filtering, provenance fields, supersession, and JSON export/import. It has no hosted API, authentication, encryption-at-rest, identity-provider integration, assistant connector, or embedding search. Its role model is an illustrative access rule, not deployment-grade authorization; evaluate and harden such controls before any sensitive use.

## Design and accessibility

Heirloom uses the shared Riso Poster visual system and responsive project header used by the other three concept demos. Its layered record-stack hero is a fixed fictional illustration; the role-query simulator below handles the actual local role-filtering interaction. The headline and record illustration enter in a staggered sequence, editorial rows reveal as you read, and buttons respond with a small lift and press. The rows give Heirloom's organizational-memory subject its own reading rhythm within the shared design. The header places section links in a native disclosure menu on smaller screens, links the companion projects, and stores the light/dark choice locally. Wheel input uses smooth scrolling, while touch gestures and the browser scrollbar remain native. Section links update the URL fragment, move focus to the destination, and support browser back/forward. The header marks the current section and shows reading progress. A back-to-top link returns focus to the main content. Reduced-motion preferences keep reveals static.

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
- `src/components/memory-record-stack.tsx` — fictional record, role-scope, and simulated-correction illustration.
- `src/components/` — role-query simulator, jargon decoder, theme toggle, and shared site header/motion.
- `heirloom/store.py`, `heirloom/permissions.py` — local store, retrieval, permissions, and open export/import.
- `demo.py` — sample CLI walkthrough.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx` — shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css` — shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts` — `/heirloom/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).