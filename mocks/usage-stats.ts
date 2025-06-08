export interface UsageStatsData {
  apiRequests: {
    total: number;
    averageDaily: number;
    trend: "up" | "down" | "stable";
  };
  dataStorage: {
    total: string;
    averageWeekly: string;
    trend: "up" | "down" | "stable";
  };
  computeHours: {
    total: number;
    averageMonthly: number;
    trend: "up" | "down" | "stable";
  };
  breakdown: { category: string; usage: string }[];
}

export const usageStatsData: UsageStatsData = {
  apiRequests: { total: 12500, averageDaily: 410, trend: "up" },
  dataStorage: { total: "7.5 GB", averageWeekly: "1.2 GB", trend: "stable" },
  computeHours: { total: 150, averageMonthly: 50, trend: "down" },
  breakdown: [
    { category: "Agent A Queries", usage: "40%" },
    { category: "Data Processing Tasks", usage: "35%" },
    { category: "File Storage", usage: "25%" },
  ],
};
