import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function AiOutput({ text, loading }: { text: string; loading?: boolean }) {
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand [animation-delay:300ms]" />
          <span className="ml-2">Thinking…</span>
        </div>
      </div>
    );
  }

  if (!text) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-lg border bg-card p-6 shadow-soft">
      <Button
        size="sm"
        variant="ghost"
        onClick={copy}
        className="absolute right-3 top-3"
        aria-label="Copy output"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <div className="prose-chat max-w-none text-sm text-foreground">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
