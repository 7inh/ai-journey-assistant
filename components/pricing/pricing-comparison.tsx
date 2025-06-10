"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureRow {
  feature: string;
  free: boolean | string | React.ReactNode;
  pro: boolean | string | React.ReactNode;
  team: boolean | string | React.ReactNode;
  tooltip?: string;
}

const featuresList: FeatureRow[] = [
  {
    feature: "Active Journeys",
    free: "5",
    pro: "Unlimited",
    team: "Unlimited",
  },
  {
    feature: "Agent Access",
    free: "10+ Free Agents",
    pro: "All 50+ Agents",
    team: "All 50+ Agents",
  },
  {
    feature: "Daily Conversations",
    free: "3 per day",
    pro: "Unlimited",
    team: "Unlimited",
  },
  {
    feature: "Response Priority",
    free: "Standard",
    pro: "Priority",
    team: "Highest Priority",
    tooltip: "Determines how quickly agent responses are processed",
  },
  {
    feature: "Storage Capacity",
    free: "50MB",
    pro: "5GB",
    team: "25GB",
  },
  {
    feature: "API Access",
    free: false,
    pro: "100k tokens/month",
    team: "500k tokens/month",
  },
  {
    feature: "Custom Agent Creation",
    free: false,
    pro: true,
    team: true,
    tooltip: "Create your own specialized agents with custom instructions",
  },
  {
    feature: "Team Member Seats",
    free: "1",
    pro: "1",
    team: "5 included (+$10/user)",
  },
  {
    feature: "Collaborative Journeys",
    free: false,
    pro: false,
    team: true,
    tooltip: "Multiple team members can collaborate on the same journey",
  },
  {
    feature: "Admin Dashboard",
    free: false,
    pro: false,
    team: true,
  },
  {
    feature: "Advanced Analytics",
    free: false,
    pro: "Basic",
    team: "Advanced",
  },
  {
    feature: "Support",
    free: "Community",
    pro: "Email Support",
    team: "Priority Support",
  },
];

export function PricingComparison() {
  const renderValue = (value: boolean | string | React.ReactNode) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <Minus className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    return value;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">Feature Comparison</h2>
        <p className="text-muted-foreground">
          A detailed look at what each plan offers
        </p>
      </div>

      <div className="overflow-x-auto">
        <TooltipProvider>
          <Table className="border rounded-lg">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-1/3">Feature</TableHead>
                <TableHead className="text-center">Free</TableHead>
                <TableHead className="text-center">Pro</TableHead>
                <TableHead className="text-center">Team</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuresList.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-muted/20" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {row.feature}
                      {row.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">{row.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(row.free)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(row.pro)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(row.team)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
}
