# Heirloom

*Last updated: 2 October 2026*

**Live site:** <https://bahniman.github.io/heirloom/>

**Keep what you know.** Heirloom keeps a firm's knowledge as records the firm owns: who said it, where, who may see it, and what replaced it. Any assistant can read the records; none can keep them. The Python library implements role-scoped recall, provenance, supersession and JSON export.

## Explore the site

- **The argument:** where a consulting or law firm's knowledge actually lives, what ISO 30401 and the Model Context Protocol already cover, and the gap a firm-owned record fills.
- **The vault:** eight records from a consulting firm. Ask as an analyst, an engagement manager or a partner and see what each is allowed to know. Make a partner leave, or a fact change, and ask again. Export everything as one JSON file.
- **Weak spots:** the three questions a buyer would ask, each with an answer.

The vault runs in the browser on eight sample records. An MCP server for the vault is the next roadmap item.

## Design

The site uses the Riso Poster system shared with [the portfolio](https://bahniman.github.io/): cream paper (dark ink in dark mode), blue and pink overprinted inks, yellow stickers, 2.5px ink outlines and hard offset shadows; Bricolage Grotesque, Newsreader and Space Mono. Every project page is built from the same poster kit (`src/poster.css`): an overprinted headline beside a tilted demo board, a ticket strip of key facts, a blue statement band, stamped cards, a framed live demo, objection cards and a strip linking to the other three prototypes. Each page keeps its own board, ink order and subject.

Motion follows the portfolio: a staged hero entrance, scroll reveals with a slight tilt, smooth wheel scrolling, lift-and-press buttons, a reading-progress rule and a back-to-top sticker. Reduced-motion settings turn all of it off. The page has a skip link, labelled controls, visible focus and keyboard-operable demos.

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

- `src/poster.css`, `src/components/suite-next.tsx`: shared poster kit and the next-prototype strip.
- `src/page.tsx`: website content.
- `src/components/memory-record-stack.tsx`: fictional record, role-scope, and simulated-correction illustration.
- `src/components/`: role-query simulator, jargon decoder, theme toggle, and shared site header/motion.
- `heirloom/store.py`, `heirloom/permissions.py`: local store, retrieval, permissions, and open export/import.
- `demo.py`: sample CLI walkthrough.
- `src/components/suite-header.tsx`, `src/components/suite-motion.tsx`: shared project navigation, anchor focus/history, active-section state, progress, and back-to-top behavior.
- `src/riso-tokens.css`, `src/riso-suite.css`, `src/riso-motion.css`: shared Riso tokens, components, and motion/reduced-motion rules.
- `vite.config.ts`: `/heirloom/` base path and `docs/` build output.

## License

MIT. See [`LICENSE`](LICENSE).