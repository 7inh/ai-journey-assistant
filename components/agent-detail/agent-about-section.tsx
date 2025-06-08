import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface AgentAboutSectionProps {
  description: string
}

export default function AgentAboutSection({ description }: AgentAboutSectionProps) {
  return (
    <section aria-labelledby="about-agent-heading">
      <Card>
        <CardHeader>
          <CardTitle id="about-agent-heading" className="text-xl sm:text-2xl font-semibold">
            About this Agent
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
        </CardContent>
      </Card>
    </section>
  )
}
