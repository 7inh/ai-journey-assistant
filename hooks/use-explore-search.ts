import { searchAgents } from "@/features/agents/api";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsFirstRender } from "@/hooks/use-is-first-render";
import type { Agent } from "@/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Number of items to show initially and load more
const INITIAL_ITEMS = 10;
const ITEMS_PER_LOAD = 10;

export function useExploreSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isFirstRender = useIsFirstRender();

  // Track previous query to avoid unnecessary updates
  const prevQueryRef = useRef<string>("");

  // Initialize input value from URL only on first render
  const [inputValue, setInputValue] = useState(
    () => searchParams.get("q") || ""
  );
  const [allSearchResults, setAllSearchResults] = useState<Agent[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Agent[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Only debounce the API calls, not the UI updates
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  // Track if URL was changed programmatically to avoid loops
  const isUrlUpdatePending = useRef(false);

  // Only sync from URL to input when URL query changes
  useEffect(() => {
    // Skip on first render as we already set the initial value
    if (isFirstRender) return;

    // Only proceed if this wasn't a programmatic update
    if (!isUrlUpdatePending.current) {
      const currentQuery = searchParams.get("q") || "";

      // Only update if the URL query has actually changed
      if (currentQuery !== prevQueryRef.current) {
        prevQueryRef.current = currentQuery;
        setInputValue(currentQuery);
      }
    } else {
      // Reset the flag after a programmatic update
      isUrlUpdatePending.current = false;
    }
  }, [searchParams, isFirstRender]);

  // Keep the previous query ref updated with input value
  // This helps maintain sync between programmatic URL changes and manual input
  useEffect(() => {
    // Don't update ref on first render
    if (isFirstRender) return;

    // Only update the ref if the change came from user input, not URL sync
    if (!isUrlUpdatePending.current) {
      prevQueryRef.current = inputValue;
    }
  }, [inputValue, isFirstRender]);

  // Load initial results when search term changes
  useEffect(() => {
    const performSearch = async () => {
      // Don't search if empty
      if (!debouncedSearchTerm.trim()) {
        setAllSearchResults([]);
        setDisplayedResults([]);
        setShowPopover(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchAgents(debouncedSearchTerm);
        setAllSearchResults(results);

        // Set initial displayed results
        setDisplayedResults(results.slice(0, INITIAL_ITEMS));
        setHasMoreResults(results.length > INITIAL_ITEMS);

        // Only show popover if the search input is focused
        const isSearchInputFocused =
          document.activeElement?.getAttribute("type") === "search";
        setShowPopover(results.length > 0 && isSearchInputFocused);
      } catch (error) {
        console.error("Error searching agents:", error);
        setAllSearchResults([]);
        setDisplayedResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  // Load more results
  const loadMoreResults = useCallback(() => {
    if (isLoadingMore || !hasMoreResults) return;

    setIsLoadingMore(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      const currentSize = displayedResults.length;
      const newItems = allSearchResults.slice(
        currentSize,
        currentSize + ITEMS_PER_LOAD
      );

      setDisplayedResults((prev) => [...prev, ...newItems]);
      setHasMoreResults(
        currentSize + newItems.length < allSearchResults.length
      );
      setIsLoadingMore(false);
    }, 300);
  }, [displayedResults, allSearchResults, hasMoreResults, isLoadingMore]);

  // Handle search input changes immediately for UI
  const handleSearchChange = useCallback((newValue: string) => {
    // Update the input value immediately for responsive UI
    setInputValue(newValue);

    // Show/hide popover based on input content
    if (newValue) {
      setShowPopover(true);
    } else {
      setShowPopover(false);
      setAllSearchResults([]);
      setDisplayedResults([]);
    }
  }, []);

  // Navigate to search results page and update URL
  const navigateToSearchPage = useCallback(() => {
    if (!inputValue.trim()) return;

    // Mark that we're updating the URL programmatically
    isUrlUpdatePending.current = true;
    prevQueryRef.current = inputValue; // Update the ref to match the new URL

    // Update URL with search term
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", inputValue);
    router.push(`${pathname}?${params.toString()}`);
    setShowPopover(false);
  }, [inputValue, searchParams, router, pathname]);

  // Close the popover
  const closePopover = useCallback(() => {
    setShowPopover(false);
  }, []);

  console.log("Explore Search Hook Rendered", inputValue);

  return {
    exploreSearchTerm: inputValue,
    handleSearchChange,
    searchResults: displayedResults,
    totalResults: allSearchResults.length,
    isSearching,
    showPopover,
    setShowPopover,
    navigateToSearchPage,
    closePopover,
    loadMoreResults,
    hasMoreResults,
    isLoadingMore,
  };
}
