
import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./sidebar/AppSidebar"

export function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
