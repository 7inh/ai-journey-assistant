import { AccountProfile } from "@/components/settings/account-profile";
import { PaymentTransactionHistorySection } from "@/components/settings/payment-transaction-history-section";
import { StorageManagementSection } from "@/components/settings/storage-management-section";
import { UsageStatisticsSection } from "@/components/settings/usage-statistics-section";
import { UsageVisualizationSection } from "@/components/settings/usage-visualization-section";
import { UserAgentInteractionStats } from "@/components/settings/user-agent-interaction-stats";

// Import mock data
import { paymentTransactions } from "@/mocks/payment-transactions";
import { storageData } from "@/mocks/storage";
import { usageStatsData } from "@/mocks/usage-stats";

interface SettingsPageProps {
  searchParams: { tab?: string };
}

export default function SettingsPage({ searchParams }: SettingsPageProps) {
  // Mock data is now imported from mocks directory
  const activeTab = searchParams.tab || "account-overview";

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="pt-4">
        <div className="space-y-6">
          {activeTab === "account-overview" && <AccountProfile />}

          {activeTab === "interaction-stats" && <UserAgentInteractionStats />}

          {activeTab === "usage-details" && (
            <>
              <UsageVisualizationSection />
              <UsageStatisticsSection stats={usageStatsData} />
            </>
          )}

          {activeTab === "storage-management" && (
            <StorageManagementSection storage={storageData} />
          )}

          {activeTab === "billing-history" && (
            <PaymentTransactionHistorySection
              transactions={paymentTransactions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
