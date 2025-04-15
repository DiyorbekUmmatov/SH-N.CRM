"use client"

import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { useTranslation } from "@/hooks/use-translation"

interface ReportFiltersProps {
  reportType: "daily" | "weekly" | "monthly" | "yearly"
  onReportTypeChange: (value: "daily" | "weekly" | "monthly" | "yearly") => void
  dateRange: DateRange
  onDateRangeChange: (date: DateRange) => void
  onExport: () => void
  onPrint: () => void
}

export function ReportFilters({
  reportType,
  onReportTypeChange,
  dateRange,
  onDateRangeChange,
  onExport,
  onPrint,
}: ReportFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col flex-wrap gap-2 w-full md:w-auto">
      <Select value={reportType} onValueChange={onReportTypeChange}>
        <SelectTrigger className="w-full sm:w-[300px]">
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily Report</SelectItem>
          <SelectItem value="weekly">Weekly Report</SelectItem>
          <SelectItem value="monthly">Monthly Report</SelectItem>
          <SelectItem value="yearly">Yearly Report</SelectItem>
        </SelectContent>
      </Select>

      <DateRangePicker date={dateRange} setDate={onDateRangeChange} />

      <div className="flex gap-2 w-full sm:w-auto">
        <Button className="flex-1 sm:flex-none w-[145px]" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          {t("export")}
        </Button>

        <Button variant="outline" onClick={onPrint} className="flex-1 w-[150px] sm:flex-none">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  )
}
