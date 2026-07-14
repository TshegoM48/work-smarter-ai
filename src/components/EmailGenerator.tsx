import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { AiOutput } from "./AiOutput";
import { callAi } from "@/lib/ai-client";
import { toast } from "sonner";
import { Mail, Sparkles } from "lucide-react";

export function EmailGenerator() {
  const [subject, setSubject] = useState("");
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState("formal");
  const [audience, setAudience] = useState("client");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!brief.trim()) return toast.error("Please describe what the email should say.");
    setLoading(true);
    setOutput("");
    try {
      const text = await callAi("email", brief, { tone, audience, subject });
      setOutput(text);
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
          <Mail className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-semibold">Smart Email Generator</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject / topic (optional)</Label>
          <Input
            id="subject"
            placeholder="Follow-up on Q3 proposal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="informal">Informal</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brief">What should the email say?</Label>
          <Textarea
            id="brief"
            rows={7}
            placeholder="Thank the client for last week's meeting, confirm the revised timeline (delivery by Nov 20), and ask them to review the attached SOW by Friday."
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
          />
        </div>

        <Button onClick={generate} disabled={loading} className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Generating…" : "Generate email"}
        </Button>
      </div>

      <div className="min-h-[300px]">
        <AiOutput text={output} loading={loading} />
        {!output && !loading && (
          <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Your generated email will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
