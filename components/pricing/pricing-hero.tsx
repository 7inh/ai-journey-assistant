import { Badge } from "@/components/ui/badge";

export function PricingHero() {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className="px-3 py-1 text-sm bg-primary/10 border-primary/20"
        >
          Pricing
        </Badge>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        Simple, transparent pricing
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Choose the perfect plan for your AI journey needs, with flexible options
        for individuals and teams. All plans include our core features with
        different usage limits.
      </p>
    </div>
  );
}
