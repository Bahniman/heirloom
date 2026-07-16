import { useState } from "react";
import { GlowCard } from "./glow-card";
import { LogOut, RefreshCw, FileText, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

export function EventSimulator() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  const events = [
    {
      id: "exit",
      title: "A partner resigns",
      icon: LogOut,
      desc: "Simulate a 9-year partner leaving the firm.",
      log: `[AUDIT] Partner S. Rao submitted resignation.
[HEIRLOOM] Compiling active context tags for 'S. Rao'...
[HEIRLOOM] Found 14 active project dossiers, 3 decision-rationales, 7 pricing formulas.
[STATUS] All decisions anchored with signed certificates & citations.
[VERDICT] Heirloom keeps 100% of reasoning queryable by role. Junior hires can query "Why Snowflake" and see S. Rao's actual logic from 2025 immediately.
[PREVENTED] Zero knowledge loss. No duplicate onboarding or research cycles required.`
    },
    {
      id: "switch",
      title: "Firm switches AI vendors",
      icon: RefreshCw,
      desc: "Simulate switching from OpenAI to Anthropic models.",
      log: `[AUDIT] Triggering vendor migration request...
[HEIRLOOM] Initializing secure export: meridian.openmemory.json
[EXPORT] Packing 8 primary memory nodes, 3 classification indices, 2 cryptographically signed schemas.
[COMPAT] Validator check: JSON format matches open-memory standards.
[IMPORT] Swapped model provider: GPT-4o -> Claude 3.5 Sonnet.
[VERDICT] Complete migration successful in 420ms. The firm owns its own learning loop and retains absolute vendor leverage. No historical data lock-in.`
    },
    {
      id: "correct",
      title: "Memory is outdated",
      icon: ShieldAlert,
      desc: "Simulate correcting obsolete project timelines.",
      log: `[AUDIT] Ingesting new standup status note: "migration is back on track"
[HEIRLOOM] Conflict detected with memory ID 'mem-3' (Client K delayed).
[POLICY] Applying supersession marker. old entry marked as [ARCHIVED_AUDIT].
[RETRIEVAL] New query path mapped to standup note dated 20 Jun 2025.
[VERDICT] Chatbot returns updated timelines automatically. Obsolete data remains archived in the ledger for dispute audits but stops polluting queries.`
    }
  ];

  return (
    <GlowCard className="flex flex-col gap-5" showTechBrackets={true}>
      <div>
        <h3 className="font-sans text-lg font-bold text-foreground">Memory Continuity Monitor</h3>
        <p className="text-xs text-muted-foreground">Test the three main operational hazards that wipe out organizational memory today.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {events.map((ev) => {
          const Icon = ev.icon;
          const isActive = activeEvent === ev.id;
          return (
            <button
              key={ev.id}
              onClick={() => setActiveEvent(ev.id)}
              className={`btn-press flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${
                isActive
                  ? "border-accent bg-accent/5 text-foreground shadow-[0_0_12px_rgba(237,255,0,0.1)]"
                  : "border-border/60 bg-foreground/[0.01] hover:bg-foreground/5 hover:border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`rounded-lg p-2 ${isActive ? "bg-accent/15 text-accent" : "bg-foreground/5 text-muted-foreground"}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">{ev.title}</h4>
                <p className="mt-1 text-[11px] text-muted-foreground/80 leading-snug">{ev.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {activeEvent && (
        <div className="flex flex-col gap-2 animate-slide-in">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider text-accent inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 animate-spin [animation-duration:3s]" /> Real-time Simulation Output:
            </span>
            <span>telemetry active</span>
          </div>
          <div className="rounded-xl border border-border bg-black/80 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {events.find((e) => e.id === activeEvent)?.log.split("\n").map((line, idx) => {
              const isVerdict = line.startsWith("[VERDICT]");
              const isError = line.startsWith("[PREVENTED]") || line.startsWith("[COMPAT]");
              return (
                <div key={idx} className={isVerdict ? "text-accent font-semibold mt-1" : isError ? "text-emerald-400 font-semibold" : "text-muted-foreground/90"}>
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </GlowCard>
  );
}
