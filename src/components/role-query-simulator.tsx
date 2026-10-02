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
  sig?: string;
  supersedable?: boolean;
}

interface ExportRecord {
  schema: string;
  id: string;
  classification: string;
  timestamp: string;
  author: string;
  content: string;
  signature_status: string;
  record_status: string;
  superseded_by?: string;
  supersedes?: string;
  policy: { min_role_level: number };
}

const MEMORIES: MemoryItem[] = [
  {
    id: "MEM-001",
    min: 0,
    k: "decision",
    title: "Platform Choice - Northstar Data",
    text: "The team chose Northstar Data over Harbor Analytics for the client data-stack build.",
    src: "steering committee minutes, 12 Mar 2025",
    creator: "Lead architect",
    date: "12 Mar 2025",
  },
  {
    id: "MEM-002",
    min: 1,
    k: "rationale",
    title: "Harbor Analytics Pricing Assumption",
    text: "Harbor Analytics scored higher on the technical benchmark, but Northstar Data gave more predictable costs on a fixed-fee build, so it won.",
    src: "partner sync notes, 12 Mar 2025",
    creator: "Managing director",
    date: "12 Mar 2025",
  },
  {
    id: "MEM-003",
    min: 2,
    k: "commercial",
    title: "Northstar Data Partner Pricing",
    text: "A partner discount applies for the length of the contract. Check the agreement before quoting list price.",
    src: "partner terms, finance",
    creator: "Partner",
    date: "10 Feb 2025",
  },
  {
    id: "MEM-004",
    min: 0,
    k: "status",
    title: "Client A Migration Status",
    text: "The Client A data migration is two weeks behind while the ingestion pipeline is under security review.",
    src: "delivery standup, 02 Jun 2025",
    creator: "PM-bot",
    date: "02 Jun 2025",
    supersedable: true
  },
  {
    id: "MEM-005",
    min: 1,
    k: "postmortem",
    title: "Client B Bid Review",
    text: "Lead the next proposal with outcomes and the numbers behind them. Discuss rates after.",
    src: "pitch postmortem, 18 Jan 2025",
    creator: "Partner",
    date: "18 Jan 2025",
  },
  {
    id: "MEM-006",
    min: 0,
    k: "client note",
    title: "Client A CFO Preferences",
    text: "Their CFO wants a short, numbers-first memo. Bring a one-page summary.",
    src: "fictional account notes",
    creator: "Account director",
    date: "14 Apr 2025",
  },
  {
    id: "MEM-007",
    min: 0,
    k: "compliance",
    title: "Client A Subcontracting Terms",
    text: "Nothing from Client A's data room goes to subcontractors without written approval.",
    src: "NDA register",
    creator: "Legal counsel",
    date: "05 Jan 2025",
  },
  {
    id: "MEM-008",
    min: 1,
    k: "pricing policy",
    title: "Discount Ceiling Thresholds",
    text: "Standard discount ceiling is 12% without partner sign-off; anything above requires a margin memo.",
    src: "pricing policy v4, Sec 2.1",
    creator: "Partner",
    date: "01 Dec 2024",
  },
];

