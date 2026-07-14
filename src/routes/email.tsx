import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { callAi } from "@/lib/ai-client";
import { AiOutput } from "@/components/AiOutput";
import { ToolShell } from "@/components/ToolShell";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Professional Email Generator — CareerBoost AI" },
      { name: "description", content: "Generate job application, follow-up, thank-you, and networking emails." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [emailType, setEmailType] = useState("Job Application");
  const [tone, setTone] = useState("Formal");
  const [subject, setSubject] = useState("");
  const [brief, setBrief] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!brief.trim()) return toast.error("Describe what the email should say.");
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi("email", brief, { emailType, tone, subject, audience: "recipient" }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      icon={Mail}
      title="Professional Email Generator"
      subtitle="Draft job applications, follow-ups, thank-you notes, and networking emails."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-soft">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Email type</Label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Job Application">Job Application</SelectItem>
                  <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                  <SelectItem value="Thank You">Thank You</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sub">Subject / topic (optional)</Label>
            <Input id="sub" placeholder="Application for PM role" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brief">Context & key points</Label>
            <Textarea
              id="brief"
              rows={7}
              placeholder="Applying to Acme's PM role. Referred by Jane Doe. 5 years B2B SaaS PM experience. Want to schedule a chat next week."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
        </div>

        <div className="min-h-[300px]">
          <AiOutput text={output} loading={loading} />
          {!output && !loading && (
            <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              Your generated email will appear here.
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
