"use client"

import { useState } from "react"
import { Download, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface AttendanceRecord {
  id: string
  employeeName: string
  department: string
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: "on-time" | "late" | "absent"
}

export default function AttendanceHistory() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date | undefined>(undefined)

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: "employeeName",
      header: t("name"),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "date",
      header: t("date"),
    },
    {
      accessorKey: "checkIn",
      header: t("checkIn"),
    },
    {
      accessorKey: "checkOut",
      header: t("checkOut"),
    },
    {
      accessorKey: "hoursWorked",
      header: t("hours"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => (
        <div
          className={`inline-block h-3 w-3 rounded-full ${
            row.original.status === "on-time"
              ? "bg-green-500"
              : row.original.status === "late"
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
        />
      ),
    },
  ]

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert("Exporting attendance data...")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("attendanceHistory")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">{t("attendanceHistory")}</h1>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              {t("export")}
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={mockAttendanceRecords}
          searchKey="employeeName"
          searchPlaceholder="Search by employee name..."
        />
      </main>
    </div>
  )
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "att-1",
    employeeName: "Alisher Usmanov",
    department: "Engineering",
    date: "2023-05-15",
    checkIn: "08:45",
    checkOut: "17:30",
    hoursWorked: 8.75,
    status: "on-time",
  },
  {
    id: "att-2",
    employeeName: "Dilnoza Karimova",
    department: "Finance",
    date: "2023-05-15",
    checkIn: "08:52",
    checkOut: "17:45",
    hoursWorked: 8.88,
    status: "on-time",
  },
  {
    id: "att-3",
    employeeName: "Bobur Toshmatov",
    department: "Marketing",
    date: "2023-05-15",
    checkIn: "09:05",
    checkOut: "18:00",
    hoursWorked: 8.92,
    status: "late",
  },
  {
    id: "att-4",
    employeeName: "Gulnora Azimova",
    department: "HR",
    date: "2023-05-15",
    checkIn: "08:30",
    checkOut: "17:15",
    hoursWorked: 8.75,
    status: "on-time",
  },
  {
    id: "att-5",
    employeeName: "Timur Aliyev",
    department: "Operations",
    date: "2023-05-15",
    checkIn: "09:12",
    checkOut: "18:20",
    hoursWorked: 9.13,
    status: "late",
  },
  {
    id: "att-6",
    employeeName: "Nodira Saidova",
    department: "Engineering",
    date: "2023-05-15",
    checkIn: "",
    checkOut: "",
    hoursWorked: 0,
    status: "absent",
  },
  {
    id: "att-7",
    employeeName: "Rustam Kamolov",
    department: "Finance",
    date: "2023-05-15",
    checkIn: "08:40",
    checkOut: "17:30",
    hoursWorked: 8.83,
    status: "on-time",
  },
]
