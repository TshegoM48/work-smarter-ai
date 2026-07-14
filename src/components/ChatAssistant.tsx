import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { callAi } from "@/lib/ai-client";
import { toast } from "sonner";
import { Bot, Send, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Draft a Slack update announcing our sprint results",
  "Give me 3 icebreakers for a remote team meeting",
  "Rewrite this to be more concise: <paste text>",
  "Compare pros/cons of async vs sync standups",
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { inputRef.current?.focus(); }, [loading]);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    const history = messages;
    const next: Msg[] = [...history, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await callAi("chat", text, { history });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
      setMessages(history);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-soft" style={{ height: "min(70vh, 640px)" }}>
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft">
          <Bot className="h-4 w-4 text-brand" />
        </div>
        <div>
          <p className="text-sm font-semibold">Workplace Assistant</p>
          <p className="text-xs text-muted-foreground">Ask me anything about your work</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Try one of these:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border bg-background p-3 text-left text-sm transition hover:border-brand hover:bg-brand-soft"
                >
                  <Sparkles className="mb-1 inline h-3.5 w-3.5 text-brand" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              m.role === "user" ? "bg-brand text-brand-foreground" : "bg-brand-soft text-brand"
            }`}>
              {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>
            <div className={`prose-chat max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user" ? "bg-brand text-brand-foreground" : "bg-muted"
            }`}>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-end gap-2 border-t p-3"
      >
        <Textarea
          ref={inputRef}
          rows={1}
          placeholder="Ask me anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
          className="max-h-32 min-h-[42px] resize-none"
        />
        <Button type="submit" disabled={loading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
