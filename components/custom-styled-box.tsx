import type React from "react"

interface CustomStyledBoxProps {
  title: string
  children: React.ReactNode
  className?: string
}

const CustomStyledBox = ({ title, children, className }: CustomStyledBoxProps) => (
  <div
    className={`
      p-md bg-accent text-accent-foreground 
      border border-border rounded-lg text-lg mb-sm 
      ${className ?? ""}
    `}
  >
    <h3 className="text-xl mb-xs font-semibold">{title}</h3>
    {children}
  </div>
)

export default CustomStyledBox
