import type { ShowcaseItem } from "@/interfaces"
import ShowcaseItemDisplay from "@/components/showcase-item-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AgentShowcaseSectionProps {
  items: ShowcaseItem[]
}

export default function AgentShowcaseSection({ items }: AgentShowcaseSectionProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="agent-showcase-heading">
      <Card>
        <CardHeader>
          <CardTitle id="agent-showcase-heading" className="text-xl sm:text-2xl font-semibold">
            Showcase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {items.map((item) => (
              <ShowcaseItemDisplay key={item.id} item={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
