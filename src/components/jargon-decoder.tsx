import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Institutional Memory", definition: "Decisions, their reasons, client quirks, lessons from wins and losses — the collective knowledge that makes a firm a firm." },
  { word: "Context Lock-in", definition: "The new vendor trap: your AI tools have learned your firm's domain, and none of it can leave with you if you decide to change providers." },
  { word: "Role-scoped Recall", definition: "The intern's AI and the partner's AI get different answers to the exact same question, automatically matching credentials." },
  { word: "Provenance", definition: "Every answer names its source (e.g. 'partner sync, 12 Mar'). An answer without a verifiable source is considered a rumor." },
  { word: "Supersession", definition: "Corrections replace old memories in future query answers, but history stays in the immutable record for future audits." },
  { word: "Open Export Format", definition: "The memory leaves in a documented file format (JSON), so switching LLM vendors is a settings change — not corporate amnesia." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-on-surface-variant" /> : <ChevronDown className="h-4 w-4 text-on-surface-variant" />}
      </button>

      {isOpen && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-on-surface/4">
                <th className="p-3 font-semibold text-foreground">Term</th>
                <th className="p-3 font-semibold text-foreground">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {TERMS.map((term, idx) => (
                <tr key={idx} className="hover:bg-on-surface/4">
                  <td className="p-3 font-semibold text-primary whitespace-nowrap">{term.word}</td>
                  <td className="p-3 text-on-surface-variant leading-relaxed">{term.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
