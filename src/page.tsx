import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlowCard } from "@/components/glow-card";
import { RoleQuerySimulator } from "@/components/role-query-simulator";
import { EventSimulator } from "@/components/event-simulator";
import { JargonDecoder } from "@/components/jargon-decoder";
import {
  FileText,
  Shield,
  ArrowRight,
  Database,
  Briefcase,
  AlertTriangle,
  Award,
  Zap,
  Github,
  BookOpen
} from "lucide-react";

export default function LandingPage() {
  const stats = [
    { num: "$47M / yr", desc: "lost by the average large US business to inefficient knowledge sharing (Panopto, n=1,001)" },
    { num: "42%", desc: "of institutional knowledge is unique to ONE person — no second copy exists when they leave" },
    { num: "$31.5B / yr", desc: "lost collectively by Fortune 500 firms from knowledge-sharing failure (IDC)" },
    { num: "5.3 hrs / wk", desc: "each knowledge worker wastes waiting for or recreating knowledge that already exists" }
  ];

  return (
    <div className="relative min-h-screen bg-transparent grid-bg">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="animate-blob-1 absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-blob-emerald blur-[120px]" />
        <div className="animate-blob-2 absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blob-indigo blur-[100px]" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
            <a href="#" className="flex items-center gap-2.5">
              <span className="text-base font-semibold tracking-tight text-foreground font-sans">
                Heirloom
              </span>
            </a>
            <nav className="flex items-center gap-3">
              <a
                href="https://bahniman.github.io"
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                ← Back to Portal
              </a>
              <a
                href="https://github.com/Bahniman/heirloom"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-16">
          
          {/* Hero Section */}
          <section className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent tracking-wide uppercase">
              <Award className="h-3.5 w-3.5" /> Startup Lab · Knowledge Asset Protection
            </div>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08] bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              The firm's memory,<br />owned by the firm.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[760px]">
              Knowledge firms run on institutional memory — why we priced it that way, what the client hates, what we learned losing that pitch. Today, that memory walks out the door with every exit, or gets locked into third-party AI silos. Heirloom is the neutral memory layer: secure, role-scoped, and completely portable.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-accent text-accent-foreground px-5 py-3 text-sm font-bold shadow-[0_4px_20px_rgba(237,255,0,0.15)] hover:brightness-110"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/heirloom"
                target="_blank"
                rel="noreferrer"
                className="btn-press inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.02] px-5 py-3 text-sm font-bold text-foreground hover:bg-foreground/5"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-5 shadow-sm">
                <span className="font-sans text-2xl font-extrabold text-accent text-neon-accent">{s.num}</span>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </section>

          {/* Detailed Problem Statement */}
          <section className="rounded-2xl border border-accent/20 bg-accent/[0.02] border-l-4 border-l-accent p-6 space-y-4">
            <h3 className="font-sans text-md font-bold text-accent uppercase tracking-wider inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> The Business Risk of Vendor Lock-In
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              When you feed your company data into generic corporate assistants, you create a double write-off. If a partner leaves, their reasoning evaporates. If you switch AI vendors, you lose the entire context the assistant built. 
              <br /><br />
              Heirloom implements a neutral, portable memory schema. <strong>Satya Nadella</strong> has highlighted this exact challenge, urging enterprises to build systems that retain institutional knowledge while remaining free to swap underlying models (<a href="https://www.edtechinnovationhub.com/news/microsoft-ceo-satya-nadella-says-companies-must-own-the-ai-learning-loops-shaping-their-future" target="_blank" rel="noreferrer" className="text-accent underline font-semibold">Nadella on Learning Loops</a>).
            </p>
          </section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-24 space-y-8">
            <div className="space-y-2">
              <h2 className="font-sans text-2xl font-bold text-foreground">Interactive Rehearsal Room</h2>
              <p className="text-sm text-muted-foreground">Interact with role-scoped retrieval controls and simulate critical memory events.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <RoleQuerySimulator />
              <EventSimulator />
            </div>
          </section>

          {/* Architecture Details */}
          <section className="space-y-6">
            <h2 className="font-sans text-2xl font-bold text-foreground">Core Architecture</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <Database className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">1. Access Guard</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cryptographically scopes and verifies credentials before query evaluation. Role filters run at the query-token level, never surfacing unauthorized indices.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <Shield className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">2. Provenance Chain</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Attaches signed metadata certificates to every document node. Any response served by the model displays direct links to original meeting transcripts or files.
                </p>
              </GlowCard>
              <GlowCard className="space-y-3" showTechBrackets={true}>
                <Briefcase className="h-6 w-6 text-accent" />
                <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">3. Open Portability</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Stores knowledge in a neutral schemas specification. Easily export the database into standard format packages to swap LLMs without context loss.
                </p>
              </GlowCard>
            </div>
          </section>

          {/* Business Model */}
          <section className="grid gap-6 md:grid-cols-2">
            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Why Enterprises Buy</h3>
              <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Exit Insurance:</strong> Departures do not wipe out history; reasoning remains queryable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Ramp Compression:</strong> Scoped memory makes new hires productive in weeks instead of months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 shrink-0 text-accent" />
                  <span><strong>Moat Moat:</strong> Secure, indexed corporate intelligence stays in-house, not inside vendor weights.</span>
                </li>
              </ul>
            </GlowCard>

            <GlowCard className="space-y-4" showTechBrackets={true}>
              <h3 className="font-sans text-lg font-bold text-foreground">Revenue & Wedge</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Per-seat subscription models combined with ingestion migration services. Our primary wedge focuses on high-turnover consulting firms, legal agencies, and professional services where knowledge is inventory and attrition is a direct write-off.
              </p>
            </GlowCard>
          </section>

          {/* Jargon and Sources */}
          <section className="space-y-6">
            <JargonDecoder />

            <div className="rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground space-y-3">
              <h4 className="font-bold text-foreground">Source Material & Scientific References:</h4>
              <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                <li>Panopto / YouGov Knowledge Sharing Survey (n=1,001) – <a href="https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/" target="_blank" rel="noreferrer" className="text-accent hover:underline">Panopto Press Release</a>.</li>
                <li>IDC Fortune 500 Knowledge Lockup Report – <a href="https://blog.nuclino.com/not-sharing-knowledge-costs-fortune-500-companies-31-5-billion-a-year" target="_blank" rel="noreferrer" className="text-accent hover:underline">IDC via Nuclino Blog</a>.</li>
                <li>HR Dive Enterprise Knowledge Capture Metrics – <a href="https://www.hrdive.com/news/inefficient-knowledge-sharing-costs-large-us-businesses-47m-a-year/527892/" target="_blank" rel="noreferrer" className="text-accent hover:underline">HR Dive News Coverage</a>.</li>
              </ol>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/20">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-xs text-muted-foreground leading-normal">
            Heirloom · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-accent hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
