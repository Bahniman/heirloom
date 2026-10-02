import { RoleQuerySimulator } from "@/components/role-query-simulator";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";
import { MemoryRecordStack } from "@/components/memory-record-stack";
import { SuiteNext } from "@/components/suite-next";

export default function LandingPage() {
  return (
    <div className="heirloom-page pk" style={{ ["--a" as string]: "var(--pink-display)", ["--b" as string]: "var(--blue)" }}>

      <SuiteHeader name="Heirloom" sections={[
        { label: "The gap", href: "#problem" },
        { label: "How it works", href: "#how" },
        { label: "Try the vault", href: "#demo" },
        { label: "Weak spots", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main" className="suite-main">

        {/* ------------------------------ the poster ------------------------------ */}
        <section className="pk-wrap pk-hero">
          <div className="pk-hero-copy">
            <p className="pk-kick"><span className="n">02</span> Prototype · Knowledge</p>
            <h1 className="pk-big">
              <span className="a">Keep</span>
              <span className="b">what you know.</span>
              <span className="c">People leave. AI vendors change. A firm's memory should stay with the firm.</span>
            </h1>
            <p className="pk-dek">
              Heirloom stores what a firm learns as <b>records it owns</b>: who said it, where, who may see it,
              and what replaced it. Any assistant can read them. None of them can keep them.
            </p>
            <div className="pk-cta">
              <a href="#demo" className="pk-btn pri">Open the vault ↓</a>
              <a href="#problem" className="pk-btn">Why it matters</a>
            </div>
          </div>

          <div className="pk-board">
            <span className="pk-sticker">MIT<small>open source</small></span>
            <MemoryRecordStack />
          </div>
        </section>

        <div className="pk-wrap">
          <div className="pk-glance">
            <dl className="pk-facts">
              <div><dt>3</dt><dd>roles in the demo, each seeing a different slice</dd></div>
              <div><dt>1</dt><dd>file holds the firm's whole memory, ready to move</dd></div>
              <div><dt>97M</dt><dd>monthly MCP SDK downloads, December 2025 <a className="lnk" href="#sources">[2]</a></dd></div>
              <div><dt>ISO</dt><dd>30401 already sets the bar for knowledge management <a className="lnk" href="#sources">[1]</a></dd></div>
            </dl>
            <ul className="pk-rows">
              <li><span>What</span><b>A memory layer the firm owns, not the AI vendor</b></li>
              <li><span>Built</span><b>Python library with role-scoped recall, sources, corrections and export</b></li>
              <li><span>For</span><b>Consulting and legal firms</b></li>
              <li><span>Stage</span><b>Prototype, MIT licensed, eight sample records</b></li>
            </ul>
          </div>
        </div>

        {/* ------------------------------- the band ------------------------------- */}
        <section className="pk-band">
          <div className="pk-wrap">
            <p className="pk-kick on-blue"><span className="n">The bet</span></p>
            <p className="line">Rent the AI if you like. <em>Own the memory.</em></p>
            <p className="by">Satya Nadella has argued that companies must own their AI learning loops rather than rent them <a className="lnk" style={{ color: "#fffaf1" }} href="#sources">[4]</a>. Heirloom is a working answer to what owning one looks like.</p>
          </div>
        </section>

        {/* ------------------------------- the gap -------------------------------- */}
        <section className="pk-wrap pk-sec" id="problem">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> The gap</p>
            <h2>What a firm knows, <em>and where it lives.</em></h2>
          </div>
          <div className="pk-split">
            <div className="pk-prose">
              <p>
                The valuable knowledge in a consulting or law firm rarely sits in a document. It is why a team
                priced a deal the way it did, what a client's CFO actually wants to see, what a lost pitch taught.
                More and more of it now lives inside an AI assistant's memory, which belongs to the vendor.
              </p>
              <p>
                The pieces around it exist. <b>ISO 30401</b> sets requirements for a knowledge-management system.
                The <b>Model Context Protocol</b> gave models a common way to reach tools and data, and its 2026
                roadmap names audit trails and portable configuration as enterprise needs.
              </p>
              <p>
                What is missing is the record itself: a format the firm owns, where every piece of knowledge carries
                its source, its audience and its history, and can leave with the firm instead of the vendor.
              </p>
            </div>
            <figure className="pk-quote">
              <p>When a partner leaves, <em>the firm shouldn't forget.</em></p>
              <small>Try it in the vault below: make the partner leave</small>
            </figure>
          </div>
        </section>

        {/* ------------------------------- how it works ------------------------------- */}
        <section className="pk-wrap pk-sec" id="how">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> How it works</p>
            <h2>Three rules <em>for every record.</em></h2>
          </div>
          <ol className="pk-cards">
            <li>
              <p className="pk-kick"><span className="n">1</span> Guard</p>
              <h3>Filter before retrieval</h3>
              <p>The role check happens before the assistant searches, so a record an analyst may not see never enters its context at all.</p>
              <span className="eg">Analyst asks why Northstar won: partner pricing withheld</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">2</span> Trace</p>
              <h3>Every answer has a source</h3>
              <p>Each record carries who wrote it, in which meeting, on which date. When something changes, the new record replaces the old one and the old one stays on file.</p>
              <span className="eg">MEM-004 → MEM-004-CORRECTED, 20 Jun</span>
            </li>
            <li>
              <p className="pk-kick"><span className="n">3</span> Carry</p>
              <h3>Leave with everything</h3>
              <p>The whole vault exports as one documented JSON file. Switching assistants means moving a file, not rebuilding years of context.</p>
              <span className="eg">heirloom-open-memory.json</span>
            </li>
          </ol>
        </section>

        {/* -------------------------------- the demo -------------------------------- */}
        <section className="pk-wrap pk-sec" id="demo">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Try it</p>
            <h2>Ask as <em>different people.</em></h2>
            <p className="pk-lede">Pick a role and ask one of the questions. Then make a partner leave, or a fact change, and ask again.</p>
          </div>
          <div className="pk-stage">
            <span className="pk-stage-tag">Live in your browser</span>
            <RoleQuerySimulator />
          </div>
        </section>

        {/* ------------------------------- weak spots ------------------------------- */}
        <section className="pk-wrap pk-sec" id="limits">
          <div className="pk-head">
            <p className="pk-kick"><span className="dot" /> Where this is weakest</p>
            <h2>What a buyer <em>would ask.</em></h2>
          </div>
          <ul className="pk-weak">
            <li>
              <p className="q">Will anyone buy memory on its own?</p>
              <p className="ans">Maybe not as a line item. Most firms buy an assistant and get memory bundled in. The first buyer is likelier a regulated firm that has lived through a painful migration, or has to show where its knowledge sits.</p>
            </li>
            <li>
              <p className="q">Roles go stale as teams change.</p>
              <p className="ans">They do, which is why the roles should come from the firm's existing identity provider rather than a second permissions list someone has to maintain.</p>
            </li>
            <li>
              <p className="q">An export only helps if something can import it.</p>
              <p className="ans">Right. MCP is the likeliest bridge, so an MCP server for the vault is the next item on the roadmap, ahead of smarter search.</p>
            </li>
          </ul>
        </section>

        {/* ---------------------------- decoder + sources ---------------------------- */}
        <section className="pk-wrap pk-sec" id="sources">
          <div className="pk-two">
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Plain English</p>
                <h2>The <em>words.</em></h2>
              </div>
              <JargonDecoder />
            </div>
            <div>
              <div className="pk-head">
                <p className="pk-kick"><span className="dot" /> Checkable</p>
                <h2><em>Sources.</em></h2>
              </div>
              <ol className="pk-src">
                <li>
                  ISO 30401:2018, Knowledge management systems: Requirements, with Amendment 1 (2022).{" "}
                  <a href="https://www.iso.org/standard/79489.html" target="_blank" rel="noreferrer">iso.org</a>
                </li>
                <li>
                  MCP maintainers, December 2025: 97 million monthly SDK downloads, 10,000 active servers, and the move to the Agentic AI Foundation.{" "}
                  <a href="https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/" target="_blank" rel="noreferrer">modelcontextprotocol.io</a>
                </li>
                <li>
                  MCP roadmap, March 2026, including audit trails and configuration portability.{" "}
                  <a href="https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/" target="_blank" rel="noreferrer">modelcontextprotocol.io</a>
                </li>
                <li>
                  Satya Nadella on companies owning their AI learning loops.{" "}
                  <a href="https://www.edtechinnovationhub.com/news/microsoft-ceo-satya-nadella-says-companies-must-own-the-ai-learning-loops-shaping-their-future" target="_blank" rel="noreferrer">EdTech Innovation Hub</a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <SuiteNext current="Heirloom" />
      </main>
    </div>
  );
}
