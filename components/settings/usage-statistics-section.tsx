import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus, Activity, Database, Cpu } from "lucide-react"

interface UsageMetric {
  total: string | number
  averageDaily?: string | number
  averageWeekly?: string | number
  averageMonthly?: string | number
  trend: "up" | "down" | "stable"
}

interface UsageStats {
  apiRequests: UsageMetric
  dataStorage: UsageMetric
  computeHours: UsageMetric
  breakdown: Array<{ category: string; usage: string }>
}

interface UsageStatisticsSectionProps {
  stats: UsageStats
}

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-red-500" />
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-green-500" />
  return <Minus className="h-4 w-4 text-gray-500" />
}

export function UsageStatisticsSection({ stats }: UsageStatisticsSectionProps) {
  const metrics = [
    { name: "API Requests", data: stats.apiRequests, icon: <Activity className="h-5 w-5 text-blue-500" /> },
    { name: "Data Storage", data: stats.dataStorage, icon: <Database className="h-5 w-5 text-green-500" /> },
    { name: "Compute Hours", data: stats.computeHours, icon: <Cpu className="h-5 w-5 text-purple-500" /> },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Usage Statistics
        </CardTitle>
        <CardDescription>Detailed breakdown of your resource consumption.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  {metric.icon}
                  <h4 className="text-md font-medium">{metric.name}</h4>
                </div>
                <p className="text-xl font-semibold">{metric.data.total}</p>
                <p className="text-xs text-muted-foreground">
                  Avg Daily: {metric.data.averageDaily || "N/A"} | Avg Weekly: {metric.data.averageWeekly || "N/A"} |
                  Avg Monthly: {metric.data.averageMonthly || "N/A"}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  Trend: <TrendIcon trend={metric.data.trend} />
                  <span className="ml-1">{metric.data.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Usage Breakdown by Feature</h3>
          {stats.breakdown.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature/Category</TableHead>
                  <TableHead className="text-right">Usage Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.breakdown.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.usage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No usage breakdown data available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
