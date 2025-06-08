import { UsageVisualizationSection } from "@/components/settings/usage-visualization-section";
import { UsageStatisticsSection } from "@/components/settings/usage-statistics-section";
import { StorageManagementSection } from "@/components/settings/storage-management-section";
import { PaymentTransactionHistorySection } from "@/components/settings/payment-transaction-history-section";
import { UserAgentInteractionStats } from "@/components/settings/user-agent-interaction-stats";
import { AccountProfile } from "@/components/settings/account-profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import mock data
import { usageStatsData } from "@/mocks/usage-stats";
import { storageData } from "@/mocks/storage";
import { paymentTransactions } from "@/mocks/payment-transactions";

interface SettingsPageProps {
  searchParams: { tab?: string };
}

export default function SettingsPage({ searchParams }: SettingsPageProps) {
  // Mock data is now imported from mocks directory
  const activeTab = searchParams.tab || "account-overview";

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="pt-4">
        <Tabs
          defaultValue="account-overview"
          value={activeTab}
          className="w-full"
        >
          <TabsContent value="account-overview" className="space-y-6">
            <AccountProfile />
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
            <PaymentTransactionHistorySection
              transactions={paymentTransactions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
