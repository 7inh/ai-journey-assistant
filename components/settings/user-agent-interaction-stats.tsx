"use client"

import { useState, useEffect, useMemo } from "react"
import Plot from "react-plotly.js"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MessageSquare, Clock, CheckCircle, Smile } from "lucide-react"
import { format, subDays, addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

interface InteractionDataPoint {
  date: string
  conversations: number
  avgResponseTime: number // in minutes
  resolutionRate: number // percentage
  satisfactionScore: number // out of 5
}

interface Agent {
  id: string
  name: string
}

// Mock data - replace with actual API calls
const MOCK_AGENTS: Agent[] = [
  { id: "all", name: "All Agents" },
  { id: "agent_1", name: "Support Bot Alpha" },
  { id: "agent_2", name: "Sales Assistant Beta" },
  { id: "agent_3", name: "FAQ Helper Gamma" },
]

const generateMockInteractionData = (startDate: Date, endDate: Date, agentId: string): InteractionDataPoint[] => {
  const data: InteractionDataPoint[] = []
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    data.push({
      date: format(currentDate, "yyyy-MM-dd"),
      conversations: Math.floor(Math.random() * 50) + (agentId === "agent_1" ? 20 : 10),
      avgResponseTime: Number.parseFloat((Math.random() * 5 + 1).toFixed(1)), // 1-6 minutes
      resolutionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      satisfactionScore: Number.parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5-5.0
    })
    currentDate = addDays(currentDate, 1)
  }
  return data
}

export function UserAgentInteractionStats() {
  const [selectedAgent, setSelectedAgent] = useState<string>(MOCK_AGENTS[0].id)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  })

  const [interactionData, setInteractionData] = useState<InteractionDataPoint[]>([])

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const data = generateMockInteractionData(dateRange.from, dateRange.to, selectedAgent)
      setInteractionData(data)
    }
  }, [selectedAgent, dateRange])

  const chartData = useMemo(() => {
    if (!interactionData.length) return []

    const dates = interactionData.map((d) => d.date)
    const conversations = interactionData.map((d) => d.conversations)
    const satisfactionScores = interactionData.map((d) => d.satisfactionScore)

    return [
      {
        x: dates,
        y: conversations,
        type: "scatter",
        mode: "lines+markers",
        name: "Conversations",
        marker: { color: "hsl(var(--chart-1))" },
        line: { color: "hsl(var(--chart-1))" },
      },
      {
        x: dates,
        y: satisfactionScores,
        type: "scatter",
        mode: "lines+markers",
        name: "Satisfaction (Avg)",
        yaxis: "y2",
        marker: { color: "hsl(var(--chart-2))" },
        line: { color: "hsl(var(--chart-2))" },
      },
    ]
  }, [interactionData])

  const summaryStats = useMemo(() => {
    if (!interactionData.length)
      return { totalConversations: 0, avgResponseTime: 0, avgResolutionRate: 0, avgSatisfaction: 0 }
    const totalConversations = interactionData.reduce((sum, d) => sum + d.conversations, 0)
    const avgResponseTime = interactionData.reduce((sum, d) => sum + d.avgResponseTime, 0) / interactionData.length
    const avgResolutionRate = interactionData.reduce((sum, d) => sum + d.resolutionRate, 0) / interactionData.length
    const avgSatisfaction = interactionData.reduce((sum, d) => sum + d.satisfactionScore, 0) / interactionData.length
    return {
      totalConversations,
      avgResponseTime: Number.parseFloat(avgResponseTime.toFixed(1)),
      avgResolutionRate: Number.parseFloat(avgResolutionRate.toFixed(1)),
      avgSatisfaction: Number.parseFloat(avgSatisfaction.toFixed(1)),
    }
  }, [interactionData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">User-Agent Interactions</CardTitle>
        <CardDescription>Metrics on conversations, response times, resolution, and satisfaction.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agent-filter">Filter by Agent</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger id="agent-filter">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_AGENTS.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date-range-filter">Filter by Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range-filter"
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-muted/50 rounded-lg">
            <MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <h4 className="text-sm font-medium text-muted-foreground">Total Conversations</h4>
            <p className="text-2xl font-semibold">{summaryStats.totalConversations}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <h4 className="text-sm font-medium text-muted-foreground">Avg. Response Time</h4>
            <p className="text-2xl font-semibold">{summaryStats.avgResponseTime} min</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <h4 className="text-sm font-medium text-muted-foreground">Avg. Resolution Rate</h4>
            <p className="text-2xl font-semibold">{summaryStats.avgResolutionRate}%</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <Smile className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <h4 className="text-sm font-medium text-muted-foreground">Avg. Satisfaction</h4>
            <p className="text-2xl font-semibold">{summaryStats.avgSatisfaction} / 5</p>
          </div>
        </div>

        {interactionData.length > 0 ? (
          <Plot
            data={chartData as any} // Type assertion as Plotly's Data type is complex
            layout={{
              autosize: true,
              margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
              xaxis: { title: "Date" },
              yaxis: { title: "Conversations" },
              yaxis2: {
                title: "Avg Satisfaction",
                overlaying: "y",
                side: "right",
                range: [0, 5.5], // Ensure satisfaction y-axis range is appropriate
              },
              legend: { x: 0.5, y: 1.1, orientation: "h", xanchor: "center" },
              modebar: {
                remove: [
                  "toImage",
                  "sendDataToCloud",
                  "select2d",
                  "lasso2d",
                  "zoomIn2d",
                  "zoomOut2d",
                  "autoScale2d",
                  "resetScale2d",
                  "hoverClosestCartesian",
                  "hoverCompareCartesian",
                  "toggleSpikelines",
                ],
              },
            }}
            useResizeHandler={true}
            className="w-full h-[400px]"
            config={{ responsive: true, displaylogo: false }}
          />
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No interaction data available for the selected filters.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
