# CareerBoost AI

An AI-powered job seeker toolkit built to help users polish resumes, write standout cover letters, prepare for interviews, draft professional emails, and get real-time career coaching. The app features a modern dashboard UI, light/dark mode, mobile-responsive layout, and a unified AI backend that enforces strong prompt engineering and responsible AI practices.

## Features

1. **AI Resume Optimizer** — Analyze and rewrite resumes with ATS-friendly keywords, clearer phrasing, and quantified impact suggestions.
2. **AI Cover Letter Generator** — Create tailored cover letters from a job title, company, description, and a user resume snippet.
3. **AI Interview Prep** — Generate technical, behavioral, and HR questions with sample answers and pro tips for a specific role.
4. **Professional Email Generator** — Draft application, follow-up, thank-you, and networking emails with selectable tone and audience.
5. **Career Chatbot** — An interactive, persistent workplace assistant for ongoing career advice and strategy questions.
6. **Dashboard + Navigation** — A clean, sidebar-driven dashboard with smooth transitions, loading states, and a mobile-responsive design.
7. **Theme Toggle** — Switch between light and dark modes using a Tailwind CSS-based theme system.
8. **Responsible AI Banner** — Every page reminds users that AI outputs are drafts and must be reviewed before submission.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/) (full-stack React 19 with SSR/SSG)
- **Build Tool:** Vite 7
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI primitives
- **AI SDK:** `@ai-sdk/react` + `@ai-sdk/openai-compatible` via the Lovable AI Gateway
- **Routing:** TanStack Router (file-based)
- **State Management:** React hooks + TanStack Query
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Package Manager:** Bun

## Prerequisites

- [Bun](https://bun.sh/) installed locally
- Node 18+ (if you prefer npm/yarn/pnpm, swap the install commands accordingly)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd careerboost-ai
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root and add:

   ```bash
   VITE_LOVABLE_API_KEY=your_lovable_api_key
   ```

   The server functions read the key from `process.env.VITE_LOVABLE_API_KEY` inside the request handler. If no key is configured, the AI gateway will return a clear error message and the app will display it in the UI.

4. **Run the development server**

   ```bash
   bun dev
   ```

   The dev server will start at `http://localhost:8080`.

5. **Build for production**

   ```bash
   bun run build
   ```

   Then preview the production build locally:

   ```bash
   bun run preview
   ```

## Project Structure

```
.
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppLayout.tsx    # Dashboard shell
│   │   ├── AppSidebar.tsx   # Sidebar navigation
│   │   ├── ThemeToggle.tsx  # Light/dark mode switch
│   │   ├── ToolShell.tsx    # Consistent page wrapper for tools
│   │   ├── AiOutput.tsx     # Markdown-rendered AI output with copy
│   │   ├── ChatAssistant.tsx
│   │   ├── EmailGenerator.tsx
│   │   ├── MeetingSummarizer.tsx
│   │   └── TaskPlanner.tsx
│   ├── lib/                 # Utilities, hooks, helpers
│   │   ├── ai-client.ts     # Client-side AI fetch helper
│   │   ├── ai-gateway.server.ts
│   │   ├── theme.tsx        # Theme provider
│   │   └── utils.ts
│   ├── routes/              # TanStack Start file-based routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Dashboard / landing page
│   │   ├── api/ai.ts        # Server AI endpoint
│   │   ├── resume.tsx
│   │   ├── cover-letter.tsx
│   │   ├── interview.tsx
│   │   ├── email.tsx
│   │   └── chat.tsx
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css           # Tailwind v4 entry point + theme tokens
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `bun dev` | Start Vite dev server |
| Build | `bun run build` | Production build |
| Dev Build | `bun run build:dev` | Development build |
| Preview | `bun run preview` | Preview production build |
| Lint | `bun run lint` | Run ESLint |
| Format | `bun run format` | Format all files with Prettier |

## How to Use

### Resume Optimizer

1. Navigate to **Resume Optimizer**.
2. Paste your existing resume text into the input area.
3. Optionally add a target job title or description.
4. Click **Analyze & optimize**.
5. Review the original text side-by-side with the improved version, ATS keyword suggestions, and highlighted strengths/weaknesses.

### Cover Letter Generator

1. Navigate to **Cover Letter**.
2. Fill in the job title, company name, and the job description.
3. Paste a short resume summary or key achievements.
4. Select the desired tone.
5. Click **Generate cover letter** and copy the final draft.

### Interview Prep

1. Navigate to **Interview Prep**.
2. Enter the job title and company.
3. Choose the question categories (technical, behavioral, HR, etc.).
4. Click **Generate questions**.
5. Review each question with a sample answer, key points, and a confidence tip.

### Email Generator

1. Navigate to **Email**.
2. Select the audience (client, manager, team, vendor, executive) and tone (formal, friendly, persuasive, apologetic, informal).
3. Optionally add a subject line.
4. Describe what the email should communicate.
5. Click **Generate email** and copy the result.

### Career Chatbot

1. Navigate to **Career Chatbot**.
2. Type any career-related question in the chat box.
3. Click the suggestion chips for quick prompts.
4. Continue the conversation to refine advice.

## Prompt Engineering & Responsible AI

- **Strict role-based system prompts** — Each tool uses a dedicated system prompt that defines the role, audience, output format, and constraints.
- **Markdown formatting** — AI outputs are formatted as Markdown so they render cleanly in the dashboard.
- **No fabrication** — Prompts explicitly instruct the model to use `[bracketed placeholders]` for missing information and never invent names, dates, or private facts.
- **Disclaimers** — A persistent banner and per-page notices remind users that all outputs are drafts and must be reviewed before sending to employers.
- **No PII retention** — Inputs are sent to the AI model to generate responses but are not stored on the application's servers.

## Customization

- **Theme tokens** — Edit `src/styles.css` to change the color palette, typography, spacing, or animation tokens.
- **Prompts** — Prompts are centralized in `src/routes/api/ai.ts`. Adjust the system prompts and tone templates without touching the UI.
- **Routes** — Add new tools by creating a `.tsx` file under `src/routes/` and adding an entry in `src/components/AppSidebar.tsx` and the home page (`src/routes/index.tsx`).

## Deployment

The project is configured for deployment on Lovable Cloud / Edge. To publish:

1. Run `bun run build` to ensure the build passes.
2. Push your code to the connected repository.
3. Use the Lovable publish flow in the editor to deploy the app.

For external hosting, make sure the environment variables are set in the hosting dashboard and the server runtime supports the Vite/TanStack Start production output.

## License

This project is provided as a starter template. You may modify it freely for personal or commercial use.

## Acknowledgments

- Built with [TanStack Start](https://tanstack.com/start/)
- AI responses powered by the Lovable AI Gateway and `google/gemini-3-flash-preview`
- UI components from [shadcn/ui](https://ui.shadcn.com/)
