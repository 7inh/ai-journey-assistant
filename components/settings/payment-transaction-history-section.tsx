"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CreditCard, DownloadCloud } from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: "Paid" | "Pending" | "Failed"
}

interface PaymentTransactionHistorySectionProps {
  transactions: Transaction[]
}

export function PaymentTransactionHistorySection({ transactions }: PaymentTransactionHistorySectionProps) {
  // Mock handlers for filtering and download
  const handleFilterChange = (filterType: string, value: string) => {
    console.log(`Filtering transactions by ${filterType}: ${value}`)
  }
  const handleDownloadCSV = () => alert("Download CSV functionality to be implemented.")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          Payment Transaction History
        </CardTitle>
        <CardDescription>Review your past payments and download transaction details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="flex gap-2 flex-grow w-full sm:w-auto">
            <Select onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by status">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            {/* Basic date range placeholder - real app would use DatePicker */}
            <Input
              type="text"
              placeholder="Date Range (e.g., YYYY-MM)"
              className="w-full sm:w-[180px]"
              aria-label="Filter by date range"
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            />
          </div>
          <Button onClick={handleDownloadCSV} variant="outline" className="w-full sm:w-auto">
            <DownloadCloud className="mr-2 h-4 w-4" /> Download CSV
          </Button>
        </div>

        {transactions.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Paid"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No transaction history available.</p>
        )}
      </CardContent>
    </Card>
  )
}
