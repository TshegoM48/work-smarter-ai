import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { callAi } from "@/lib/ai-client";
import { AiOutput } from "@/components/AiOutput";
import { ToolShell } from "@/components/ToolShell";

const SAMPLE = `John Doe
Software Engineer
Email: john@example.com

Experience:
- Worked at Acme Corp as a developer for 3 years.
- Built websites using React.
- Helped team ship features.

Skills: JavaScript, React, HTML, CSS

Education: BS Computer Science, State University, 2020`;

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "AI Resume Optimizer — CareerBoost AI" },
      { name: "description", content: "Improve your resume with AI. Get ATS keywords and a rewritten, recruiter-ready version." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const [resume, setResume] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!resume.trim()) return toast.error("Paste your resume first.");
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi("resume", resume));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      icon={FileText}
      title="AI Resume Optimizer"
      subtitle="Paste your resume — get ATS-friendly rewrites, keyword suggestions, and a side-by-side comparison."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <Label htmlFor="resume" className="text-sm font-semibold">Your Resume</Label>
            <Button size="sm" variant="ghost" onClick={() => setResume(SAMPLE)} className="text-xs">
              Load sample
            </Button>
          </div>
          <Textarea
            id="resume"
            rows={20}
            placeholder="Paste your resume text here…"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="font-mono text-xs"
          />
          <Button onClick={run} disabled={loading} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Analyzing…" : "Optimize resume"}
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Improved version</p>
          <AiOutput text={output} loading={loading} />
          {!output && !loading && (
            <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              Your optimized resume, ATS keywords, and improvement notes will appear here.
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
