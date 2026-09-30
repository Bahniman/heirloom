export function MemoryRecordStack() {
  return (
    <aside className="memory-stack suite-reveal" aria-label="Fictional sample record, role scope, source, and simulated correction">
      <div className="memory-stack-board">
        <div className="memory-scope-slip">
          <span>LOCAL ROLE FILTER</span>
          <strong>Analyst and above</strong>
          <small>MEM-004 · minimum role 0</small>
        </div>

        <article className="memory-record memory-record-current">
          <header>
            <span className="memory-record-id">MEM-004 · STATUS</span>
            <span className="memory-record-state">SAMPLE</span>
          </header>
          <h2>Sample Client A migration</h2>
          <p>The fictional migration is two weeks behind during an ingestion security review.</p>
          <dl>
            <div><dt>Source</dt><dd>Delivery standup · 02 Jun 2025</dd></div>
            <div><dt>Author</dt><dd>Sample PM-bot</dd></div>
          </dl>
        </article>

        <div className="memory-relation" aria-label="The following correction appears only when the sandbox lifecycle toggle is simulated">
          <span aria-hidden="true" />
          <p>Superseded by · only when simulated in the sandbox</p>
        </div>

        <article className="memory-record memory-record-correction">
          <header>
            <span className="memory-record-id">MEM-004-CORRECTED</span>
            <span className="memory-record-state">SIMULATED</span>
          </header>
          <h3>Security review cleared</h3>
          <p>Fictional update · delivery standup · 20 Jun 2025</p>
        </article>

        <p className="memory-stack-footnote">Illustrative fixed corpus · no assistant or identity provider connected</p>
      </div>
    </aside>
  );
}
