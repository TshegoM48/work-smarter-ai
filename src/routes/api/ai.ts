import { createFileRoute } from "@tanstack/react-router";
import { generateText, type ModelMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type Mode = "email" | "summarize" | "plan" | "chat" | "research";

interface Body {
  mode: Mode;
  input: string;
  options?: {
    tone?: string;
    audience?: string;
    subject?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  };
}

const SYSTEM_PROMPTS: Record<Mode, (o: Body["options"]) => string> = {
  email: (o) =>
    `You are an expert professional communication assistant. Write a complete, ready-to-send email.

Constraints:
- Tone: ${o?.tone ?? "formal"}
- Audience: ${o?.audience ?? "client"}
- Keep it concise, clear, and action-oriented.
- Include: Subject line, greeting, body (2-4 short paragraphs), clear call-to-action, professional sign-off.
- Never invent private facts (names, dates, numbers) not present in the user's brief. If missing, use bracketed placeholders like [Your Name].
- Output format: Markdown. Start with "**Subject:** ...".`,

  summarize: () =>
    `You are a meeting notes summarizer. Convert raw notes/transcripts into a crisp executive summary.

Output format (Markdown, in this exact order):
### TL;DR
2-3 sentence overview.

### Key Discussion Points
- Bullet points of the most important topics.

### Decisions Made
- Concrete decisions (or "None recorded").

### Action Items
| Owner | Task | Deadline |
|---|---|---|
Fill from notes; use "Unassigned" or "TBD" when unclear. Never fabricate owners or dates.

### Risks & Open Questions
- Anything unresolved.`,

  plan: () =>
    `You are a productivity planner. Turn the user's task dump into a prioritized, time-blocked plan.

Apply the Eisenhower matrix (urgent/important) and realistic time estimates.

Output format (Markdown):
### Priorities (Ranked)
Ordered list with rationale (Urgent+Important, Important, etc.).

### Time-Blocked Schedule
| Time | Task | Focus Level |
|---|---|---|
Assume a standard workday unless specified. Include short breaks.

### Optimization Tips
- 3-5 concrete strategies (batching, deep work windows, delegation).

Never invent commitments the user did not mention.`,

  research: () =>
    `You are a research assistant. Summarize the provided article, topic, or question for a busy professional.

Output format (Markdown):
### Executive Summary
3-4 sentences.

### Key Insights
- 5-7 bullet points of the most valuable takeaways.

### Plain-English Explanation
Explain any complex concepts simply (as if to a smart non-expert).

### Recommendations / Next Steps
- Actionable suggestions.

If the user provided a topic without source text, clearly note you are giving a general overview from training data, and flag uncertainty. Never invent citations, statistics, or quotes.`,

  chat: () =>
    `You are a helpful, concise workplace assistant. You help with drafting, planning, summarizing, brainstorming, and answering work questions. Be direct, use Markdown, and ask a clarifying question when the request is ambiguous. Do not fabricate facts, names, or numbers.`,
};

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Body;
          if (!body?.mode || typeof body.input !== "string") {
            return new Response("Invalid request", { status: 400 });
          }

          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const gateway = createLovableAiGatewayProvider(key);
          const model = gateway("google/gemini-3-flash-preview");

          const system = SYSTEM_PROMPTS[body.mode](body.options);

          const messages: ModelMessage[] = [];
          if (body.mode === "chat" && body.options?.history) {
            for (const m of body.options.history) {
              messages.push({ role: m.role, content: m.content });
            }
            messages.push({ role: "user", content: body.input });
          } else {
            let userContent = body.input;
            if (body.mode === "email" && body.options?.subject) {
              userContent = `Context/Subject: ${body.options.subject}\n\nBrief:\n${body.input}`;
            }
            messages.push({ role: "user", content: userContent });
          }

          const { text } = await generateText({ model, system, messages });
          return Response.json({ text });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI request failed";
          const status = /429/.test(msg) ? 429 : /402/.test(msg) ? 402 : 500;
          return new Response(msg, { status });
        }
      },
    },
  },
});
