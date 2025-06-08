import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useExploreSearch } from "@/hooks/use-explore-search";
import { Search, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, memo } from "react";

// Use memo to prevent unnecessary rerenders
export const ExploreSearch = memo(function ExploreSearch() {
  const {
    exploreSearchTerm,
    handleSearchChange,
    searchResults,
    totalResults,
    isSearching,
    showPopover,
    setShowPopover,
    navigateToSearchPage,
    closePopover,
    loadMoreResults,
    hasMoreResults,
    isLoadingMore,
  } = useExploreSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef as React.RefObject<HTMLElement>, () => {
    if (showPopover) closePopover();
  });

  // Handle keyboard navigation and Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToSearchPage();
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    handleSearchChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Focus the input when needed
  useEffect(() => {
    if (exploreSearchTerm && inputRef.current && document.hasFocus()) {
      inputRef.current.focus();
    }
  }, [exploreSearchTerm]);

  // Implement infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = resultsContainerRef.current;
      if (!container || !hasMoreResults || isLoadingMore) return;

      // Check if scrolled near the bottom (within 100px)
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreResults();
      }
    };

    const container = resultsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasMoreResults, isLoadingMore, loadMoreResults]);

  return (
    <div className="relative w-full md:max-w-md" ref={popoverRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search agents..."
          className="w-full pl-9 pr-9 h-10 rounded-md text-sm bg-muted/50 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
          value={exploreSearchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (exploreSearchTerm && searchResults.length > 0) {
              setShowPopover(true);
            }
          }}
          ref={inputRef}
          aria-label="Search agents"
        />
        {exploreSearchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Popover with search results */}
      {showPopover && (
        <div className="absolute z-50 w-full mt-1 bg-popover rounded-md border shadow-lg">
          <div
            className="p-2 max-h-[60vh] overflow-auto"
            ref={resultsContainerRef}
          >
            {isSearching && searchResults.length === 0 ? (
              <div className="flex items-center justify-center p-4">
                <Spinner size="sm" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Searching...
                </span>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="mb-2 px-2">
                  <p className="text-xs text-muted-foreground">
                    {totalResults} {totalResults === 1 ? "item" : "items"} match
                  </p>
                </div>
                <ul>
                  {searchResults.map((agent) => (
                    <li
                      key={agent.id}
                      className="flex items-start p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => {
                        handleSearchChange(agent.name);
                        navigateToSearchPage();
                      }}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={agent.imageUrl} alt={agent.name} />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {agent.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {agent.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {isLoadingMore && (
                  <div className="flex justify-center py-2">
                    <Spinner size="sm" />
                  </div>
                )}

                {hasMoreResults && !isLoadingMore && (
                  <div className="text-center py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={loadMoreResults}
                      className="text-xs text-muted-foreground"
                    >
                      Load more
                    </Button>
                  </div>
                )}

                <div className="mt-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-primary"
                    onClick={navigateToSearchPage}
                  >
                    See all results
                  </Button>
                </div>
              </>
            ) : exploreSearchTerm ? (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">No agents found</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
});
