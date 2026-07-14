import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  FileSignature,
  MessagesSquare,
  Mail,
  Bot,
  Rocket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerBoost AI — Land Your Next Job Faster" },
      { name: "description", content: "AI-powered toolkit for job seekers: resume optimizer, cover letter generator, interview prep, email drafts, and a career chatbot." },
      { property: "og:title", content: "CareerBoost AI" },
      { property: "og:description", content: "AI toolkit that helps job seekers get hired." },
    ],
  }),
  component: Home,
});

type Tool = {
  title: string;
  desc: string;
  url: "/resume" | "/cover-letter" | "/interview" | "/email" | "/chat";
  icon: LucideIcon;
  accent: string;
};

const tools: Tool[] = [
  { title: "Resume Optimizer", desc: "ATS-friendly rewrites with keyword suggestions.", url: "/resume", icon: FileText, accent: "from-blue-500/15 to-blue-500/0" },
  { title: "Cover Letter Generator", desc: "Personalized letters tailored to any role.", url: "/cover-letter", icon: FileSignature, accent: "from-indigo-500/15 to-indigo-500/0" },
  { title: "Interview Prep", desc: "Likely questions with sample answers & tips.", url: "/interview", icon: MessagesSquare, accent: "from-sky-500/15 to-sky-500/0" },
  { title: "Email Generator", desc: "Applications, follow-ups, thank-you & networking.", url: "/email", icon: Mail, accent: "from-cyan-500/15 to-cyan-500/0" },
  { title: "Career Chatbot", desc: "24/7 AI coach for any career question.", url: "/chat", icon: Bot, accent: "from-blue-600/15 to-blue-600/0" },
];

function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="relative overflow-hidden rounded-2xl border bg-hero-gradient p-8 sm:p-12 shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" /> AI-powered · Job seeker toolkit
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Land your next job,
            <br />
            <span className="text-primary">faster</span> with AI.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            CareerBoost AI helps you polish your resume, write standout cover letters,
            ace interviews, and craft the perfect email — all from one dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              <Rocket className="h-4 w-4" /> Optimize my resume
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold transition hover:bg-accent"
            >
              <Bot className="h-4 w-4" /> Ask the coach
            </Link>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Responsible AI · Review outputs before submitting
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Your toolkit</h2>
            <p className="text-sm text-muted-foreground">Five AI tools designed for every step of the job search.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.url}
              className={`group relative overflow-hidden rounded-xl border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.accent} opacity-60 transition group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Open <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Responsible AI commitment</p>
            <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
              <li>All AI outputs are drafts — review, edit, and personalize before use.</li>
              <li>Generated content may contain inaccuracies. Verify facts, names, and numbers.</li>
              <li>We never fabricate metrics, employers, or dates you didn't provide.</li>
              <li>Your inputs are sent to an AI model to generate outputs and are not stored on our servers.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
