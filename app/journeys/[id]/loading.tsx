import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ListChecks } from "lucide-react";

export default function JourneyDetailLoading() {
  return (
    <div className="h-full flex flex-col">
      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="space-y-6">
          {/* Journey Start Message */}
          <div className="flex items-start gap-3 justify-start">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback>
                <MessageSquare size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] rounded-lg p-3 shadow-sm bg-muted dark:bg-neutral-800">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-full max-w-[250px]" />
            </div>
          </div>

          {/* Phase Skeleton */}
          <div className="flex items-start gap-3 justify-start">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback>
                <ListChecks size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] w-full rounded-lg p-3 shadow-sm bg-muted dark:bg-neutral-800">
              <Skeleton className="h-5 w-40 mb-3" />

              {/* Task Skeletons */}
              <div className="space-y-3 mt-2 border-t border-dashed pt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-full max-w-[180px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-full max-w-[220px]" />
                </div>
              </div>
            </div>
          </div>

          {/* User Message Skeleton */}
          <div className="flex items-start gap-3 justify-end">
            <div className="max-w-[70%] rounded-lg p-3 shadow-sm bg-primary text-primary-foreground">
              <Skeleton className="h-4 w-32 bg-primary-foreground/20" />
            </div>
          </div>

          {/* AI Response Skeleton */}
          <div className="flex items-start gap-3 justify-start">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback>
                <MessageSquare size={18} />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] rounded-lg p-3 shadow-sm bg-muted dark:bg-neutral-800">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-10 bg-background p-2">
        <div className="relative flex items-center w-full rounded-md border border-input bg-background p-1">
          <Skeleton className="absolute left-3 h-5 w-5" />
          <Skeleton className="h-9 w-full ml-8 mr-16" />
          <div className="absolute right-2 flex gap-1">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
