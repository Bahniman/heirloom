import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Institutional Memory", definition: "Decisions, their reasons, client quirks, lessons from wins and losses — the collective knowledge that makes a firm a firm." },
  { word: "Context lock-in", definition: "An organization's context can become difficult to move when it is tied to one provider's tools or storage." },
  { word: "Role-scoped recall", definition: "A proposed system could use a person's role to filter which sample records are available to a query." },
  { word: "Provenance", definition: "A record can include a source, owner, and date so readers can inspect where a statement came from." },
  { word: "Supersession", definition: "A correction can be stored as a newer record while keeping the earlier sample available for reference." },
  { word: "Open export format", definition: "A documented JSON export can make it easier to move records, if another system can import the same fields." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="heirloom-jargon-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-on-surface-variant" /> : <ChevronDown className="h-4 w-4 text-on-surface-variant" />}
      </button>

      <div id="heirloom-jargon-panel" hidden={!isOpen}>
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
      </div>
    </div>
  );
}
