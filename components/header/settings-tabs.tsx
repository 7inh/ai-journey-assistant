"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChartBig,
  CreditCardIcon,
  HardDrive,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SettingsTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "account-overview";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full overflow-x-auto pb-2 translate-y-2">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full p-0 bg-background justify-start rounded-none">
          <TabsTrigger
            value="account-overview"
            className="flex-shrink-0 rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary text-xs py-1.5"
          >
            <span className="flex items-center">
              <UserCircle className="mr-1 h-3 w-3" /> Profile
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="interaction-stats"
            className="flex-shrink-0 rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary text-xs py-1.5"
          >
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-3 w-3" /> Interaction Stats
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="usage-details"
            className="flex-shrink-0 rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary text-xs py-1.5"
          >
            <span className="flex items-center">
              <BarChartBig className="mr-1 h-3 w-3" /> Usage Details
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="storage-management"
            className="flex-shrink-0 rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary text-xs py-1.5"
          >
            <span className="flex items-center">
              <HardDrive className="mr-1 h-3 w-3" /> Storage
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="billing-history"
            className="flex-shrink-0 rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary text-xs py-1.5"
          >
            <span className="flex items-center">
              <CreditCardIcon className="mr-1 h-3 w-3" /> Billing and Usage
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
