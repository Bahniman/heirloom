import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoleQuerySimulator } from "@/components/role-query-simulator";
import { JargonDecoder } from "@/components/jargon-decoder";
import {
  Shield,
  ArrowRight,
  Database,
  Briefcase,
  AlertTriangle,
  Award,
  Zap,
  Github
} from "lucide-react";

export default function LandingPage() {
  const stats = [
    { num: "$47M / yr", desc: "lost by the average large US business to inefficient knowledge sharing (Panopto, n=1,001)" },
    { num: "42%", desc: "of institutional knowledge is unique to ONE person — no second copy exists when they leave" },
    { num: "$31.5B / yr", desc: "lost collectively by Fortune 500 firms from knowledge-sharing failure (IDC)" },
    { num: "5.3 hrs / wk", desc: "each knowledge worker wastes waiting for or recreating knowledge that already exists" }
  ];

  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans">
      
      {/* M3 Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-title-lg font-medium tracking-tight">
                Heirloom
              </span>
            </a>
            <nav className="flex items-center gap-4">
              <a
                href="https://bahniman.github.io"
                className="text-label-lg font-medium hover:text-primary transition-colors"
              >
                ← Back to Portal
              </a>
              <a
                href="https://github.com/Bahniman/heirloom"
                target="_blank"
                rel="noreferrer"
                className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* M3 Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-1.5 text-label-lg font-medium text-primary">
              <Award className="h-4 w-4" /> Startup Lab · Knowledge Asset Protection
            </div>
            <h1 className="text-[45px] leading-[52px] md:text-[57px] md:leading-[64px] font-normal tracking-tight text-on-surface">
              The firm's memory,<br />owned by the firm.
            </h1>
            <p className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]">
              Knowledge firms run on institutional memory — why we priced it that way, what the client hates, what we learned losing that pitch. Today, that memory walks out the door with every exit, or gets locked into third-party AI silos. Heirloom is the neutral memory layer: secure, role-scoped, and completely portable.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-label-lg font-medium hover:opacity-90 transition-opacity"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/heirloom"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* M3 Stats Bar (Outlined Cards) */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-[12px] border border-border bg-surface p-6 hover:bg-surface-container-low transition-colors">
                <span className="text-headline-md font-medium text-primary">{s.num}</span>
                <p className="mt-2 text-body-md text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <section className="rounded-lg bg-error-container p-6 space-y-4">
            <h3 className="text-title-lg font-medium text-on-error-container inline-flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> The Business Risk of Vendor Lock-In
            </h3>
            <p className="text-body-lg text-on-error-container leading-relaxed">
              When you feed your company data into generic corporate assistants, you create a double write-off. If a partner leaves, their reasoning evaporates. If you switch AI vendors, you lose the entire context the assistant built. 
              <br /><br />
              Heirloom implements a neutral, portable memory schema. <strong>Satya Nadella</strong> has highlighted this exact challenge, urging enterprises to build systems that retain institutional knowledge while remaining free to swap underlying models (<a href="https://www.edtechinnovationhub.com/news/microsoft-ceo-satya-nadella-says-companies-must-own-the-ai-learning-loops-shaping-their-future" target="_blank" rel="noreferrer" className="underline font-medium">Nadella on Learning Loops</a>).
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8 pt-8 border-t border-border">
            <div className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Rehearsal Room</h2>
              <p className="text-body-lg text-on-surface-variant">Interact with role-scoped retrieval controls and simulate critical memory events.</p>
            </div>

            <div className="w-full">
              <RoleQuerySimulator />
            </div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section className="space-y-6 pt-8 border-t border-border">
            <h2 className="text-headline-lg font-normal text-on-surface">Core Architecture</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <Database className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Access Guard</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Cryptographically scopes and verifies credentials before query evaluation. Role filters run at the query-token level, never surfacing unauthorized indices.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <Shield className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Provenance Chain</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Attaches signed metadata certificates to every document node. Any response served by the model displays direct links to original meeting transcripts or files.
                </p>
              </div>
              <div className="rounded-[16px] bg-surface-container p-6 space-y-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Open Portability</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Stores knowledge in a neutral schemas specification. Easily export the database into standard format packages to swap LLMs without context loss.
                </p>
              </div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section className="grid gap-6 md:grid-cols-2 pt-8 border-t border-border">
            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Why Enterprises Buy</h3>
              <ul className="space-y-4 text-body-md text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Exit Insurance:</strong> Departures do not wipe out history; reasoning remains queryable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Ramp Compression:</strong> Scoped memory makes new hires productive in weeks instead of months.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 shrink-0 text-primary" />
                  <span><strong>Moat Moat:</strong> Secure, indexed corporate intelligence stays in-house, not inside vendor weights.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Revenue & Wedge</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Per-seat subscription models combined with ingestion migration services. Our primary wedge focuses on high-turnover consulting firms, legal agencies, and professional services where knowledge is inventory and attrition is a direct write-off.
              </p>
            </div>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6 pt-8 border-t border-border">
            <JargonDecoder />

            <div className="rounded-[12px] border border-border bg-surface p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & Scientific References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Panopto / YouGov Knowledge Sharing Survey (n=1,001) – <a href="https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Panopto Press Release</a>.</li>
                <li>IDC Fortune 500 Knowledge Lockup Report – <a href="https://blog.nuclino.com/not-sharing-knowledge-costs-fortune-500-companies-31-5-billion-a-year" target="_blank" rel="noreferrer" className="text-primary hover:underline">IDC via Nuclino Blog</a>.</li>
                <li>HR Dive Enterprise Knowledge Capture Metrics – <a href="https://www.hrdive.com/news/inefficient-knowledge-sharing-costs-large-us-businesses-47m-a-year/527892/" target="_blank" rel="noreferrer" className="text-primary hover:underline">HR Dive News Coverage</a>.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Heirloom · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
