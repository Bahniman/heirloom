import { useState, useRef, useEffect } from "react";
import { GlowCard } from "./glow-card";
import { 
  User, Shield, Key, Send, RefreshCw, AlertCircle, CheckCircle, 
  FileText, Folder, Lock, Unlock, Download, FileCode, CheckSquare, XSquare, Search, AlertTriangle
} from "lucide-react";

interface MemoryItem {
  id: string;
  min: number;
  k: string;
  title: string;
  text: string;
  src: string;
  creator: string;
  date: string;
  sig: string;
  supersedable?: boolean;
}

const MEMORIES: MemoryItem[] = [
  { 
    id: "MEM-001",
    min: 0, 
    k: "decision", 
    title: "Platform Choice - Snowflake",
    text: "We standardized on Snowflake over Databricks for client data-stack builds.", 
    src: "steering committee minutes, 12 Mar 2025", 
    creator: "S. Rao (Lead Architect)",
    date: "12 Mar 2025",
    sig: "ed25519:sig:9a8b7c6d5e4f3a2b1c",
  },
  { 
    id: "MEM-002",
    min: 1, 
    k: "rationale", 
    title: "Snowflake Pricing Driver",
    text: "The real driver: Databricks' pricing tripled at renewal mid-engagement at Client K in 2024 — we couldn't carry that risk into fixed-fee builds. Databricks actually scored higher in technical benchmark tests.", 
    src: "partner sync notes, 12 Mar 2025", 
    creator: "A. Patel (Managing Director)",
    date: "12 Mar 2025",
    sig: "ed25519:sig:8a7b6c5d4e3f2a1b0c"
  },
  { 
    id: "MEM-003",
    min: 2, 
    k: "commercial", 
    title: "Snowflake MSA Partner Discount",
    text: "Snowflake gave us a 40% partner discount locked to 2027 in exchange for a public case study. Do not price client work off the list rate.", 
    src: "MSA appendix C — finance", 
    creator: "M. Kapoor (Global CFO)",
    date: "10 Feb 2025",
    sig: "ed25519:sig:7a6b5c4d3e2f1a0b9c"
  },
  { 
    id: "MEM-004",
    min: 0, 
    k: "status", 
    title: "Client K Migration Blockers",
    text: "Client K data migration is running two weeks behind; the blocker is their security review of the ingestion pipeline.", 
    src: "delivery standup, 02 Jun 2025", 
    creator: "K. Shah (PM-bot)",
    date: "02 Jun 2025",
    sig: "ed25519:sig:6a5b4c3d2e1f0a9b8c",
    supersedable: true
  },
  { 
    id: "MEM-005",
    min: 1, 
    k: "postmortem", 
    title: "Vertex Bid Postmortem",
    text: "We lost the Vertex FY25 pitch because we led with the rate card instead of outcomes. Their CPO said as much in the debrief. Lead with the outcome memo.", 
    src: "pitch postmortem, 18 Jan 2025", 
    creator: "A. Menon (Partner)",
    date: "18 Jan 2025",
    sig: "ed25519:sig:5a4b3c2d1e0f9a8b7c"
  },
  { 
    id: "MEM-006",
    min: 0, 
    k: "client note", 
    title: "CFO Engagement Preferences",
    text: "Client K's CFO reads one-page memos only — she has said twice that she 'doesn't do decks'. Bring a single A4, numbers first.", 
    src: "account notes — R. Iyer", 
    creator: "R. Iyer (Account Director)",
    date: "14 Apr 2025",
    sig: "ed25519:sig:4a3b2c1d0e9f8a7b6c"
  },
  { 
    id: "MEM-007",
    min: 0, 
    k: "compliance", 
    title: "Client K NDA Subcontracting",
    text: "Client K NDA clause 7.3: nothing from their data room may be shared with subcontractors without written consent.", 
    src: "NDA register", 
    creator: "G. Sen (Legal Counsel)",
    date: "05 Jan 2025",
    sig: "ed25519:sig:3a2b1c0d9e8f7a6b5c"
  },
  { 
    id: "MEM-008",
    min: 1, 
    k: "pricing policy", 
    title: "Discount Ceiling Thresholds",
    text: "Standard discount ceiling is 12% without partner sign-off; anything above requires a margin memo.", 
    src: "pricing policy v4, Sec 2.1", 
    creator: "F. Ahmed (Partner)",
    date: "01 Dec 2024",
    sig: "ed25519:sig:2a1b0c9d8e7f6a5b4c"
  },
];

