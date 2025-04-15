import { cn } from "@/lib/utils"

type StatusType = "active" | "blocked" | "onLeave"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

// Update the StatusBadge component to show only colors without text
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-block h-3 w-3 rounded-full",
        status === "active" && "bg-green-500",
        status === "blocked" && "bg-red-500",
        status === "onLeave" && "bg-yellow-500",
        className,
      )}
    />
  )
}
