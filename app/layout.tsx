import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmationProvider } from "@/contexts/confirmation-context";
import { HeaderProvider } from "@/contexts/header-context";
import { ThemeContextProvider } from "@/contexts/theme-context";
import BrowserInitor from "@/lib/browser-init";
import { createProviderCompose } from "@/lib/provider-composer";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import "./globals.css"; // Keep this for global styles
import { AppBarProvider } from "@/contexts/app-bar-context";
import I18nProvider from "@/components/i18n-provider";

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
    .add(I18nProvider)
    .add(SidebarProvider, { defaultOpen: defaultSidebarOpen })
    .add(AppBarProvider)
    .add(HeaderProvider)
    .add(ConfirmationProvider)
    // .add(CartProvider)
    .compose();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedLang = localStorage.getItem('i18nextLng');
                if (savedLang) {
                  document.documentElement.lang = savedLang.split('-')[0] || 'en';
                }
              } catch (e) {
                console.error('Error setting initial language:', e);
              }
            `,
          }}
        />
      </head>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <AppProviders>
          <main className="flex h-screen w-screen flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <div className="flex flex-col flex-1 w-full overflow-hidden max-h-screen">
                <AppHeader />
                <div className="flex-1 overflow-y-auto">{children}</div>
              </div>
            </div>
          </main>
          <ConfirmationDialog />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