const QUERIES = [
  { q: "Why did we pick Northstar Data for the client data stack?", hits: ["MEM-001", "MEM-002", "MEM-003"] },
  { q: "Preparing for Client A's CFO meeting. What should I know?", hits: ["MEM-006", "MEM-004", "MEM-007"] },
  { q: "Can I offer 15% off to close Client B?", hits: ["MEM-008", "MEM-005"] },
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
  const runId = useRef(0);
  const pendingTimers = useRef(new Map<number, () => void>());
  const [exportStatus, setExportStatus] = useState("");
  const [resetStatus, setResetStatus] = useState("");

  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const log = chatLogRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, isTyping]);

  useEffect(() => () => {
    runId.current += 1;
    cancelPendingTimers();
  }, []);

  const cancelPendingTimers = () => {
    for (const [timer, resolve] of pendingTimers.current) {
      window.clearTimeout(timer);
      resolve();
    }
    pendingTimers.current.clear();
  };

  const pause = (ms: number) => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    return new Promise<void>(resolve => {
      const timer = window.setTimeout(() => {
        pendingTimers.current.delete(timer);
        resolve();
      }, duration);
      pendingTimers.current.set(timer, resolve);
    });
  };

  const handleAsk = async (qi: number) => {
    if (isTyping) return;
    const requestId = ++runId.current;
    const requestRole = role;
    const requestResigned = resigned;
    const requestCorrected = corrected;
    setLastQueryIdx(qi);
    const query = QUERIES[qi]!;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query.q, roleLabel: ROLE_NAMES[role] }
    ]);
    setIsTyping(true);

    // 1. Policy verification
    await pause(500);
    if (requestId !== runId.current) return;
    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[FILTER] Applying role: ${ROLE_NAMES[requestRole]}`,
        type: "info"
      }
    ]);

    await pause(450);
    if (requestId !== runId.current) return;

    // Evaluate hits based on role constraints & simulation modifiers
    const activeHits = query.hits.filter(id => {
      const item = MEMORIES.find(m => m.id === id)!;
      // Filter out partner-level records if partner is simulated as resigned (wipeout)
      if (requestResigned && item.creator.toLowerCase().includes("partner")) return false;
      // Filter out superseded status item if update has been simulated
      if (requestCorrected && item.id === "MEM-004") return false;
      return item.min <= requestRole;
    });
    const blockedCount = query.hits.length - activeHits.length;

    setMessages((prev) => [
      ...prev,
      {
        sender: "telemetry",
        text: `[FILTER] ${activeHits.length} records match. ${blockedCount} held back for this role or after a departure.`,
        type: blockedCount > 0 ? "warn" : "success"
      }
    ]);

    await pause(600);
    if (requestId !== runId.current) return;

    if (activeHits.length === 0) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Nothing this role is allowed to see answers that question.", subtext: "The filter ran before retrieval, so the hidden records never reached the assistant." }
      ]);
    } else {
      for (let i = 0; i < activeHits.length; i += 1) {
        await pause(300 * i);
        if (requestId !== runId.current) return;
        const id = activeHits[i]!;
        const item = MEMORIES.find(m => m.id === id)!;
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `[${item.k.toUpperCase()}] ${item.text}`,
            subtext: `Source: ${item.src} | Record: ${item.id}`
          }
        ]);
      }
    }

    // Append a fictional corrected status record when that sample state is enabled.
    if (requestCorrected && qi === 1) {
      await pause(900);
      if (requestId !== runId.current) return;
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `[STATUS (CORRECTED)] Client A data migration security review cleared on 20 Jun.`,
          subtext: `Delivery standup, 20 Jun 2025, pm-bot`
        }
      ]);
    }
    if (requestId === runId.current) setIsTyping(false);
  };

  const getExportJSON = () => {
    const records: ExportRecord[] = MEMORIES.filter(m => !resigned || !m.creator.toLowerCase().includes("partner")).map(m => ({
      schema: "heirloom-sample/v1",
      id: m.id,
      classification: m.k,
      timestamp: m.date,
      author: m.creator,
      content: m.text,
      signature_status: "not-signed-example-only",
      record_status: corrected && m.id === "MEM-004" ? "superseded" : "active",
      ...(corrected && m.id === "MEM-004" ? { superseded_by: "MEM-004-CORRECTED" } : {}),
      policy: { min_role_level: m.min }
    }));
    if (corrected) records.push({
      schema: "heirloom-sample/v1",
      id: "MEM-004-CORRECTED",
      classification: "status",
      timestamp: "20 Jun 2025",
      author: "pm-bot",
      content: "Status update: Client A data migration security review cleared.",
      signature_status: "not-signed-example-only",
      record_status: "active",
      supersedes: "MEM-004",
      policy: { min_role_level: 0 }
    });
    return JSON.stringify(records, null, 2);
  };

  const resetDemos = () => {
    runId.current += 1;
    cancelPendingTimers();
    setRole(0);
    setActiveTab("explorer");
    setSelectedFile(MEMORIES[0]!);
    setMessages([]);
    setIsTyping(false);
    setLastQueryIdx(null);
    setCorrected(false);
    setResigned(false);
    setExportStatus("");
    setResetStatus("Back to Analyst, Vault Explorer and the first record.");
  };

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(getExportJSON());
      setExportStatus("JSON copied.");
    } catch {
      setExportStatus("Clipboard access is unavailable. Download the JSON instead.");
    }
  };

  const downloadExport = () => {
    const blob = new Blob([getExportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "heirloom-open-memory.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExportStatus("Download requested. Check your browser’s downloads.");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">The vault</h3>
          <p className="text-xs text-muted-foreground">Eight records from a consulting firm. Switch roles and see what each person is allowed to know.</p>
        </div>
        <button type="button"
          onClick={resetDemos}
          className="self-start flex h-8 items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low px-3 text-xs text-on-surface hover:bg-on-surface/8 hover:text-on-surface transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
      <p className="-mt-4 min-h-5 text-xs text-muted-foreground" role="status" aria-live="polite">{resetStatus}</p>

      {/* Role Scoper Selector */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Ask as:</span>
        <div className="grid grid-cols-3 gap-2">
          {ROLE_NAMES.map((name, idx) => {
            const Icon = ROLE_ICONS[idx]!;
            const isSelected = role === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setRole(idx)}
                aria-pressed={isSelected}
                disabled={isTyping}
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
            type="button"
            onClick={() => setActiveTab(t)}
            aria-pressed={activeTab === t}
            className={`border-b-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === t
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t === "explorer" ? "Vault Explorer" : t === "query" ? "Scoped Search" : "Lifecycle Events"}
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
                  const isResignedPartner = resigned && m.creator.toLowerCase().includes("partner");
                  const isSuperseded = corrected && m.id === "MEM-004";

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => !isResignedPartner && setSelectedFile(m)}
                      disabled={isResignedPartner}
                      aria-pressed={selectedFile?.id === m.id}
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
                        <span className="font-mono text-[8px] border border-error/30 text-error bg-error/5 px-1 rounded">HIDDEN FOR ROLE</span>
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
                    Visible to: {ROLE_NAMES[selectedFile.min]}{selectedFile.min < 2 ? " and up" : " only"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] border-b border-border/40 pb-3">
                      <div>
                        <span className="text-muted-foreground block">CREATOR:</span>
                        <span className="text-foreground">{selectedFile.creator}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">DATE LOGGED:</span>
                        <span className="text-foreground">{selectedFile.date}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-h-[120px] bg-surface-container-highest border border-outline-variant rounded-lg p-3 relative flex items-center justify-center">
                      {isLocked ? (
                        <div className="text-center space-y-2 p-4 animate-pulse">
                          <Lock className="h-8 w-8 mx-auto text-error" />
                          <p className="font-bold text-error">Outside this role</p>
                          <p className="text-[10px] text-on-surface-variant max-w-sm">The local demonstration hides this record because it requires role level {selectedFile.min}.</p>
                        </div>
                      ) : (
                        <div className="w-full h-full font-sans text-on-surface text-sm leading-relaxed self-start">
                          {isSuperseded && (
                            <div className="mb-3 border border-transparent bg-error-container text-on-error-container rounded p-2 text-xs flex items-center gap-2 font-mono">
                              <AlertTriangle className="h-4 w-4 shrink-0" />
                              <span>SUPERSEDED BY UPDATE MEM-004-CORRECTED </span>
                            </div>
                          )}
                          <p>{selectedFile.text}</p>
                          <p className="mt-4 font-mono text-xs text-on-surface-variant italic border-t border-outline-variant pt-2.5">
                            Source Reference: {selectedFile.src}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] flex flex-col gap-1 text-on-surface-variant border-t border-outline-variant/40 pt-3">
                      <span>RECORD: {selectedFile.id}</span>
                      <span>LOWEST ROLE: {ROLE_NAMES[selectedFile.min]}</span>
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
            <div aria-live="polite" aria-relevant="additions text" aria-busy={isTyping} className="flex h-[280px] flex-col rounded-2xl border border-outline-variant bg-surface-container-low p-4 font-mono text-xs md:text-sm text-on-surface">
              <div ref={chatLogRef} className="flex-grow overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center text-center text-on-surface-variant font-sans">
                    <Send className="h-8 w-8 mb-2 opacity-40 animate-pulse text-primary" />
                    <span>Pick a question below to see what comes back.</span>
                  </div>
                )}

                {messages.map((msg, idx) => {
                  if (msg.sender === "user") {
                    return (
                      <div key={idx} className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary-container border border-transparent p-3 text-right">
                          <p className="font-medium text-on-primary-container">{msg.text}</p>
                          <span className="text-[9px] text-on-primary-container/70 uppercase tracking-widest mt-1 block font-mono">Asked as: {msg.roleLabel}</span>
                        </div>
                      </div>
                    );
                  }
                  if (msg.sender === "telemetry") {
                    const isWarn = msg.type === "warn";
                    return (
                      <div key={idx} className={`flex items-start gap-1.5 p-2 rounded-lg border text-[10px] ${
                        isWarn
                          ? "bg-error-container border-transparent text-on-error-container"
                          : msg.type === "success"
                          ? "bg-tertiary-container border-transparent text-on-tertiary-container"
                          : "bg-secondary-container border-transparent text-on-secondary-container"
                      }`}>
                        {isWarn ? <AlertCircle className="h-3.5 w-3.5 shrink-0" /> : <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
                        <span>{msg.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flex justify-start">
                      <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-surface-container-highest border border-transparent p-3">
                        <p className="text-on-surface leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                        {msg.subtext && (
                          <span className="text-[10px] text-on-surface-variant mt-2 block border-t border-outline-variant pt-1.5 italic font-sans">{msg.subtext}</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md bg-surface-container-highest border border-transparent p-3 text-on-surface-variant">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce [animation-delay:0.2s]">●</span>
                        <span className="animate-bounce [animation-delay:0.4s]">●</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Questions to ask:</span>
              <div className="flex flex-wrap gap-2">
                {QUERIES.map((q, idx) => (
                  <button type="button"
                    key={idx}
                    onClick={() => handleAsk(idx)}
                    disabled={isTyping}
                    className={`rounded-lg border text-left p-3 text-xs md:text-sm font-medium transition-all ${
                      lastQueryIdx === idx
                        ? "border-primary bg-primary-container text-on-primary-container"
                        : "border-outline-variant bg-surface-container hover:bg-on-surface/8 text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {q.q}
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
              <span className="font-mono text-[9px] uppercase font-bold text-muted-foreground tracking-wider block border-b border-border pb-1.5">Things that happen to firms</span>

              <div className="space-y-3">
                {/* Event 1 */}
                <div className="border border-border rounded-xl p-4 bg-foreground/[0.02] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">1. PARTNER DEPARTURE</span>
                    <span className={`text-[9px] border px-1.5 rounded font-bold ${resigned ? "border-transparent text-on-error-container bg-error-container" : "border-border text-muted-foreground"}`}>
                      {resigned ? "GONE" : "IN THE VAULT"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[11px] font-sans leading-normal">
                    The problem Heirloom exists for. If the partner's notes lived in their own assistant, they walk out with the partner. Ask the questions again and see what the firm can no longer answer.
                  </p>
                  <button type="button"
                    onClick={() => {
                      setResigned(!resigned);
                      if (!resigned && selectedFile?.creator.toLowerCase().includes("partner")) setSelectedFile(MEMORIES[0]);
                    }}
                    aria-pressed={resigned}
                    disabled={isTyping}
                    className={`w-full p-2.5 rounded-lg border font-bold transition-colors ${
                      resigned
                        ? "border-transparent bg-error-container text-on-error-container"
                        : "border-outline bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80"
                    }`}
                  >
                    {resigned ? "Keep them in the firm's vault" : "The partner leaves"}
                  </button>
                </div>

                {/* Event 2 */}
                <div className="border border-outline-variant rounded-lg p-4 bg-surface-container space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">2. FACT SUPERSESSION</span>
                    <span className={`text-[9px] border px-1.5 rounded font-bold ${corrected ? "border-transparent text-on-tertiary-container bg-tertiary-container" : "border-outline-variant text-on-surface-variant"}`}>
                      {corrected ? "UPDATED" : "INACTIVE"}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans leading-normal">
                    A later standup clears the security review. The new record replaces the delay note, and the old one stays on file.
                  </p>
                  <button type="button"
                    onClick={() => setCorrected(!corrected)}
                    aria-pressed={corrected}
                    disabled={isTyping}
                    className={`w-full p-2.5 rounded-lg border font-bold transition-colors ${
                      corrected
                        ? "border-transparent bg-tertiary-container text-on-tertiary-container"
                        : "border-outline bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80"
                    }`}
                  >
                    {corrected ? "Restore Old Fact State" : "Simulate Fact Correction"}
                  </button>
                </div>
              </div>
            </div>

            {/* Open Export JSON */}
            <div className="border border-outline-variant rounded-lg p-4 bg-surface-container flex flex-col">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-3">
                <span className="font-bold text-foreground">3. OPEN MEMORY EXPORT</span>
                <span className="text-[9px] uppercase border border-transparent text-on-tertiary-container bg-tertiary-container px-2 py-0.5 rounded font-bold">
                  heirloom-sample/v1
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] font-sans leading-normal mb-3">
                Everything the firm knows, as one documented JSON file it can take to any tool.
              </p>
              <div className="flex-1 bg-surface-container-highest border border-outline-variant rounded-lg p-2.5 overflow-auto max-h-[200px] text-[10px] text-on-surface-variant font-mono scrollbar-thin">
                <pre>{getExportJSON()}</pre>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={downloadExport}
                className="flex min-h-[44px] items-center justify-center gap-2 border border-outline bg-primary px-3 py-2 text-on-primary font-bold transition-colors">
                <Download className="h-4 w-4" /> Download JSON
              </button>
              <button type="button" onClick={copyExport}
                className="mt-3 flex items-center justify-center gap-2 p-2.5 border border-outline bg-surface-container-low text-on-surface hover:bg-on-surface/8 rounded-lg font-bold transition-colors"
              >
                <FileCode className="h-4 w-4" /> Copy JSON
              </button>
              </div>
              <p className="mt-2 min-h-5 text-xs text-muted-foreground" role="status" aria-live="polite">{exportStatus}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
