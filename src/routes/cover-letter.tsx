import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileSignature, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { callAi } from "@/lib/ai-client";
import { AiOutput } from "@/components/AiOutput";
import { ToolShell } from "@/components/ToolShell";

export const Route = createFileRoute("/cover-letter")({
  head: () => ({
    meta: [
      { title: "AI Cover Letter Generator — CareerBoost AI" },
      { name: "description", content: "Generate personalized, professional cover letters in seconds with AI." },
    ],
  }),
  component: CoverLetterPage,
});

function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [background, setBackground] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!jobTitle.trim() || !company.trim()) return toast.error("Enter job title and company.");
    setLoading(true);
    setOutput("");
    try {
      const brief = `Candidate background/highlights:\n${background || "(not provided — use placeholders)"}`;
      setOutput(await callAi("cover-letter", brief, { jobTitle, company, jobDescription }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${company || "draft"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      icon={FileSignature}
      title="AI Cover Letter Generator"
      subtitle="Enter the role details — get a tailored, ready-to-send cover letter."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-soft">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jt">Job title</Label>
              <Input id="jt" placeholder="Product Manager" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="co">Company</Label>
              <Input id="co" placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jd">Job description (optional)</Label>
            <Textarea id="jd" rows={5} placeholder="Paste the job posting…" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bg">Your background & top achievements</Label>
            <Textarea id="bg" rows={5} placeholder="5 years in B2B SaaS PM, launched X that grew MRR by 40%…" value={background} onChange={(e) => setBackground(e.target.value)} />
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Generating…" : "Generate cover letter"}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover letter</p>
            {output && (
              <Button size="sm" variant="outline" onClick={download}>
                <Download className="mr-2 h-3.5 w-3.5" /> Download
              </Button>
            )}
          </div>
          <AiOutput text={output} loading={loading} />
          {!output && !loading && (
            <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              Your personalized cover letter will appear here.
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
