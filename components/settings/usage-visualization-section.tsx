"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, CalendarDays } from "lucide-react"
import Plot from "react-plotly.js"

export function UsageVisualizationSection() {
  // In a real app, these would trigger data refetching for the chart
  const handleTimeFilterChange = (period: string) => {
    console.log(`Filtering usage data by: ${period}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Usage Visualization
        </CardTitle>
        <CardDescription>Visual representation of your resource consumption over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handleTimeFilterChange("daily")}>
            <CalendarDays className="mr-2 h-4 w-4" /> Daily
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleTimeFilterChange("weekly")}>
            <CalendarDays className="mr-2 h-4 w-4" /> Weekly
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleTimeFilterChange("monthly")}>
            <CalendarDays className="mr-2 h-4 w-4" /> Monthly
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleTimeFilterChange("yearly")}>
            <CalendarDays className="mr-2 h-4 w-4" /> Yearly
          </Button>
        </div>
        <div className="w-full h-[350px] bg-muted/30 rounded-lg flex items-center justify-center p-4">
          <Plot
            data={[
              {
                x: [1, 2, 3, 4, 5, 6, 7],
                y: [10, 15, 13, 17, 22, 18, 25],
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "hsl(var(--primary))" },
                name: "API Requests",
              },
              {
                x: [1, 2, 3, 4, 5, 6, 7],
                y: [5, 8, 6, 10, 12, 9, 14],
                type: "bar",
                name: "Data Storage (GB)",
                marker: { color: "hsl(var(--secondary))" },
              },
            ]}
            layout={{
              autosize: true,
              title: "Resource Consumption",
              xaxis: { title: "Time Period" },
              yaxis: { title: "Usage" },
              legend: {
                orientation: "h",
                yanchor: "bottom",
                y: 1.02,
                xanchor: "right",
                x: 1,
              },
              margin: { l: 50, r: 20, b: 40, t: 40, pad: 4 },
            }}
            useResizeHandler={true}
            className="w-full h-full"
            config={{ responsive: true }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Chart data is illustrative. This chart is rendered using react-plotly.js.
        </p>
      </CardContent>
    </Card>
  )
}
