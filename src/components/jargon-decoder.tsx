import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Institutional Memory", definition: "Decisions, their reasons, client quirks, lessons from wins and losses: the collective knowledge that makes a firm a firm." },
  { word: "Context lock-in", definition: "When a firm's knowledge lives inside one vendor's assistant, leaving that vendor means leaving the knowledge behind." },
  { word: "Role-scoped recall", definition: "The assistant only searches what your role is allowed to see. An analyst never gets the partner-only pricing, even by accident." },
  { word: "Provenance", definition: "Every record carries who wrote it, where and when, so an answer can always point back to the meeting it came from." },
  { word: "Supersession", definition: "A correction is stored as a new record that replaces the old one, and the old one stays on file so the history is visible." },
  { word: "Open export format", definition: "One click gives the firm all of its records as a documented JSON file it can take anywhere." },
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
          The words, in plain English
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
