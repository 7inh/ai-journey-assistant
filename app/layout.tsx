import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Keep this for global styles
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeContextProvider } from "@/contexts/theme-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/app-header";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { HeaderProvider } from "@/contexts/header-context";
import { ConfirmationProvider } from "@/contexts/confirmation-context";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import BrowserInitor from "@/lib/browser-init"; // Import BrowserInitor
import NextTopLoader from "nextjs-toploader";
import { createProviderCompose } from "@/lib/provider-composer";
import { AppBarProvider } from "@/contexts/app-bar-context"; // Import AppBarProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Journey Assistant",
  description: "Manage your tasks and journeys with an AI assistant.",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarOpenCookie = cookieStore.get("sidebar:state")?.value;
  const defaultSidebarOpen =
    sidebarOpenCookie === undefined ? true : sidebarOpenCookie === "true";

  const AppProviders = createProviderCompose()
    .add(BrowserInitor) // Add BrowserInitor to the composition
    .add(ThemeProvider, {
      attribute: "class",
      defaultTheme: "light",
      enableSystem: true,
      disableTransitionOnChange: false,
    })
    .add(ThemeContextProvider)
    .add(SidebarProvider, { defaultOpen: defaultSidebarOpen })
    .add(HeaderProvider)
    .add(ConfirmationProvider)
    // .add(CartProvider)
    .compose();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <NextTopLoader
          color="hsl(var(--primary))"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
        />
        <AppProviders>
          <AppBarProvider>
            <div className="flex min-h-screen w-full max-w-[100dvw] overflow-x-hidden">
              <AppSidebar />
              <div className="flex flex-1 flex-col overflow-auto h-dvh">
                <AppHeader />
                <main className="flex flex-col flex-1">{children}</main>
              </div>
            </div>
            <ConfirmationDialog />
            <Toaster />
          </AppBarProvider>
        </AppProviders>
      </body>
    </html>
  );
}
