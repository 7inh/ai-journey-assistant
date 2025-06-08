import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define the variants using cva
const statusPillVariants = cva(
  // Base classes applied to all variants
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      intent: {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        success: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100",
        danger: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      // You can also add boolean variants, e.g., outlined:
      // outlined: {
      //   true: "border bg-transparent",
      // }
    },
    // Compound variants: apply classes when multiple variants match
    // Example:
    // compoundVariants: [
    //   {
    //     intent: "success",
    //     outlined: true,
    //     className: "border-green-500 text-green-700 dark:border-green-600 dark:text-green-400",
    //   },
    // ],
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
)

// 2. Define the props for the component, extending HTMLAttributes
//    and using VariantProps to get types for our defined variants.
export interface StatusPillProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusPillVariants> {
  // You can add any other custom props here
  label?: string // Optional label prop
}

// 3. Create the React component
const StatusPill = React.forwardRef<HTMLDivElement, StatusPillProps>(
  ({ className, intent, size, label, children, ...props }, ref) => {
    return (
      <div className={cn(statusPillVariants({ intent, size }), className)} ref={ref} {...props}>
        {label || children}
      </div>
    )
  },
)
StatusPill.displayName = "StatusPill"

export { StatusPill, statusPillVariants }
