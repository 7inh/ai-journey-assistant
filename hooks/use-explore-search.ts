import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useExploreSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [exploreSearchTerm, setExploreSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  useEffect(() => {
    if (pathname === "/explore") {
      const q = searchParams.get("q") || "";
      if (q !== exploreSearchTerm) {
        setExploreSearchTerm(q);
      }
    }
  }, [searchParams, pathname, exploreSearchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setExploreSearchTerm(newSearchTerm);
    const params = new URLSearchParams(searchParams.toString());
    if (newSearchTerm) {
      params.set("q", newSearchTerm);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    exploreSearchTerm,
    handleSearchChange,
  };
}
