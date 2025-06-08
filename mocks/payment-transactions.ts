export interface PaymentTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
}

export const paymentTransactions: PaymentTransaction[] = [
  {
    id: "txn_1",
    date: "2024-06-01",
    description: "Monthly Subscription - Pro Plan",
    amount: 49.99,
    status: "Paid",
  },
  {
    id: "txn_2",
    date: "2024-05-20",
    description: "API Usage Overage - 5k requests",
    amount: 15.0,
    status: "Paid",
  },
  {
    id: "txn_3",
    date: "2024-05-01",
    description: "Monthly Subscription - Pro Plan",
    amount: 49.99,
    status: "Paid",
  },
  {
    id: "txn_4",
    date: "2024-04-15",
    description: "Storage Add-on - 10GB",
    amount: 9.99,
    status: "Paid",
  },
];
