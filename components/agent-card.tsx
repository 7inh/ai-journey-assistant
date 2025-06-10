"use client";

import type { Agent } from "@/interfaces";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getChatRoute } from "@/constants/routes.constants";

interface AgentCardProps {
  agent: Agent;
  isProminent?: boolean;
  onSelect?: (agentId: string) => void;
}

export default function AgentCard({
  agent,
  isProminent = false,
  onSelect,
}: AgentCardProps) {
  const FallbackIcon = () => (
    <span className="text-2xl font-semibold">
      {agent.name.substring(0, 1).toUpperCase()}
    </span>
  );

  return (
    <Card
      className={cn(
        "flex flex-col transition-all hover:shadow-lg",
        isProminent ? "md:flex-row md:items-center" : "h-full",
        "cursor-pointer group" // Added group for hover effects on children
      )}
      onClick={() => onSelect?.(agent.id)}
    >
      <CardHeader
        className={cn(
          "flex items-center gap-4 p-4 md:p-6",
          isProminent
            ? "md:w-1/3 md:border-r"
            : "flex-row md:flex-col text-center md:items-center"
        )}
      >
        <Avatar
          className={cn(
            "h-16 w-16 md:h-24 md:w-24",
            isProminent && "md:h-28 md:w-28"
          )}
        >
          <AvatarImage
            src={agent.avatarUrl || "/placeholder.svg"}
            alt={agent.name}
          />
          <AvatarFallback>
            <FallbackIcon />
          </AvatarFallback>
        </Avatar>
        <div className={cn(!isProminent && "md:mt-4 text-left md:text-center")}>
          <CardTitle className={cn("text-xl", isProminent && "md:text-2xl")}>
            {agent.name}
          </CardTitle>
          {isProminent && agent.lastUsed && (
            <p className="text-xs text-muted-foreground mt-1">
              Last used: {new Date(agent.lastUsed).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-col flex-grow p-4 md:p-6",
          isProminent ? "md:w-2/3" : "items-center text-center md:text-left"
        )}
      >
        <CardDescription
          className={cn("flex-grow mb-4", isProminent && "md:text-base")}
        >
          {agent.description}
        </CardDescription>
        {agent.tags && agent.tags.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-2 mb-4",
              !isProminent && "justify-center md:justify-start"
            )}
          >
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {/* Use Link for navigation, onSelect can handle other logic if needed */}
        <Link href={getChatRoute(agent.id)} passHref legacyBehavior>
          <Button
            variant={isProminent ? "default" : "outline"}
            className="w-full md:w-auto mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            aria-label={`Select agent ${agent.name}`}
          >
            Select {agent.name}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
