// Example page to demonstrate the StatusPill component
import { StatusPill } from "@/components/ui/status-pill"
import { Separator } from "@/components/ui/separator"

export default function CvaExamplePage() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">CVA StatusPill Examples</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Intents</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusPill intent="default" label="Default" />
          <StatusPill intent="success" label="Success" />
          <StatusPill intent="warning" label="Warning" />
          <StatusPill intent="danger" label="Danger" />
          <StatusPill intent="info" label="Info" />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusPill size="sm" label="Small Pill" />
          <StatusPill size="md" label="Medium Pill" />
          <StatusPill size="lg" label="Large Pill" />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Combined Variants</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusPill intent="success" size="sm" label="Small Success" />
          <StatusPill intent="warning" size="md" label="Medium Warning" />
          <StatusPill intent="danger" size="lg" label="Large Danger" />
          <StatusPill intent="info" size="sm">
            Info (child)
          </StatusPill>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Custom ClassName</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusPill intent="success" label="Custom Style" className="rounded-md shadow-lg" />
          <StatusPill intent="default" size="lg" className="font-black tracking-wider uppercase">
            Highly Styled
          </StatusPill>
        </div>
      </section>
    </div>
  )
}
