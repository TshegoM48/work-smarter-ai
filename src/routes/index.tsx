import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailGenerator } from "@/components/EmailGenerator";
import { MeetingSummarizer } from "@/components/MeetingSummarizer";
import { TaskPlanner } from "@/components/TaskPlanner";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Toaster } from "@/components/ui/sonner";
import { Mail, FileText, CalendarClock, MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlowMate — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate emails, meeting summaries, task planning, and workplace Q&A with a single AI assistant designed for professionals.",
      },
      { property: "og:title", content: "FlowMate — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Generate emails, summarize meetings, plan your day, and chat with an AI workplace assistant.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">FlowMate</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-soft sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Responsible AI · No data stored
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Automate the busywork.
            <br />
            <span className="text-brand">Focus on the real work.</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            FlowMate is your AI workplace assistant — draft emails, summarize meetings, plan your day,
            and get instant answers, all in one place.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16">
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="email" className="gap-2 py-2.5">
              <Mail className="h-4 w-4" /> <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-2 py-2.5">
              <FileText className="h-4 w-4" /> <span className="hidden sm:inline">Summarizer</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2 py-2.5">
              <CalendarClock className="h-4 w-4" /> <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2 py-2.5">
              <MessageSquare className="h-4 w-4" /> <span className="hidden sm:inline">Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-6"><EmailGenerator /></TabsContent>
          <TabsContent value="summary" className="mt-6"><MeetingSummarizer /></TabsContent>
          <TabsContent value="plan" className="mt-6"><TaskPlanner /></TabsContent>
          <TabsContent value="chat" className="mt-6"><ChatAssistant /></TabsContent>
        </Tabs>

        <footer className="mt-16 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            Built with responsible AI practices: outputs are drafts — review before sending. FlowMate never
            fabricates names, dates, or figures you didn't provide.
          </p>
        </footer>
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}
