import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutput } from "./AiOutput";
import { callAi } from "@/lib/ai-client";
import { toast } from "sonner";
import { CalendarClock, Sparkles } from "lucide-react";

export function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!tasks.trim()) return toast.error("List your tasks first.");
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi("plan", tasks));
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
          <CalendarClock className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-semibold">AI Task Planner</h2>
        </div>
        <Textarea
          rows={14}
          placeholder={`Dump your tasks (one per line). Example:
- Finish client proposal (due tomorrow, 3h)
- Reply to backlog of 20 emails
- Prep for 1:1 with manager at 2pm
- Review Q4 budget draft
- Gym`}
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <Button onClick={run} disabled={loading} className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Planning…" : "Build my plan"}
        </Button>
      </div>

      <div className="min-h-[300px]">
        <AiOutput text={output} loading={loading} />
        {!output && !loading && (
          <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Your prioritized, time-blocked plan will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
