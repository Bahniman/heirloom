import { useState, useRef, useEffect } from "react";
import { GlowCard } from "./glow-card";
import { User, Shield, Key, Send, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface MemoryItem {
  min: number;
  k: string;
  text: string;
  src: string;
  supersedable?: boolean;
}

const MEMORIES: MemoryItem[] = [
  { min: 0, k: "decision", text: "We standardized on Snowflake over Databricks for client data-stack builds (steering decision, Mar 2025).", src: "steering committee minutes, 12 Mar 2025 — S. Rao" },
  { min: 1, k: "rationale", text: "The real driver: Databricks' pricing tripled at renewal mid-engagement at Client K in 2024 — we couldn't carry that risk into fixed-fee builds. Their demo actually scored higher.", src: "partner sync notes, 12 Mar 2025 — S. Rao" },
  { min: 2, k: "commercial", text: "Snowflake gave us a 40% partner discount locked to 2027 in exchange for a public case study. Do not price client work off the list rate.", src: "MSA appendix C — finance" },
  { min: 0, k: "status", text: "Client K data migration is running two weeks behind; the blocker is their security review of the ingestion pipeline.", src: "delivery standup, 02 Jun 2025 — pm-bot", supersedable: true },
  { min: 1, k: "postmortem", text: "We lost the Vertex FY25 pitch because we led with the rate card instead of outcomes. Their CPO said as much in the debrief. Lead with the outcome memo.", src: "pitch postmortem, 18 Jan 2025 — A. Menon" },
  { min: 0, k: "client note", text: "Client K's CFO reads one-page memos only — she has said twice that she 'doesn't do decks'. Bring a single A4, numbers first.", src: "account notes — R. Iyer" },
  { min: 0, k: "compliance", text: "Client K NDA clause 7.3: nothing from their data room may be shared with subcontractors without written consent.", src: "NDA register" },
  { min: 1, k: "pricing policy", text: "Standard discount ceiling is 12% without partner sign-off; anything above requires a margin memo.", src: "pricing policy v4, Sec 2.1" },
];

const QUERIES = [
  { q: "Why did we pick Snowflake for the client data stack?", hits: [0, 1, 2] },
  { q: "Prepping for Client K's CFO tomorrow — what should I know?", hits: [5, 3, 6] },
  { q: "Can I offer 15% off to close the Vertex renewal?", hits: [7, 4] },
];

const ROLE_NAMES = ["Analyst (New Hire)", "Engagement Manager", "Partner"];
const ROLE_ICONS = [User, Shield, Key];

export function RoleQuerySimulator() {
  const [role, setRole] = useState(0);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot" | "telemetry"; text: string; subtext?: string; roleLabel?: string; type?: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [corrected, setCorrected] = useState(false);
  const [lastQueryIdx, setLastQueryIdx] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleAsk = async (qi: number) => {
    if (isTyping) return;
    setLastQueryIdx(qi);
    const query = QUERIES[qi];

    // 1. User Message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query.q, roleLabel: ROLE_NAMES[role] }
    ]);
    setIsTyping(true);

    // 2. Telemetry / Policy Engine Verification
    await new Promise((res) => setTimeout(res, 500));
    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[POLICY] Verifying role: ${ROLE_NAMES[role]} | Checking cryptographically signed mandate...`,
        type: "info"
      }
    ]);

    await new Promise((res) => setTimeout(res, 600));
    const activeHits = query.hits.filter(i => MEMORIES[i].min <= role && !(corrected && i === 3));
    const blockedCount = query.hits.length - activeHits.length;

    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[POLICY] Scoped ${activeHits.length} matching memories. Blocked ${blockedCount} unauthorized entries prior to retrieval.`,
        type: blockedCount > 0 ? "warn" : "success"
      }
    ]);

    await new Promise((res) => setTimeout(res, 700));
    setIsTyping(false);

    if (activeHits.length === 0) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "ACCESS DENIED: Nothing in the firm memory is available to your role level for this query.", subtext: "0 memories returned" }
      ]);
    } else {
      for (let i = 0; i < activeHits.length; i++) {
        await new Promise((res) => setTimeout(res, 400));
        const item = MEMORIES[activeHits[i]];
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `[${item.k.toUpperCase()}] ${item.text}`,
            subtext: `📎 Provenance: ${item.src}`
          }
        ]);
      }
    }

    // Special behavior if update has been triggered and querying Client K CFO
    if (corrected && qi === 1) {
      await new Promise((res) => setTimeout(res, 400));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `[STATUS (UPDATED)] Client K migration is back on track — their security review cleared on 20 Jun.`,
          subtext: `📎 Provenance: delivery standup, 20 Jun 2025 — pm-bot`
        }
      ]);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setIsTyping(false);
    setLastQueryIdx(null);
  };

  return (
    <GlowCard className="flex flex-col gap-6" showTechBrackets={true}>
      <div className="flex flex-col gap-4 border-b border-border/40 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">Interactive Sandbox: Scoped Recall</h3>
          <p className="text-xs text-muted-foreground">Modify your access level below, and ask questions to see real-time pre-retrieval filtering.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="btn-press flex h-8 items-center gap-1.5 rounded-lg border border-border bg-foreground/5 px-3 text-xs text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          >
            <RefreshCw className="h-3 w-3" /> Reset Console
          </button>
          <button
            onClick={() => setCorrected(!corrected)}
            className={`btn-press flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all ${
              corrected
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                : "border-border bg-foreground/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            {corrected ? "Memory Updated" : "Simulate Update"}
          </button>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {ROLE_NAMES.map((name, idx) => {
          const Icon = ROLE_ICONS[idx];
          const isSelected = role === idx;
          return (
            <button
              key={idx}
              onClick={() => setRole(idx)}
              className={`btn-press flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                isSelected
                  ? "border-accent bg-accent/10 text-foreground font-semibold shadow-[0_0_12px_rgba(237,255,0,0.15)]"
                  : "border-border bg-foreground/[0.02] text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isSelected ? "text-neon-accent" : ""}`} />
              <span className="text-[11px] uppercase tracking-wide md:text-xs">{name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Monospace Chat Console */}
      <div className="flex h-[320px] flex-col rounded-xl border border-border bg-black/60 p-4 font-mono text-xs md:text-sm">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground/60">
              <Send className="h-8 w-8 mb-2 opacity-40 animate-pulse text-accent" />
              <span>Console Idle. Pick a query chip below to run validation.</span>
            </div>
          )}

          {messages.map((msg, idx) => {
            if (msg.sender === "user") {
              return (
                <div key={idx} className="flex justify-end animate-fade-in">
                  <div className="max-w-[85%] rounded-xl bg-accent/20 border border-accent/40 p-3 text-right">
                    <p className="font-semibold text-foreground">{msg.text}</p>
                    <span className="text-[10px] text-muted-foreground opacity-80 uppercase tracking-widest mt-1 block">Asked as {msg.roleLabel}</span>
                  </div>
                </div>
              );
            }
            if (msg.sender === "telemetry") {
              const isWarn = msg.type === "warn";
              return (
                <div key={idx} className={`flex items-start gap-1.5 p-2 rounded-lg border text-[11px] animate-fade-in ${
                  isWarn
                    ? "bg-amber-500/5 border-amber-500/20 text-amber-400"
                    : msg.type === "success"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                    : "bg-blue-500/5 border-blue-500/20 text-blue-400"
                }`}>
                  {isWarn ? <AlertCircle className="h-3.5 w-3.5 shrink-0" /> : <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
                  <span>{msg.text}</span>
                </div>
              );
            }
            return (
              <div key={idx} className="flex justify-start animate-fade-in">
                <div className="max-w-[90%] rounded-xl bg-foreground/[0.04] border border-border/80 p-3">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.subtext && (
                    <span className="text-[10px] text-muted-foreground mt-2 block border-t border-border/40 pt-1.5 italic font-sans">{msg.subtext}</span>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-foreground/[0.02] border border-border/40 p-3 text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                  <span className="animate-bounce [animation-delay:0.4s]">●</span>
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Query Chips */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs font-semibold text-muted-foreground">Queries in Queue:</span>
        <div className="flex flex-wrap gap-2">
          {QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(idx)}
              disabled={isTyping}
              className={`btn-press rounded-lg border text-left p-3 text-xs md:text-sm font-medium transition-all ${
                lastQueryIdx === idx
                  ? "border-accent bg-accent/5 text-foreground"
                  : "border-border/60 bg-foreground/[0.01] hover:bg-foreground/5 hover:border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              🔍 &nbsp;{q.q}
            </button>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}
