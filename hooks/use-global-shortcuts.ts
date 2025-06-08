import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sidebarNavItems } from "@/lib/data";

export function useGlobalShortcuts() {
  const router = useRouter();

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "e" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/explore");
      }
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        const newJourneyNavItem = sidebarNavItems.find(
          (item) => item.id === "new-journey"
        );
        if (newJourneyNavItem && newJourneyNavItem.href) {
          router.push(newJourneyNavItem.href);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);
}
