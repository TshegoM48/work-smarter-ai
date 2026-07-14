import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { ShieldAlert } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger />
              <span className="truncate text-sm text-muted-foreground hidden sm:inline">
                AI-powered job seeker toolkit
              </span>
            </div>
            <ThemeToggle />
          </header>

          <div className="border-b bg-warning/10 px-4 py-2 text-[11px] text-foreground/80 flex items-start gap-2">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-warning" />
            <p>
              <strong>Responsible AI:</strong> Outputs are AI-generated drafts and may contain inaccuracies.
              Always review, personalize, and verify before submitting to employers.
            </p>
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
