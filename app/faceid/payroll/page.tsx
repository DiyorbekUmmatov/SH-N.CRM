"use client"

import { useState } from "react"
import { Calculator, Download, Edit, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { PayrollDialog } from "./payroll-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PayrollRecord {
  id: string
  employeeName: string
  department: string
  hoursWorked: number
  baseSalary: number
  bonus: number
  penalty: number
  totalSalary: number
}

export default function Payroll() {
  const { t } = useTranslation()
  const [month, setMonth] = useState<Date | undefined>(new Date())
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null)

  const columns: ColumnDef<PayrollRecord>[] = [
    {
      accessorKey: "employeeName",
      header: t("name"),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "hoursWorked",
      header: t("hours"),
    },
    {
      accessorKey: "baseSalary",
      header: "Base Salary",
      cell: ({ row }) => `$${row.original.baseSalary.toLocaleString()}`,
    },
    {
      accessorKey: "bonus",
      header: t("bonus"),
      cell: ({ row }) => `$${row.original.bonus.toLocaleString()}`,
    },
    {
      accessorKey: "penalty",
      header: t("penalty"),
      cell: ({ row }) => `$${row.original.penalty.toLocaleString()}`,
    },
    {
      accessorKey: "totalSalary",
      header: t("total"),
      cell: ({ row }) => `$${row.original.totalSalary.toLocaleString()}`,
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedRecord(row.original)
            setIsDialogOpen(true)
          }}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">{t("edit")}</span>
        </Button>
      ),
    },
  ]

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert("Exporting payroll data...")
  }

  const handleCalculateSalaries = () => {
    // In a real app, this would trigger a calculation based on attendance
    alert("Calculating salaries based on attendance records...")
  }

  const handleSavePayroll = (record: PayrollRecord) => {
    setPayrollRecords(payrollRecords.map((r) => (r.id === record.id ? record : r)))
    setIsDialogOpen(false)
    setSelectedRecord(null)
  }

  // Calculate total values for summary cards
  const totalEmployees = payrollRecords.length
  const totalHours = payrollRecords.reduce((sum, record) => sum + record.hoursWorked, 0)
  const totalSalary = payrollRecords.reduce((sum, record) => sum + record.totalSalary, 0)
  const averageSalary = Math.round(totalSalary / totalEmployees)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("payroll")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">{t("payroll")}</h1>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {month ? format(month, "MMMM yyyy") : "Select month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={month} onSelect={setMonth} initialFocus />
              </PopoverContent>
            </Popover>

            <Button variant="outline" onClick={handleCalculateSalaries}>
              <Calculator className="mr-2 h-4 w-4" />
              {t("calculateSalary")}
            </Button>

            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              {t("export")}
            </Button>
          </div>
        </div>

        {/* Add summary cards */}
        <div className="grid gap-4 mb-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSalary.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageSalary.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={payrollRecords}
          searchKey="employeeName"
          searchPlaceholder="Search by employee name..."
        />

        {selectedRecord && (
          <PayrollDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            record={selectedRecord}
            onSave={handleSavePayroll}
          />
        )}
      </main>
    </div>
  )
}

const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "pay-1",
    employeeName: "Alisher Usmanov",
    department: "Engineering",
    hoursWorked: 176,
    baseSalary: 3500000,
    bonus: 500000,
    penalty: 0,
    totalSalary: 4000000,
  },
  {
    id: "pay-2",
    employeeName: "Dilnoza Karimova",
    department: "Finance",
    hoursWorked: 180,
    baseSalary: 3200000,
    bonus: 300000,
    penalty: 0,
    totalSalary: 3500000,
  },
  {
    id: "pay-3",
    employeeName: "Bobur Toshmatov",
    department: "Marketing",
    hoursWorked: 168,
    baseSalary: 2800000,
    bonus: 200000,
    penalty: 100000,
    totalSalary: 2900000,
  },
  {
    id: "pay-4",
    employeeName: "Gulnora Azimova",
    department: "HR",
    hoursWorked: 176,
    baseSalary: 3000000,
    bonus: 250000,
    penalty: 0,
    totalSalary: 3250000,
  },
  {
    id: "pay-5",
    employeeName: "Timur Aliyev",
    department: "Operations",
    hoursWorked: 172,
    baseSalary: 2600000,
    bonus: 0,
    penalty: 150000,
    totalSalary: 2450000,
  },
  {
    id: "pay-6",
    employeeName: "Nodira Saidova",
    department: "Engineering",
    hoursWorked: 160,
    baseSalary: 3200000,
    bonus: 0,
    penalty: 200000,
    totalSalary: 3000000,
  },
  {
    id: "pay-7",
    employeeName: "Rustam Kamolov",
    department: "Finance",
    hoursWorked: 176,
    baseSalary: 3100000,
    bonus: 400000,
    penalty: 0,
    totalSalary: 3500000,
  },
]
