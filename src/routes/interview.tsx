import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessagesSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { callAi } from "@/lib/ai-client";
import { AiOutput } from "@/components/AiOutput";
import { ToolShell } from "@/components/ToolShell";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "AI Interview Prep — CareerBoost AI" },
      { name: "description", content: "Get likely interview questions, sample answers, and tips for any role." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  const [role, setRole] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!role.trim()) return toast.error("Enter a job title.");
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi("interview", role, { jobTitle: role }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      icon={MessagesSquare}
      title="AI Interview Preparation"
      subtitle="Enter a job title — get technical, behavioral, and HR questions with sample answers and tips."
    >
      <div className="space-y-6">
        <div className="rounded-xl border bg-card p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="role">Job title</Label>
              <Input
                id="role"
                placeholder="e.g. Senior Frontend Engineer, Marketing Manager, Data Analyst"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
              />
            </div>
            <Button onClick={run} disabled={loading} className="sm:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Preparing…" : "Prepare me"}
            </Button>
          </div>
        </div>

        <AiOutput text={output} loading={loading} />
        {!output && !loading && (
          <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            Enter a role above to generate a full interview prep guide.
          </div>
        )}
      </div>
    </ToolShell>
  );
}
