import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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
  Github,
  Clock
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function CountUpStat({ text }: { text: string }) {
  const match = text.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return <>{text}</>;
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
  const { val, ref } = useCountUp(target);
  const shown =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function Nav() {
  const links = [
    { label: "Problem", id: "problem" },
    { label: "Demo", id: "demo" },
    { label: "Architecture", id: "architecture" },
    { label: "Business Case", id: "business" },
    { label: "References", id: "references" },
  ];
  const active = useActiveSection(links.map((l) => l.id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary to-secondary"
      />
      <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="text-base font-semibold tracking-tight text-foreground">
              Heirloom
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-foreground/8 ring-1 ring-inset ring-foreground/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://bahniman.github.io"
              className="text-xs sm:text-sm font-medium text-foreground/75 hover:text-foreground transition-colors mr-2"
            >
              ← Back to Portal
            </a>
            <ThemeToggle />
            <a
              href="https://github.com/Bahniman/heirloom"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const stats = [
    { num: "$47M / yr", desc: "lost by the average large US business to inefficient knowledge sharing (Panopto, n=1,001)" },
    { num: "42%", desc: "of institutional knowledge is unique to ONE person — no second copy exists when they leave" },
    { num: "$31.5B / yr", desc: "lost collectively by Fortune 500 firms from knowledge-sharing failure (IDC)" },
    { num: "5.3 hrs / wk", desc: "each knowledge worker wastes waiting for or recreating knowledge that already exists" }
  ];

  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Nav />

      {/* Main Container */}
      <main className="mx-auto max-w-[1440px] px-4 pt-32 pb-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[960px] mx-auto space-y-24">
          
          {/* M3 Hero Section */}
          <section className="relative overflow-hidden pt-8 pb-4 space-y-6 text-left">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-40 right-[-10%] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute -bottom-40 left-[-10%] h-[380px] w-[380px] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            </div>

            <motion.div {...fadeUp} className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-label-lg font-medium text-primary">
                <Award className="h-4 w-4" /> Startup Lab · Knowledge Asset Protection
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="text-[45px] leading-[52px] md:text-[57px] md:leading-[64px] font-normal tracking-tight text-on-surface"
            >
              The firm's memory,<br />owned by the firm.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-title-lg leading-relaxed text-on-surface-variant max-w-[760px]"
            >
              Knowledge firms run on institutional memory — why we priced it that way, what the client hates, what we learned losing that pitch. Today, that memory walks out the door with every exit, or gets locked into third-party AI silos. Heirloom is the neutral memory layer: secure, role-scoped, and completely portable.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary px-6 py-3 text-label-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Try Interactive Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Bahniman/heirloom"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-6 py-3 text-label-lg font-medium text-primary hover:bg-surface-container-low transition-colors"
              >
                <Github className="h-4 w-4" /> View Source Code
              </a>
            </motion.div>
          </section>

          {/* M3 Stats Bar (Outlined Cards) */}
          <section id="problem" className="scroll-mt-28 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                className="rounded-[12px] border border-outline-variant bg-surface p-6 hover:bg-surface-container-low transition-colors"
              >
                <span className="text-headline-md font-medium text-primary">
                  <CountUpStat text={s.num} />
                </span>
                <p className="mt-2 text-body-md text-on-surface-variant leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Detailed Problem Statement (Error Container style for urgency) */}
          <motion.section {...fadeUp} className="rounded-lg bg-error-container p-6 space-y-4">
            <h3 className="text-title-lg font-medium text-on-error-container inline-flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> The Business Risk of Vendor Lock-In
            </h3>
            <p className="text-body-lg text-on-error-container leading-relaxed">
              When you feed your company data into generic corporate assistants, you create a double write-off. If a partner leaves, their reasoning evaporates. If you switch AI vendors, you lose the entire context the assistant built. 
              <br /><br />
              Heirloom implements a neutral, portable memory schema. <strong>Satya Nadella</strong> has highlighted this exact challenge, urging enterprises to build systems that retain institutional knowledge while remaining free to swap underlying models (<a href="https://www.edtechinnovationhub.com/news/microsoft-ceo-satya-nadella-says-companies-must-own-the-ai-learning-loops-shaping-their-future" target="_blank" rel="noreferrer" className="underline font-medium">Nadella on Learning Loops</a>).
            </p>
          </motion.section>

          {/* Interactive Demos Grid */}
          <section id="demo" className="scroll-mt-28 space-y-8 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="space-y-2">
              <h2 className="text-headline-lg font-normal text-on-surface">Interactive Rehearsal Room</h2>
              <p className="text-body-lg text-on-surface-variant">Interact with role-scoped retrieval controls and simulate critical memory events.</p>
            </motion.div>

            <motion.div {...fadeUp} className="w-full">
              <RoleQuerySimulator />
            </motion.div>
          </section>

          {/* Architecture Details (Filled Cards) */}
          <section id="architecture" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.h2 {...fadeUp} className="text-headline-lg font-normal text-on-surface">Core Architecture</motion.h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <Database className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">1. Access Guard</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Cryptographically scopes and verifies credentials before query evaluation. Role filters run at the query-token level, never surfacing unauthorized indices.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <Shield className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">2. Provenance Chain</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Attaches signed metadata certificates to every document node. Any response served by the model displays direct links to original meeting transcripts or files.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
                className="rounded-[16px] bg-surface-container p-6 space-y-4"
              >
                <Briefcase className="h-8 w-8 text-primary" />
                <h4 className="text-title-lg font-medium text-on-surface">3. Open Portability</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Stores knowledge in a neutral schemas specification. Easily export the database into standard format packages to swap LLMs without context loss.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Business Model (Filled Cards) */}
          <section id="business" className="scroll-mt-28 grid gap-6 md:grid-cols-2 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
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
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[16px] bg-surface-container-low p-6 space-y-4">
              <h3 className="text-headline-md font-normal text-on-surface">Revenue & Wedge</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Per-seat subscription models combined with ingestion migration services. Our primary wedge focuses on high-turnover consulting firms, legal agencies, and professional services where knowledge is inventory and attrition is a direct write-off.
              </p>
            </motion.div>
          </section>

          {/* Jargon and Sources */}
          <section id="references" className="scroll-mt-28 space-y-6 pt-8 border-t border-outline-variant">
            <motion.div {...fadeUp}>
              <JargonDecoder />
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[12px] border border-outline-variant bg-surface p-6 text-body-md text-on-surface-variant space-y-4">
              <h4 className="font-medium text-on-surface">Source Material & Scientific References:</h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Panopto / YouGov Knowledge Sharing Survey (n=1,001) – <a href="https://www.panopto.com/company/news/inefficient-knowledge-sharing-costs-large-businesses-47-million-per-year/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Panopto Press Release</a>.</li>
                <li>IDC Fortune 500 Knowledge Lockup Report – <a href="https://blog.nuclino.com/not-sharing-knowledge-costs-fortune-500-companies-31-5-billion-a-year" target="_blank" rel="noreferrer" className="text-primary hover:underline">IDC via Nuclino Blog</a>.</li>
                <li>HR Dive Enterprise Knowledge Capture Metrics – <a href="https://www.hrdive.com/news/inefficient-knowledge-sharing-costs-large-us-businesses-47m-a-year/527892/" target="_blank" rel="noreferrer" className="text-primary hover:underline">HR Dive News Coverage</a>.</li>
              </ol>
            </motion.div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface-container-low py-8">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
          <p className="text-body-md text-on-surface-variant leading-normal">
            Heirloom · Part of the Startup Lab Series · MIT Licensed · <a href="https://github.com/Bahniman" className="text-primary hover:underline">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
