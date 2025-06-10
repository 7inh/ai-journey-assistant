import { cn } from "@/lib/utils";

interface HeaderSkeletonProps {
  isSettingsPage?: boolean;
  isExplorePage?: boolean;
}

export function HeaderSkeleton({
  isSettingsPage = false,
  isExplorePage = false,
}: HeaderSkeletonProps) {
  return (
    <header className={cn("sticky top-0", isExplorePage ? "z-40" : "z-10")}>
      <div
        className={cn(
          "relative",
          "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 dark:border-neutral-800",
          isSettingsPage ? "h-12 py-0" : "h-16 py-3"
        )}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/40 dark:bg-background/70 dark:border-border/30"></div>

        <div className="flex w-full items-start gap-1 sm:gap-2 relative">
          {/* Sidebar trigger skeleton */}
          <div className="h-9 w-9 animate-pulse rounded-md bg-muted md:hidden" />

          {/* Title area skeleton */}
          <div className="flex-1 flex justify-start">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
          </div>

          {/* User menu skeleton */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </header>
  );
}
