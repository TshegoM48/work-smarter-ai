export type AiMode = "email" | "summarize" | "plan" | "research" | "chat";

export interface AiOptions {
  tone?: string;
  audience?: string;
  subject?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export async function callAi(mode: AiMode, input: string, options?: AiOptions): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, input, options }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 429) throw new Error("Rate limit reached. Please wait a moment and try again.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    throw new Error(body || "AI request failed");
  }
  const { text } = (await res.json()) as { text: string };
  return text;
}
