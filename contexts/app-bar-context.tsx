"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

interface AppBarContextType {
  isAppBarVisible: boolean;
  setIsAppBarVisible: (visible: boolean) => void;
}

const AppBarContext = createContext<AppBarContextType | undefined>(undefined);

export function AppBarProvider({ children }: { children: ReactNode }) {
  const [isAppBarVisible, setIsAppBarVisible] = useState(true);
  const pathname = usePathname();

  // Hide app bar on specific routes
  useEffect(() => {
    const hiddenRoutes = ["/pricing"];
    const shouldHide = hiddenRoutes.includes(pathname);
    setIsAppBarVisible(!shouldHide);
  }, [pathname]);

  return (
    <AppBarContext.Provider value={{ isAppBarVisible, setIsAppBarVisible }}>
      {children}
    </AppBarContext.Provider>
  );
}

export function useAppBar() {
  const context = useContext(AppBarContext);
  if (context === undefined) {
    throw new Error("useAppBar must be used within an AppBarProvider");
  }
  return context;
}
