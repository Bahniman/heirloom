export function MemoryRecordStack() {
  return (
    <aside className="memory-stack" aria-label="A sample record with its role scope, source and correction">
      <div className="memory-stack-board">
        <div className="memory-scope-slip">
          <span>ROLE FILTER</span>
          <strong>Analyst and above</strong>
          <small>MEM-004 · open to every role</small>
        </div>

        <article className="memory-record memory-record-current">
          <header>
            <span className="memory-record-id">MEM-004 · STATUS</span>
            <span className="memory-record-state">ACTIVE</span>
          </header>
          <h2>Client A migration</h2>
          <p>Two weeks behind while the ingestion pipeline is under security review.</p>
          <dl>
            <div><dt>Source</dt><dd>Delivery standup · 02 Jun 2025</dd></div>
            <div><dt>Author</dt><dd>PM-bot</dd></div>
          </dl>
        </article>

        <div className="memory-relation" aria-label="The correction that replaced it">
          <span aria-hidden="true" />
          <p>Superseded by</p>
        </div>

        <article className="memory-record memory-record-correction">
          <header>
            <span className="memory-record-id">MEM-004-CORRECTED</span>
            <span className="memory-record-state">NEWER</span>
          </header>
          <h3>Security review cleared</h3>
          <p>Delivery standup · 20 Jun 2025 · old record kept on file</p>
        </article>

        <p className="memory-stack-footnote">One record, its source, who can see it, and what replaced it.</p>
      </div>
    </aside>
  );
}
