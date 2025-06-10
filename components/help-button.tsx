"use client";

import * as React from "react";
import Link from "next/link";
import {
  HelpCircle,
  FileText,
  LifeBuoy,
  MessageSquare,
  FileQuestion,
  Mail,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HelpButtonProps {
  className?: string;
}

export function HelpButton({ className }: HelpButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full hover:bg-muted", className)}
          aria-label="Help and Resources"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={2} className="w-56">
        <DropdownMenuLabel>Help & Resources</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/pricing"
            className="cursor-pointer flex w-full items-center font-semibold text-primary hover:bg-primary/20"
          >
            <CreditCard className="mr-2 h-4 w-4 text-primary" />
            <span>Pricing Plans</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/docs"
            className="cursor-pointer flex w-full items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/support"
            className="cursor-pointer flex w-full items-center"
          >
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support Center</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/faq" className="cursor-pointer flex w-full items-center">
            <FileQuestion className="mr-2 h-4 w-4" />
            <span>FAQ</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/terms"
            className="cursor-pointer flex w-full items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Terms of Service</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/privacy"
            className="cursor-pointer flex w-full items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Privacy Policy</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/chat?agentId=support"
            className="cursor-pointer flex w-full items-center"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Chat with Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="mailto:support@example.com"
            className="cursor-pointer flex w-full items-center"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Email Support</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
