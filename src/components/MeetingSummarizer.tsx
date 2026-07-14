import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutput } from "./AiOutput";
import { callAi } from "@/lib/ai-client";
import { toast } from "sonner";
import { FileText, Sparkles } from "lucide-react";

const SAMPLE = `Attendees: Priya (PM), Marcus (Eng), Lin (Design), Jordan (QA)
- Priya opened by sharing the launch is slipping ~1 week due to auth bug
- Marcus: will patch by Friday; needs Lin's updated error states by Wed
- Lin: can deliver Tue EOD if she skips onboarding polish
- Jordan flagged: mobile Safari regression on login; owner: Marcus
- Decision: cut onboarding polish from v1, ship in v1.1
- Next check-in: Thursday 10am`;

export function MeetingSummarizer() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!notes.trim()) return toast.error("Paste some notes first.");
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi("summarize", notes));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-semibold">Meeting Notes Summarizer</h2>
        </div>

        <Textarea
          rows={16}
          placeholder="Paste raw notes or a transcript here…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex gap-2">
          <Button onClick={run} disabled={loading} className="flex-1">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Summarizing…" : "Summarize"}
          </Button>
          <Button variant="outline" onClick={() => setNotes(SAMPLE)}>
            Try sample
          </Button>
        </div>
      </div>

      <div className="min-h-[300px]">
        <AiOutput text={output} loading={loading} />
        {!output && !loading && (
          <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Summary, decisions, and action items will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
