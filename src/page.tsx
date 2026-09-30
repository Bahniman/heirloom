import { RoleQuerySimulator } from "@/components/role-query-simulator";
import { JargonDecoder } from "@/components/jargon-decoder";
import { SuiteHeader } from "@/components/suite-header";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">

      {/* ------------------------------ masthead ------------------------------ */}
      <SuiteHeader name="Heirloom" sections={[
        { label: "The gap", href: "#problem" },
        { label: "How it works", href: "#mechanism" },
        { label: "Try the sandbox", href: "#demo" },
        { label: "Limits", href: "#limits" },
        { label: "Sources", href: "#sources" },
      ]} />

      <main id="main">

        {/* ------------------------------ opening ----------------------------- */}
        <section className="shell section hero-grid">
          <div>
            <h1 className="display">The firm&rsquo;s memory,<br /><em>owned by the firm.</em></h1>
            <p className="lede">
              Consulting and legal firms often rely on knowledge that is hard to capture in a
              file: why a team priced work a certain way, the context behind a client preference,
              what a lost pitch taught them. When that context lives in a vendor&apos;s assistant,
              the firm may not control how it travels. Heirloom explores a firm-owned record
              format; this prototype demonstrates role-scoped retrieval and portable records.
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
            <div><dt>Standard</dt><dd>MCP connector planned; not included in this prototype</dd></div>
            <div><dt>Part of</dt><dd>Four protocols for the agent economy</dd></div>
          </dl>
        </section>

        {/* ----------------------------- statement ---------------------------- */}
        <section className="statement">
          <div className="shell">
          <p className="line">A knowledge-management standard and portable assistant records address related, but different, needs.</p>
            <p className="by">
              ISO 30401 sets requirements for a knowledge-management system. This proposal explores
              how records used by retrieval-based assistants might also remain inspectable and portable.
            </p>
          </div>
        </section>

        {/* ------------------------------- demo ------------------------------- */}
        <section className="shell section band" id="demo">
          <div className="section-head">
            <span className="idx">Sandbox</span>
            <h2 className="h2">Ask as different people. Watch what changes.</h2>
            <p className="note">Illustrative prototype using an entirely fictional sample corpus; no assistant or identity provider is connected.</p>
          </div>
          <RoleQuerySimulator />
        </section>

        {/* ------------------------------ problem ----------------------------- */}
        <section className="shell section band" id="problem">
          <div className="section-head">
            <span className="idx">The gap</span>
            <h2 className="h2">Two things are true at once</h2>
            <p className="note">Both are documented. Heirloom&apos;s thesis is to connect them.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div>
                <h3 className="title">A published standard for knowledge management</h3>
                <p className="role">ISO 30401:2018, amended 2022</p>
              </div>
              <div>
                <p className="desc">
                  ISO 30401:2018, with its 2022 amendment, sets requirements for a
                  knowledge-management system. This provides a useful baseline. Heirloom explores
                  a separate question: how could records used by retrieval-based assistants
                  remain inspectable and portable across tools?
                </p>
              </div>
            </article>

            <article className="row">
              <span className="num">02</span>
              <div>
                <h3 className="title">An open protocol for connecting models and tools</h3>
                <p className="role">Model Context Protocol</p>
              </div>
              <div>
                <p className="desc">
                  In December 2025, MCP maintainers reported 97 million monthly SDK downloads
                  and 10,000 active servers, and announced the protocol&apos;s contribution to the
                  Agentic AI Foundation under the Linux Foundation. MCP provides an open way to
                  connect models with tools and data; implementations can still differ. A March
                  2026 roadmap describes enterprise needs including audit trails and configuration
                  portability. Heirloom explores one possible record layer alongside that ecosystem.
                </p>
              </div>
            </article>
          </div>

          <div className="table-wrap" style={{ marginTop: "3rem" }}>
            <p className="table-scroll-hint">On narrow screens, scroll the table horizontally to compare figures.</p>
            <div className="table-scroll" role="region" aria-label="Knowledge-sharing figures" tabIndex={0}>
            <table className="table">
              <caption className="sr-only">A dated secondary estimate about knowledge-sharing costs</caption>
              <thead>
                <tr><th>Selected older estimate</th><th>Source and date</th><th className="n">Figure</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Estimated annual cost of knowledge-sharing inefficiency across Fortune 500 firms<span className="sub">Reported as an IDC estimate; not a current or Heirloom-specific savings estimate</span></td>
                  <td>IDC, reported by Nuclino (2018)</td>
                  <td className="n">$31.5B</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </section>

        {/* ----------------------------- mechanism ---------------------------- */}
        <section className="shell section band" id="mechanism">
          <div className="section-head">
            <span className="idx">3 parts</span>
            <h2 className="h2">How it holds</h2>
            <p className="note">The proposed design applies role checks before retrieval.</p>
          </div>

          <div className="rows">
            <article className="row">
              <span className="num">01</span>
              <div><h3 className="title">Access guard</h3><p className="role">Scoped before retrieval</p></div>
              <div>
                <p className="desc">
                  The proposed design applies role filters before retrieval so records outside
                  a role do not enter an assistant's context. This page's local sandbox
                  illustrates that rule with sample data; it does not enforce it against a live
                  assistant or document system.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">02</span>
              <div><h3 className="title">Provenance record</h3><p className="role">Proposed record fields</p></div>
              <div>
                <p className="desc">
                  A future implementation could attach source, owner, and timestamp fields to
                  each record. The sandbox displays example metadata; it does not create or
                  validate cryptographic signatures. A recommendation could then point back to
                  the meeting, file, or decision it references.
                </p>
              </div>
            </article>
            <article className="row">
              <span className="num">03</span>
              <div><h3 className="title">Portable schema</h3><p className="role">The exit clause</p></div>
              <div>
                <p className="desc">
                  The proposed record format is designed to be portable, but using it across
                  providers would still depend on compatible importers and migration work. A
                  future implementation could make provenance easier to inspect; whether that
                  matters to buyers is a hypothesis that needs validation.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ---------------------------- the objection -------------------------- */}
        <section className="shell section band" id="limits">
          <div className="section-head">
            <span className="idx">Honest</span>
            <h2 className="h2">Where this is weakest</h2>
            <p className="note">The objections a buyer would actually raise.</p>
          </div>
          <div className="prose" style={{ display: "grid", gap: "1.25rem" }}>
            <p>
              <strong>A memory layer may be difficult to sell on its own.</strong> Many buyers
              start with an assistant, and memory may arrive bundled with it. Heirloom may fit firms
              that need to document where knowledge lives or are planning a migration,
              which points toward regulated professional services. This buyer hypothesis needs
              validation.
            </p>
            <p>
              <strong>Role-scoping needs maintenance as teams change.</strong> A future
              implementation could inherit access groups from the firm's identity provider,
              reducing the need to maintain a separate permissions list.
            </p>
            <p>
              <strong>Portability depends on compatible importers.</strong> A neutral export
              format helps only when another system can read it. MCP may provide one
              interoperability path, but its fit and adoption would need to be validated.
            </p>
          </div>
        </section>

        {/* ------------------------------ decoder ----------------------------- */}
        <section className="shell section band" id="decoder">
          <div className="section-head">
            <span className="idx">Plain</span>
            <h2 className="h2">The words, without the jargon</h2>
            <p className="note">For anyone reading this who does not build software.</p>
          </div>
          <JargonDecoder />
        </section>

        {/* ------------------------------ sources ----------------------------- */}
        <section className="shell section band" id="sources">
          <div className="section-head">
            <span className="idx">Checkable</span>
            <h2 className="h2">Sources</h2>
            <p className="note">Sources for selected standards, industry context, and ecosystem updates.</p>
          </div>
          <ol className="src">
            <li>
              ISO 30401:2018 Knowledge management systems, Requirements, with Amendment 1 (2022).{" "}
              <a href="https://www.iso.org/standard/79489.html" target="_blank" rel="noreferrer">iso.org</a>
            </li>
            <li>
              MCP maintainers&apos; December 2025 ecosystem figures and Agentic AI Foundation contribution announcement.{" "}
              <a href="https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/" target="_blank" rel="noreferrer">modelcontextprotocol.io</a>
            </li>
            <li>
              MCP roadmap, March 2026, including reported enterprise needs.{" "}
              <a href="https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/" target="_blank" rel="noreferrer">modelcontextprotocol.io</a>
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
              One of four protocols for the agent economy.
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
