import { UsageVisualizationSection } from "@/components/settings/usage-visualization-section"
import { UsageStatisticsSection } from "@/components/settings/usage-statistics-section"
import { StorageManagementSection } from "@/components/settings/storage-management-section"
import { PaymentTransactionHistorySection } from "@/components/settings/payment-transaction-history-section"
import { UserAgentInteractionStats } from "@/components/settings/user-agent-interaction-stats"
import { AccountProfile } from "@/components/settings/account-profile"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, BarChartBig, HardDrive, CreditCardIcon, MessageSquare, Key, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  // Mock data - in a real app, this would come from an API
  const usageStatsData = {
    apiRequests: { total: 12500, averageDaily: 410, trend: "up" as const },
    dataStorage: { total: "7.5 GB", averageWeekly: "1.2 GB", trend: "stable" as const },
    computeHours: { total: 150, averageMonthly: 50, trend: "down" as const },
    breakdown: [
      { category: "Agent A Queries", usage: "40%" },
      { category: "Data Processing Tasks", usage: "35%" },
      { category: "File Storage", usage: "25%" },
    ],
  }

  const storageData = {
    totalStorage: "20 GB",
    usedStorage: "7.5 GB",
    files: [
      { id: "1", name: "project-alpha-report.pdf", size: "2.5 MB", lastModified: "2024-05-15" },
      { id: "2", name: "user-data-backup.zip", size: "500 MB", lastModified: "2024-05-10" },
      { id: "3", name: "meeting-notes-q1.docx", size: "800 KB", lastModified: "2024-04-20" },
    ],
  }

  const paymentTransactions = [
    {
      id: "txn_1",
      date: "2024-06-01",
      description: "Monthly Subscription - Pro Plan",
      amount: 49.99,
      status: "Paid" as const,
    },
    {
      id: "txn_2",
      date: "2024-05-20",
      description: "API Usage Overage - 5k requests",
      amount: 15.0,
      status: "Paid" as const,
    },
    {
      id: "txn_3",
      date: "2024-05-01",
      description: "Monthly Subscription - Pro Plan",
      amount: 49.99,
      status: "Paid" as const,
    },
    { id: "txn_4", date: "2024-04-15", description: "Storage Add-on - 10GB", amount: 9.99, status: "Paid" as const },
  ]

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="mb-8 border-b border-border pb-2">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>

          <Tabs defaultValue="account-overview" className="w-full">
            <TabsList className="flex h-10 w-full overflow-x-auto space-x-1 sm:space-x-2 mb-6">
              <TabsTrigger value="account-overview" className="flex-shrink-0">
                <UserCircle className="mr-2 h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-shrink-0">
                <Palette className="mr-2 h-4 w-4" /> Appearance
              </TabsTrigger>
              <TabsTrigger value="interaction-stats" className="flex-shrink-0">
                <MessageSquare className="mr-2 h-4 w-4" /> Interaction Stats
              </TabsTrigger>
              <TabsTrigger value="usage-details" className="flex-shrink-0">
                <BarChartBig className="mr-2 h-4 w-4" /> Usage Details
              </TabsTrigger>
              <TabsTrigger value="storage-management" className="flex-shrink-0">
                <HardDrive className="mr-2 h-4 w-4" /> Storage
              </TabsTrigger>
              <TabsTrigger value="billing-history" className="flex-shrink-0">
                <CreditCardIcon className="mr-2 h-4 w-4" /> Billing and Usage
              </TabsTrigger>
              <TabsTrigger value="api-keys" className="flex-shrink-0">
                <Key className="mr-2 h-4 w-4" /> API Keys
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account-overview" className="space-y-6">
              <AccountProfile />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the appearance of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Theme</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Choose how the interface looks. System will follow your device's theme.
                      </p>
                      <ThemeToggle size="lg" showLabel={false} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interaction-stats">
              <UserAgentInteractionStats />
            </TabsContent>

            <TabsContent value="usage-details" className="space-y-6">
              <UsageVisualizationSection />
              <UsageStatisticsSection stats={usageStatsData} />
            </TabsContent>

            <TabsContent value="storage-management">
              <StorageManagementSection storage={storageData} />
            </TabsContent>

            <TabsContent value="billing-history">
              <PaymentTransactionHistorySection transactions={paymentTransactions} />
            </TabsContent>

            <TabsContent value="api-keys">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for application integration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="api-key">API Key</Label>
                        <Button variant="outline" size="sm">
                          Generate New Key
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                        <Button variant="ghost" size="sm">
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your API key provides full access to your account. Keep it secure and never share it publicly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </header>
    </div>
  )
}