const QUERIES = [
  { q: "Why did we pick Snowflake for the client data stack?", hits: ["MEM-001", "MEM-002", "MEM-003"] },
  { q: "Prepping for Client K's CFO tomorrow — what should I know?", hits: ["MEM-006", "MEM-004", "MEM-007"] },
  { q: "Can I offer 15% off to close the Vertex renewal?", hits: ["MEM-008", "MEM-005"] },
];

const ROLE_NAMES = ["Analyst (New Hire)", "Engagement Manager", "Partner"];
const ROLE_ICONS = [User, Shield, Key];

export function RoleQuerySimulator() {
  const [role, setRole] = useState(0);
  const [activeTab, setActiveTab] = useState<"explorer" | "query" | "lifecycle">("explorer");
  const [selectedFile, setSelectedFile] = useState<MemoryItem | null>(MEMORIES[0]);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot" | "telemetry"; text: string; subtext?: string; roleLabel?: string; type?: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [corrected, setCorrected] = useState(false);
  const [resigned, setResigned] = useState(false);
  const [lastQueryIdx, setLastQueryIdx] = useState<number | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleAsk = async (qi: number) => {
    if (isTyping) return;
    setLastQueryIdx(qi);
    const query = QUERIES[qi]!;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query.q, roleLabel: ROLE_NAMES[role] }
    ]);
    setIsTyping(true);

    // 1. Policy verification
    await new Promise((res) => setTimeout(res, 500));
    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[POLICY] Evaluating query tokens... Active Role: ${ROLE_NAMES[role]}`,
        type: "info"
      }
    ]);

    await new Promise((res) => setTimeout(res, 450));
    
    // Evaluate hits based on role constraints & simulation modifiers
    const activeHits = query.hits.filter(id => {
      const item = MEMORIES.find(m => m.id === id)!;
      // Filter out partner-level records if partner is simulated as resigned (wipeout)
      if (resigned && item.creator.includes("Partner")) return false;
      // Filter out superseded status item if update has been simulated
      if (corrected && item.id === "MEM-004") return false;
      return item.min <= role;
    });
    const blockedCount = query.hits.length - activeHits.length;

    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[DECRYPTION] Resolved ${activeHits.length} matching memory nodes. Pruned ${blockedCount} unauthorized/revoked records.`,
        type: blockedCount > 0 ? "warn" : "success"
      }
    ]);

    await new Promise((res) => setTimeout(res, 600));
    setIsTyping(false);

    if (activeHits.length === 0) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "ACCESS PROHIBITED: Pre-retrieval scope checks blocked all indexing matching the query parameters.", subtext: "0 memory vectors evaluated" }
      ]);
    } else {
      activeHits.forEach(async (id, i) => {
        await new Promise((res) => setTimeout(res, 300 * i));
        const item = MEMORIES.find(m => m.id === id)!;
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `[${item.k.toUpperCase()}] ${item.text}`,
            subtext: `📍 Signed Provenance: ${item.src} | Auth Hash: ${item.sig.slice(0, 16)}...`
          }
        ]);
      });
    }

    // Append update if Client K is updated
    if (corrected && qi === 1) {
      await new Promise((res) => setTimeout(res, 900));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `[STATUS (CORRECTED)] Client K data migration security review cleared on 20 Jun. Project is back on track.`,
          subtext: `📍 Signed Provenance: delivery standup, 20 Jun 2025 — pm-bot`
        }
      ]);
    }
  };

  const getExportJSON = () => {
    const records = MEMORIES.filter(m => !resigned || !m.creator.includes("Partner")).map(m => ({
      schema: "open-memory/v1",
      id: m.id,
      classification: m.k,
      timestamp: m.date,
      author: m.creator,
      content: m.text,
      signature: m.sig,
      policy: { min_role_level: m.min }
    }));
    return JSON.stringify(records, null, 2);
  };

  const resetDemos = () => {
    setMessages([]);
    setIsTyping(false);
    setLastQueryIdx(null);
    setCorrected(false);
    setResigned(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">Interactive Sandbox: Memory Vault</h3>
          <p className="text-xs text-muted-foreground">Scope credentials and trigger lifecycle updates to see corporate RAG memory in action.</p>
        </div>
        <button
          onClick={resetDemos}
          className="self-start flex h-8 items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low px-3 text-xs text-on-surface hover:bg-on-surface/8 hover:text-on-surface transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset Sandbox
        </button>
      </div>

      {/* Role Scoper Selector */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Select Credentials Clearance:</span>
        <div className="grid grid-cols-3 gap-2">
          {ROLE_NAMES.map((name, idx) => {
            const Icon = ROLE_ICONS[idx]!;
            const isSelected = role === idx;
            return (
              <button
                key={idx}
                onClick={() => setRole(idx)}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary-container text-on-primary-container font-semibold"
                    : "border-outline-variant bg-surface-container text-on-surface-variant hover:bg-on-surface/8 hover:text-on-surface"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-primary" : "text-on-surface-variant"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-outline-variant">
        {(["explorer", "query", "lifecycle"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`border-b-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === t
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t === "explorer" ? "📁 Vault Explorer" : t === "query" ? "🔍 Scoped Search" : "⚙️ Lifecycle Events"}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[380px]">
        {activeTab === "explorer" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* File List */}
            <div className="md:col-span-5 border border-outline-variant rounded-lg p-3 bg-surface-container-low space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-on-surface-variant tracking-wider block border-b border-outline-variant pb-1.5 mb-2">Vault Index</span>
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                {MEMORIES.map((m) => {
                  const isLocked = m.min > role;
                  const isResignedPartner = resigned && m.creator.includes("Partner");
                  const isSuperseded = corrected && m.id === "MEM-004";
                  
                  return (
                    <button
                      key={m.id}
                      onClick={() => !isResignedPartner && setSelectedFile(m)}
                      disabled={isResignedPartner}
                      className={`w-full text-left p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                        isResignedPartner 
                          ? "opacity-35 cursor-not-allowed border-dashed bg-surface-container" 
                          : selectedFile?.id === m.id
                          ? "border-primary bg-primary-container text-on-primary-container font-semibold"
                          : "border-outline-variant hover:bg-on-surface/8 text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <FileText className={`h-4 w-4 shrink-0 ${isLocked ? "text-on-surface-variant" : "text-primary"}`} />
                        <span className="truncate">{m.title}</span>
                      </span>
                      {isResignedPartner ? (
                        <span className="font-mono text-[8px] border border-error/30 text-error bg-error/5 px-1 rounded">REVOKED</span>
                      ) : isSuperseded ? (
                        <span className="font-mono text-[8px] border border-warning/30 text-warning bg-warning/5 px-1 rounded">SUPERSEDED</span>
                      ) : isLocked ? (
                        <Lock className="h-3 w-3 text-on-surface-variant shrink-0" />
                      ) : (
                        <Unlock className="h-3 w-3 text-primary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* File Viewer */}
            <div className="md:col-span-7 border border-outline-variant rounded-lg p-4 bg-surface-container-high relative">
              <div className="absolute top-2 right-2 w-4 h-1 border-t border-r border-outline-variant" />
              <div className="absolute bottom-2 right-2 w-4 h-1 border-b border-r border-outline-variant" />
              <div className="absolute top-2 left-2 w-4 h-1 border-t border-l border-outline-variant" />
              <div className="absolute bottom-2 left-2 w-4 h-1 border-b border-l border-outline-variant" />

              {selectedFile ? (() => {
                const isLocked = selectedFile.min > role;
                const isSuperseded = corrected && selectedFile.id === "MEM-004";
                
                return (
                  <div className="h-full flex flex-col font-mono text-xs text-muted-foreground space-y-3.5">
                    <div className="border-b border-border/40 pb-3 flex items-center justify-between">
                      <span className="font-bold text-foreground truncate">{selectedFile.id} // {selectedFile.title.toUpperCase()}</span>
                      <span className="text-[9px] uppercase border border-border/80 px-2 py-0.5 rounded font-bold">
                        Clearance: Lvl {selectedFile.min}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] border-b border-border/40 pb-3">
                      <div>
                        <span className="text-muted-foreground/60 block">CREATOR:</span>
                        <span className="text-foreground">{selectedFile.creator}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground/60 block">DATE LOGGED:</span>
                        <span className="text-foreground">{selectedFile.date}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[120px] bg-surface-container border border-outline-variant rounded-lg p-3 relative flex items-center justify-center">
                      {isLocked ? (
                        <div className="text-center space-y-2 p-4 animate-pulse">
                          <Lock className="h-8 w-8 mx-auto text-error" />
                          <p className="font-bold text-error">DECRYPTION FAILURE [UNAUTHORIZED]</p>
                          <p className="text-[10px] text-muted-foreground max-w-sm">Requires role level &gt;= {selectedFile.min}. Pre-scoring vector clearance returned null.</p>
                        </div>
                      ) : (
                        <div className="w-full h-full font-sans text-foreground text-sm leading-relaxed self-start">
                          {isSuperseded && (
                            <div className="mb-3 border border-amber-500/30 bg-amber-500/5 text-amber-500 rounded p-2 text-xs flex items-center gap-2 font-mono">
                              <AlertTriangle className="h-4 w-4 shrink-0" />
                              <span>SUPERSEDED BY UPDATE MEM-004B (ACTIVE RUN)</span>
                            </div>
                          )}
                          <p>{selectedFile.text}</p>
                          <p className="mt-4 font-mono text-xs text-muted-foreground italic border-t border-border/20 pt-2.5">
                            Source Reference: {selectedFile.src}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] flex flex-col gap-1 text-muted-foreground/50 border-t border-border/40 pt-3">
                      <span>KEY_SIG: {isLocked ? "REVOKED_DECRYPT_KEY_INVALID" : selectedFile.sig}</span>
                      <span>CIPHER: {isLocked ? "AES_256_GCM_ENCRYPTED_LOCKED" : "PLAIN_TEXT_SCOPED_DECRYPTED"}</span>
                    </div>
                  </div>
                );
              })() : (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground font-mono text-xs">
                  <span>Select a document node in the vault index to inspect details.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "query" && (
          <div className="space-y-4">
            {/* Console */}
            <div className="flex h-[280px] flex-col rounded-lg border border-outline-variant bg-surface-container-high p-4 font-mono text-xs md:text-sm">
              <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center text-center text-on-surface-variant font-sans">
                    <Send className="h-8 w-8 mb-2 opacity-40 animate-pulse text-primary" />
                    <span>Search Engine Idle. Pick a query queue option below to test filtering.</span>
                  </div>
                )}

                {messages.map((msg, idx) => {
                  if (msg.sender === "user") {
                    return (
                      <div key={idx} className="flex justify-end">
                        <div className="max-w-[85%] rounded-lg bg-primary-container border border-primary/20 p-3 text-right">
                          <p className="font-semibold text-on-primary-container">{msg.text}</p>
                          <span className="text-[9px] text-on-primary-container opacity-80 uppercase tracking-widest mt-1 block font-mono">Asked as: {msg.roleLabel}</span>
                        </div>
                      </div>
                    );
                  }
                  if (msg.sender === "telemetry") {
                    const isWarn = msg.type === "warn";
                    return (
                      <div key={idx} className={`flex items-start gap-1.5 p-2 rounded-lg border text-[10px] ${
                        isWarn
                          ? "bg-amber-500/5 border-amber-500/20 text-amber-500"
                          : msg.type === "success"
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                          : "bg-blue-500/5 border-blue-500/20 text-blue-500"
                      }`}>
                        {isWarn ? <AlertCircle className="h-3.5 w-3.5 shrink-0" /> : <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
                        <span>{msg.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flex justify-start">
                      <div className="max-w-[90%] rounded-xl bg-foreground/[0.04] border border-border/80 p-3">
                        <p className="text-foreground leading-relaxed text-xs sm:text-sm">{msg.text}</p>
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

            {/* Chips */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Queries in Queue:</span>
              <div className="flex flex-wrap gap-2">
                {QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(idx)}
                    disabled={isTyping}
                    className={`rounded-lg border text-left p-3 text-xs md:text-sm font-medium transition-all ${
                      lastQueryIdx === idx
                        ? "border-primary bg-primary-container text-on-primary-container"
                        : "border-outline-variant bg-surface-container hover:bg-on-surface/8 text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    🔍 &nbsp;{q.q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "lifecycle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Event Triggers */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground tracking-wider block border-b border-border pb-1.5">Simulation Events</span>
              
              <div className="space-y-3">
                {/* Event 1 */}
                <div className="border border-border rounded-xl p-4 bg-foreground/[0.02] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">1. PARTNER DEPARTURE</span>
                    <span className={`text-[9px] border px-1.5 rounded font-bold ${resigned ? "border-red-500/30 text-red-500 bg-red-500/5" : "border-border text-muted-foreground"}`}>
                      {resigned ? "SIMULATED" : "INACTIVE"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[11px] font-sans leading-normal">
                    Simulates a partner leaving the firm. This revokes their Ed25519 signing keys, instantly removing documents created by them (e.g. A. Menon) from query results.
                  </p>
                  <button
                    onClick={() => setResigned(!resigned)}
                    className={`w-full p-2.5 rounded-lg border font-bold transition-colors ${
                      resigned
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-outline bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80"
                    }`}
                  >
                    {resigned ? "Restore Partner Keys" : "Simulate Key Revocation"}
                  </button>
                </div>

                {/* Event 2 */}
                <div className="border border-outline-variant rounded-lg p-4 bg-surface-container space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">2. FACT SUPERSESSION</span>
                    <span className={`text-[9px] border px-1.5 rounded font-bold ${corrected ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" : "border-outline-variant text-on-surface-variant"}`}>
                      {corrected ? "UPDATED" : "INACTIVE"}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans leading-normal">
                    Adds a new corrected record (Client K migration review cleared) that supersedes the outdated delay fact in searches.
                  </p>
                  <button
                    onClick={() => setCorrected(!corrected)}
                    className={`w-full p-2.5 rounded-lg border font-bold transition-colors ${
                      corrected
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                        : "border-outline bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80"
                    }`}
                  >
                    {corrected ? "Restore Old Fact State" : "Simulate Fact Correction"}
                  </button>
                </div>
              </div>
            </div>

            {/* Open Export JSON */}
            <div className="border border-outline-variant rounded-lg p-4 bg-surface-container-high flex flex-col">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-3">
                <span className="font-bold text-foreground">3. OPEN MEMORY EXPORT</span>
                <span className="text-[9px] uppercase border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded font-bold">
                  open-memory/v1
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] font-sans leading-normal mb-3">
                Heirloom decoupled memory can be exported as a standard portable JSON. Swapping AI vendors (e.g. from OpenAI to Anthropic) never means losing institutional context.
              </p>
              <div className="flex-1 bg-surface-container border border-outline-variant rounded-lg p-2.5 overflow-auto max-h-[200px] text-[10px] text-on-surface-variant font-mono scrollbar-thin">
                <pre>{getExportJSON()}</pre>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(getExportJSON());
                  alert("Open Memory Schema JSON copied to clipboard!");
                }}
                className="mt-3 flex items-center justify-center gap-2 p-2.5 border border-outline bg-surface-container-low text-on-surface hover:bg-on-surface/8 rounded-lg font-bold transition-colors"
              >
                <Download className="h-4 w-4" /> Copy Export Schema
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
