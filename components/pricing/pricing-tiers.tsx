"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId?: string;
  priceDetail: string;
  features: string[];
  primaryAction: string;
  primaryActionHref: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Essential features for getting started",
    price: "$0",
    priceDetail: "forever",
    features: [
      "5 active journeys",
      "Access to 10+ free agents",
      "3 agent conversations per day",
      "Standard response speed",
      "Basic storage (50MB)",
    ],
    primaryAction: "Get Started",
    primaryActionHref: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfect for individual power users",
    price: "$19.99",
    priceId: "price_pro_monthly",
    priceDetail: "per month",
    features: [
      "Unlimited journeys",
      "Access to all 50+ agents",
      "Unlimited conversations",
      "Priority response speed",
      "Advanced storage (5GB)",
      "API access (100k tokens/month)",
      "Custom agent creation",
    ],
    primaryAction: "Subscribe",
    primaryActionHref: "/subscribe?plan=pro",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams and organizations",
    price: "$49.99",
    priceId: "price_team_monthly",
    priceDetail: "per month",
    features: [
      "Everything in Pro",
      "5 team members included",
      "Collaborative journeys",
      "Team admin dashboard",
      "Advanced analytics",
      "Enterprise-grade security",
      "Priority support",
      "API access (500k tokens/month)",
    ],
    primaryAction: "Contact Us",
    primaryActionHref: "/contact",
  },
];

export function PricingTiers() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col",
              plan.popular && "border-primary shadow-md relative"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-3 space-y-1">
                <p className="text-3xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.priceDetail}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href={plan.primaryActionHref}>{plan.primaryAction}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        All prices shown are in USD. Additional taxes may apply based on your
        location.
      </p>
    </div>
  );
}
