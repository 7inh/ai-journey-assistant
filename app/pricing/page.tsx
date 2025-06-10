import { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { PricingCTA } from "@/components/pricing/pricing-cta";
import { Separator } from "@/components/ui/separator";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { PricingComparison } from "@/components/pricing/pricing-comparison";
import PaddingContainer from "@/components/layout/padding-container";

export const metadata: Metadata = {
  title: "Pricing Plans | AI Journey Assistant",
  description: "Choose the perfect plan for your AI journey needs",
};

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <PaddingContainer>
        <div className="max-w-5xl mx-auto w-full py-20">
          <PricingHero />
          <br />
          <PricingTiers />
          <Separator className="my-8" />
          <PricingComparison />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </PaddingContainer>
    </div>
  );
}
