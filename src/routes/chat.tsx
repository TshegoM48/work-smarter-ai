import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { ChatAssistant } from "@/components/ChatAssistant";
import { ToolShell } from "@/components/ToolShell";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Career Chatbot — CareerBoost AI" },
      { name: "description", content: "Chat with an AI career coach for personalized advice on resumes, interviews, and career growth." },
    ],
  }),
  component: () => (
    <ToolShell icon={Bot} title="AI Career Chatbot" subtitle="Ask anything about resumes, interviews, skills, salary, and career growth.">
      <ChatAssistant />
    </ToolShell>
  ),
});
