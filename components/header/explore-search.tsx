import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useExploreSearch } from "@/hooks/use-explore-search";

export function ExploreSearch() {
  const { exploreSearchTerm, handleSearchChange } = useExploreSearch();

  return (
    <div className="relative w-full md:max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search agents..."
        className="w-full pl-9 pr-4 h-10 rounded-md text-sm bg-muted/50 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
        value={exploreSearchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        aria-label="Search agents"
      />
    </div>
  );
}
