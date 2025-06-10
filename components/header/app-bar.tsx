"use client";

import { useAppBar } from "@/contexts/app-bar-context";

export function AppBar() {
  const { isAppBarVisible } = useAppBar();

  if (!isAppBarVisible) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      {/* App bar content */}
    </header>
  );
}
