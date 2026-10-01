import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  Menu,
  MessageSquareText,
  Network,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IntelliX | Your AI Operations Copilot" },
      { name: "description", content: "Automate everyday operations, reduce workload, and make smarter business decisions with IntelliX." },
      { property: "og:title", content: "IntelliX | Your AI Operations Copilot" },
      { property: "og:description", content: "An affordable AI Operations Copilot for growing service businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntelliXPage,
});

const navItems = [
  ["Home", "home"],
  ["How It Works", "how-it-works"],
  ["Features", "features"],
  ["Benefits", "benefits"],
  ["About", "about"],
] as const;

const features = [
  { icon: Workflow, title: "Automated Workflows", text: "Turn repeatable processes into reliable, intelligent automations." },
  { icon: MessageSquareText, title: "Customer Follow-ups", text: "Keep every conversation moving with timely, personalized outreach." },
  { icon: CalendarDays, title: "Smart Scheduling", text: "Coordinate appointments and priorities without the back-and-forth." },
  { icon: FileText, title: "Document Management", text: "Create, organize, and find essential business documents instantly." },
  { icon: BarChart3, title: "Business Reporting", text: "See clear operational performance without manual spreadsheets." },
  { icon: Sparkles, title: "AI-Powered Insights", text: "Surface useful patterns and next steps from everyday business activity." },
];

function Logo() {
  return <a href="#home" className="flex items-center gap-2.5" aria-label="IntelliX home"><span className="logo-mark"><Sparkles aria-hidden="true" /></span><span className="font-display text-xl font-semibold text-foreground">Intelli<span className="text-primary-bright">X</span></span></a>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <div className="page-shell flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
        </nav>
        <div className="hidden lg:block"><Button asChild variant="luminous"><a href="#contact">Book a Demo <ArrowRight /></a></Button></div>
        <Button className="lg:hidden" variant="glass" size="icon" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<Button asChild variant="luminous"><a href="#contact" onClick={() => setOpen(false)}>Book a Demo</a></Button></nav>}
    </header>
  );
}

function MiniBars() {
  return <div className="flex h-16 items-end gap-1.5" aria-label="Productivity trending upward">{[35, 52, 43, 67, 58, 82, 73, 95].map((h, i) => <span key={i} className="metric-bar" style={{ height: `${h}%` }} />)}</div>;
}

function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "dashboard dashboard-compact" : "dashboard"}>
      <div className="dashboard-top"><div className="flex items-center gap-2"><span className="dash-logo"><Sparkles /></span><b>IntelliX</b><span className="status-pill"><span /> AI online</span></div><div className="avatar">AK</div></div>
      <div className="dashboard-body">
        <aside className="dash-sidebar"><span className="active"><BarChart3 /> Overview</span><span><Check /> Tasks</span><span><Users /> Customers</span><span><CalendarDays /> Calendar</span><span><FileText /> Documents</span><span><Sparkles /> AI Insights</span></aside>
        <div className="dash-main">
          <div className="dash-welcome"><div><span className="eyebrow">MONDAY, OCTOBER 1</span><h3>Good morning, Alex.</h3><p>Here’s what IntelliX is handling today.</p></div><Button variant="glass" size="sm"><Sparkles /> Ask IntelliX</Button></div>
          <div className="stat-grid"><DashStat label="Tasks automated" value="24" note="8 completed today"/><DashStat label="Follow-ups queued" value="12" note="Ready to send"/><DashStat label="Time reclaimed" value="6.4h" note="This week"/></div>
          <div className="dash-lower">
            <div className="dash-panel"><div className="panel-title"><span>Live operations</span><span className="text-success">● Active</span></div>{["Send service reminders", "Organize new documents", "Prepare weekly report"].map((item, i) => <div className="task-row" key={item}><span className="task-icon"><Check /></span><div><b>{item}</b><small>{i === 0 ? "12 customers" : i === 1 ? "4 files" : "Due Friday"}</small></div><span className="tag">{i === 2 ? "Scheduled" : "Done"}</span></div>)}</div>
            <div className="dash-panel insight-panel"><div className="panel-title"><span>Productivity</span><TrendingUp /></div><div className="big-metric">+28%</div><small>vs. last month</small><MiniBars /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashStat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="stat-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "mx-auto text-center" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function DynamicIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon />;
}

function IntelliXPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <section id="home" className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <div className="signal-pill"><span className="signal-dot" /> AI operations, reimagined</div>
            <h1>Your AI<br /><span className="gradient-text">Operations Copilot</span></h1>
            <p>Automate everyday operations, reduce workload, and make smarter business decisions with IntelliX.</p>
            <div className="flex flex-wrap gap-3"><Button asChild variant="luminous" size="lg"><a href="#contact">Book a Demo <ArrowRight /></a></Button><Button asChild variant="glass" size="lg"><a href="#about">Explore IntelliX <ChevronRight /></a></Button></div>
            <div className="hero-proof"><div className="proof-icons"><span><Workflow /></span><span><Clock3 /></span><span><TrendingUp /></span></div><div><b>Automate. Simplify. Grow.</b><small>Built for the way modern service businesses work.</small></div></div>
          </div>
          <div className="hero-visual"><div className="glow-node node-a"/><div className="glow-node node-b"/><div className="connection-line line-a"/><div className="connection-line line-b"/><Dashboard /></div>
        </div>
        <div className="hero-tagline">Intelligence Beyond Limits.<span /></div>
      </section>

      <section id="about" className="section-band problem-section"><div className="page-shell"><Reveal><SectionHeading eyebrow="THE OPERATIONAL GAP" title="Running a business shouldn’t mean doing everything manually." text="Disconnected tools and repetitive workflows quietly consume the time your business needs to move forward." centered /></Reveal><div className="problem-grid">{[
        [Clock3, "Repetitive Tasks", "Routine admin steals focus from customers and growth."],
        [MessageSquareText, "Customer Follow-ups", "Important conversations slip through disconnected systems."],
        [CalendarDays, "Scheduling", "Coordination creates unnecessary friction for your team."],
        [FileText, "Reports & Documents", "Manual paperwork makes insights slow and hard to find."],
      ].map(([Icon, title, text], i) => <Reveal className="problem-card" key={String(title)}><div className="card-number">0{i + 1}</div><span className="feature-icon"><DynamicIcon icon={Icon as LucideIcon} /></span><h3>{String(title)}</h3><p>{String(text)}</p></Reveal>)}</div></div></section>

      <section className="section-band solution-section"><div className="page-shell"><Reveal><SectionHeading eyebrow="ONE INTELLIGENT SYSTEM" title="Meet IntelliX" text="An affordable AI Operations Copilot designed to simplify everyday business operations." centered /></Reveal><Reveal className="solution-stage"><div className="workflow-strip">{[[Check,"Task"],[Bot,"IntelliX AI"],[Zap,"Automated Action"],[TrendingUp,"Business Insight"]].map(([Icon,label],i) => <div className="contents" key={String(label)}><div className={`workflow-node ${i === 1 ? "workflow-core" : ""}`}><span><DynamicIcon icon={Icon as LucideIcon} /></span><b>{String(label)}</b></div>{i < 3 && <div className="workflow-link"><span /></div>}</div>)}</div><Dashboard compact /></Reveal></div></section>

      <section id="features" className="section-band features-section"><div className="page-shell"><Reveal><SectionHeading eyebrow="CAPABILITIES" title="One copilot. Every operation." text="IntelliX keeps the moving parts of your business connected, clear, and under control." /></Reveal><div className="feature-grid">{features.map(({icon: Icon,title,text}) => <Reveal className="feature-card" key={title}><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><ArrowRight /></span></Reveal>)}</div></div></section>

      <section id="benefits" className="section-band benefits-section"><div className="page-shell benefits-layout"><Reveal><SectionHeading eyebrow="THE INTELLIX ADVANTAGE" title="Work Smarter. Grow Faster." text="Give your business more capacity without adding more operational complexity." /><div className="benefit-copy"><span><Check /> Designed for everyday business workflows</span><span><Check /> Clear, useful assistance—not more software noise</span><span><Check /> Human control at every important step</span></div></Reveal><div className="benefit-grid">{[[Clock3,"01","Save Time"],[Zap,"02","Reduce Workload"],[TrendingUp,"03","Improve Productivity"],[Sparkles,"04","Make Smarter Decisions"]].map(([Icon,num,label]) => <Reveal className="benefit-card" key={String(label)}><span className="benefit-index">{String(num)}</span><DynamicIcon icon={Icon as LucideIcon} /><h3>{String(label)}</h3></Reveal>)}</div></div></section>

      <section id="how-it-works" className="section-band process-section"><div className="page-shell"><Reveal><SectionHeading eyebrow="FROM BUSYWORK TO MOMENTUM" title="Simple to start. Powerful in motion." centered /></Reveal><div className="process-grid">{[[Network,"01","Connect","Connect your everyday business workflows."],[Workflow,"02","Automate","Let IntelliX handle repetitive operational tasks."],[TrendingUp,"03","Grow","Focus your time on customers, decisions and business growth."]].map(([Icon,num,title,text],i) => <Reveal className="process-step" key={String(num)}><span className="step-number">{String(num)}</span><span className="process-icon"><DynamicIcon icon={Icon as LucideIcon} /></span><h3>{String(title)}</h3><p>{String(text)}</p>{i < 2 && <div className="process-connector"><span /></div>}</Reveal>)}</div></div></section>

      <section className="section-band showcase-section"><div className="page-shell"><Reveal><SectionHeading eyebrow="YOUR COMMAND CENTER" title="Everything your business needs. In one intelligent workspace." text="A concept view of how IntelliX brings tasks, customers, schedules, documents, reports and guidance into one focused experience." centered /></Reveal><Reveal className="showcase-wrap"><div className="showcase-tabs">{[[Check,"Tasks"],[Users,"Customers"],[CalendarDays,"Calendar"],[FileText,"Documents"],[BarChart3,"Reports"],[Sparkles,"AI Insights"]].map(([Icon,label],i) => <span className={i === 0 ? "active" : ""} key={String(label)}><DynamicIcon icon={Icon as LucideIcon} />{String(label)}</span>)}</div><Dashboard /></Reveal></div></section>

      <section id="contact" className="cta-section"><div className="cta-grid-bg"/><div className="page-shell relative"><Reveal className="cta-content"><span className="cta-icon"><Sparkles /></span><h2>Ready to simplify<br />your business?</h2><p>Let IntelliX automate the work behind your growth.</p><Button asChild variant="luminous" size="lg"><a href="mailto:hello@intellix.ai?subject=Book%20an%20IntelliX%20Demo">Book a Demo <ArrowRight /></a></Button></Reveal></div></section>

      <footer><div className="page-shell footer-grid"><div><Logo /><p>Intelligence Beyond Limits.</p></div><nav aria-label="Footer navigation">{[["Home","home"],["Features","features"],["How It Works","how-it-works"],["Contact","contact"]].map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="footer-signoff">Automate. Simplify. Grow.</div></div><div className="page-shell footer-bottom"><span>© 2026 IntelliX. All rights reserved.</span><span>AI Operations Copilot</span></div></footer>
    </main>
  );
}