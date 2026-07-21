import { ThemeToggle } from "@/components/theme-toggle";
import { RoleQuerySimulator } from "@/components/role-query-simulator";
import { JargonDecoder } from "@/components/jargon-decoder";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">

      {/* ------------------------------ masthead ------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/50 bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="shell">
          <div className="flex items-center justify-between h-16">
            <a href="https://bahniman.github.io" className="flex items-center gap-2.5">
              <span className="inline-block h-[7px] w-[7px] bg-primary" />
              <span className="text-[1.0625rem] font-extrabold tracking-[-0.02em]">Heirloom</span>
            </a>
            <nav className="flex items-center gap-5">
              <a href="https://bahniman.github.io" className="mono hover:text-on-surface transition-colors">&larr; Portfolio</a>
              <a href="https://github.com/Bahniman/heirloom" target="_blank" rel="noreferrer" className="mono hover:text-on-surface transition-colors">Source</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">The firm&rsquo;s memory,<br />owned by the firm.</h1>
            <p className="lede" style={{ marginTop: "2rem" }}>
              Consulting and legal firms run on things nobody wrote down: why we priced it that
              way, which client hates being called on a Friday, what we learned losing that
              pitch. That memory is now being poured into AI assistants owned by somebody else.
              Heirloom keeps it in a schema the firm controls, scoped by role and readable by any
              model.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
              <a href="#demo" className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-label-lg font-medium text-on-primary">
                Try the sandbox
              </a>
              <a href="#problem" className="inline-flex items-center gap-2 rounded border border-outline px-6 py-3 text-label-lg font-medium">
                Read the argument
              </a>
            </div>
          </div>

          <dl className="meta">
            <div><dt>Layer</dt><dd>Memory</dd></div>
            <div><dt>Status</dt><dd>Working prototype, MIT licensed</dd></div>
            <div><dt>Standard</dt><dd>Built to speak MCP, the vendor-neutral context protocol</dd></div>
            <div><dt>Part of</dt><dd>Four protocols for the agent economy</dd></div>
          </dl>
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement">
          <div className="shell">
            <p className="line">A firm can be certified for knowledge management and still lose all of it in a contract renewal.</p>
            <p className="by">
              ISO 30401 certifies the knowledge management system. It was published in 2018 and
              says nothing about the AI layer that now holds the answers.
            </p>
          </div>
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">The gap</span>
            <h2 className="h2">Two things are true at once</h2>
            <p className="note">Both are documented. Nobody has joined them up.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div>
                <h3 className="title">Knowledge management is already a certifiable standard</h3>
                <p className="role">ISO 30401:2018, amended 2022</p>
              </div>
              <div>
                <p className="desc">
                  ISO 30401 is a Type A management-system standard, so a firm can be audited and
                  certified against it the same way it can for ISO 9001. It sets requirements for
                  how an organisation captures, organises and reuses what it knows. It was
                  written before retrieval-based assistants existed, so it has nothing to say
                  about the case where the knowledge now sits inside a vendor&rsquo;s index
                  rather than the firm&rsquo;s own systems.
                </p>
              </div>
            </article>

            <article className="row">
              <span className="num">02</span>
              <div>
                <h3 className="title">The context layer standardised in eighteen months</h3>
                <p className="role">Model Context Protocol</p>
              </div>
              <div>
                <p className="desc">
                  MCP went from roughly 100,000 SDK downloads a month at launch to about 97
                  million by March 2026, and Anthropic donated it to the Agentic AI Foundation
                  under the Linux Foundation in December 2025, with Block and OpenAI as
                  co-founders. The pipe between a model and a firm&rsquo;s data is now
                  vendor-neutral. The memory travelling through that pipe is not. Reported
                  enterprise pain points already include audit trails and configuration
                  portability, which is the gap Heirloom sits in.
                </p>
              </div>
            </article>
          </div>

          <div className="table-wrap" style={{ marginTop: "3rem" }}>
            <table className="table">
              <thead>
                <tr><th>What it costs when memory is not owned</th><th>Source</th><th className="n">Figure</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lost each year by a large US business to inefficient knowledge sharing<span className="sub">Survey of 1,001 employees</span></td>
                  <td>Panopto / YouGov</td>
                  <td className="n">$47M</td>
                </tr>
                <tr>
                  <td>Institutional knowledge held by exactly one person<span className="sub">No second copy exists when they leave</span></td>
                  <td>Panopto / YouGov</td>
                  <td className="n">42%</td>
                </tr>
                <tr>
                  <td>Lost collectively by Fortune 500 firms to knowledge-sharing failure</td>
                  <td>IDC</td>
                  <td className="n">$31.5B</td>
                </tr>
                <tr>
                  <td>Wasted per knowledge worker each week waiting for or recreating what exists</td>
                  <td>Panopto / YouGov</td>
                  <td className="n">5.3 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">How it holds</h2>
            <p className="note">Access is decided before retrieval, not after generation.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Access guard</h3><p className="role">Scoped before retrieval</p></div>
              <div>
                <p className="desc">
                  Role filters run at the query level, so an unauthorised document is never
                  retrieved and never reaches the context window. That matters more than it
                  sounds. Filtering after generation means the model has already read the thing
                  you did not want it to read, and an instruction in a prompt is not an access
                  control.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Provenance chain</h3><p className="role">Signed at the node</p></div>
              <div>
                <p className="desc">
                  Every memory node carries signed metadata, so an answer points back to the
                  meeting, file or decision it came from. A partner reading a recommendation can
                  see who said it and when, which is the difference between a citation and a
                  plausible sentence.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Portable schema</h3><p className="role">The exit clause</p></div>
              <div>
                <p className="desc">
                  Memory is stored in a neutral, exportable schema rather than a vendor&rsquo;s
                  index, so changing model provider becomes a migration instead of an amnesia
                  event. This is the part a general counsel cares about, and the part missing
                  from most assistants sold on a per-seat contract.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ------------------------------- demo ------------------------------- */}
        <section className="shell section band" id="demo">
          <div className="section-head">
            <span className="idx">Sandbox</span>
            <h2 className="h2">Ask as different people. Watch what changes.</h2>
            <p className="note">Same question, same corpus, different clearance. Then revoke a departing partner&rsquo;s keys and ask again.</p>
          </div>
          <RoleQuerySimulator />
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">The objections a buyer would actually raise.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>Nobody sets out to buy a memory layer.</strong> They buy an assistant, and
              memory arrives bundled with it. Heirloom only wins where the buyer has already been
              burned by a migration or is contractually required to prove where knowledge lives,
              which points at regulated professional services rather than at software firms.
            </p>
            <p>
              <strong>Role-scoping is easy to state and hard to maintain.</strong> Clearance
              models rot the moment the org chart changes. An honest version of this inherits
              scoping from the identity provider the firm already runs, rather than becoming a
              second permissions system somebody has to hand-maintain.
            </p>
            <p>
              <strong>The portability promise is only as good as the importer.</strong> Exporting
              to a neutral schema proves nothing if no other system will read it. That makes MCP
              adoption a dependency rather than a nice-to-have, and it is the main reason to
              build on the standard instead of beside it.
            </p>
          </div>
        </section>

        {/* ------------------------------ decoder ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Plain</span>
            <h2 className="h2">The words, without the jargon</h2>
            <p className="note">For anyone reading this who does not build software.</p>
          </div>
          <JargonDecoder />
        </section>

        {/* ------------------------------ sources ----------------------------- */}
        <section className="shell section band">
          <div className="section-head">
            <span className="idx">Checkable</span>
            <h2 className="h2">Sources</h2>
            <p className="note">Every figure above, traceable.</p>
          </div>
          <ol className="src">
            <li>
              ISO 30401:2018 Knowledge management systems, Requirements, with Amendment 1 (2022).{" "}
              <a href="https://www.iso.org/standard/79489.html" target="_blank" rel="noreferrer">iso.org</a>
            </li>
            <li>
              Model Context Protocol donated to the Agentic AI Foundation under the Linux
              Foundation, December 2025.{" "}
              <a href="https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/" target="_blank" rel="noreferrer">modelcontextprotocol.io</a>
            </li>
            <li>
              Panopto and YouGov knowledge-sharing survey, n=1,001.{" "}
              <a href="https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/" target="_blank" rel="noreferrer">panopto.com</a>
            </li>
            <li>
              IDC, cost of knowledge-sharing failure across Fortune 500 firms.{" "}
              <a href="https://blog.nuclino.com/not-sharing-knowledge-costs-fortune-500-companies-31-5-billion-a-year" target="_blank" rel="noreferrer">via Nuclino</a>
            </li>
            <li>
              Satya Nadella on enterprises owning the learning loop rather than renting it.{" "}
              <a href="https://www.edtechinnovationhub.com/news/microsoft-ceo-satya-nadella-says-companies-must-own-the-ai-learning-loops-shaping-their-future" target="_blank" rel="noreferrer">EdTech Innovation Hub</a>
            </li>
          </ol>
        </section>

        {/* ------------------------------- footer ----------------------------- */}
        <footer className="shell section band">
          <div>
            <h2 className="h2" style={{ fontSize: "1.5rem" }}>Built by Bahniman Talukdar</h2>
            <p className="prose" style={{ marginTop: "0.75rem", fontSize: "0.9375rem" }}>
              One of four protocols for the agent economy. A prototype and an argument, not a
              company.
            </p>
            <p style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <a className="lnk" href="https://bahniman.github.io">Portfolio</a>
              <a className="lnk" href="https://github.com/Bahniman/heirloom" target="_blank" rel="noreferrer">Source</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
