import type { ShowcaseItem } from "@/interfaces"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function ShowcaseItemDisplay({ item }: { item: ShowcaseItem }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {item.type === "image" && item.imageUrl && (
        <div className="aspect-video relative w-full">
          <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} layout="fill" objectFit="cover" />
        </div>
      )}
      {item.type === "video" && item.videoUrl && (
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={item.videoUrl.includes("embed") ? item.videoUrl : `https://www.youtube.com/embed/${item.videoUrl}`} // Basic YouTube embed logic
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
        {item.description && <CardDescription className="text-xs">{item.description}</CardDescription>}
      </CardHeader>
      {item.type === "text-demo" && (
        <CardContent className="text-xs flex-grow">
          {item.demoPrompt && (
            <div className="mb-2">
              <p className="font-semibold">Prompt:</p>
              <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{item.demoPrompt}</pre>
            </div>
          )}
          {item.demoResponse && (
            <div>
              <p className="font-semibold">Response:</p>
              <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{item.demoResponse}</pre>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
