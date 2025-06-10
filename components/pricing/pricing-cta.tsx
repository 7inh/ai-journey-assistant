import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingCTA() {
  return (
    <div className="bg-muted/30 rounded-lg py-8 px-4 text-center space-y-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold">Still have questions?</h2>
      <p className="text-muted-foreground">
        Our team is here to help you find the perfect plan for your needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
        <Button asChild variant="outline">
          <Link href="/contact">Contact Sales</Link>
        </Button>
        <Button asChild>
          <Link href="/chat?agentId=billing-support">
            Chat with Billing Support
          </Link>
        </Button>
      </div>
    </div>
  );
}
