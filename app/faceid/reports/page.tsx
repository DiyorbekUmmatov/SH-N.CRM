"use client"

import { useState } from "react"
import { TrendingUp, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { useTranslation } from "@/hooks/use-translation"
import { addDays } from "date-fns"
import { ReportFilters } from "./report-filters"
import { ReportChart } from "@/components/report-chart"
import { SummaryCardsGrid } from "@/components/summary-cards"
import { ResponsiveTabs } from "@/components/responsive-tabs"
import { attendanceColumns, departmentColumns, employeeColumns } from "./columns"

// Define the data structure for attendance reports
interface AttendanceReport {
  id: string
  date: string
  employeeName: string
  department: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: "on-time" | "late" | "absent"
}

// Define the data structure for department reports
interface DepartmentReport {
  id: string
  department: string
  totalEmployees: number
  presentCount: number
  lateCount: number
  absentCount: number
  attendanceRate: number
  averageHours: number
}

// Define the data structure for employee reports
interface EmployeeReport {
  id: string
  employeeName: string
  department: string
  daysPresent: number
  daysLate: number
  daysAbsent: number
  totalHours: number
  averageHours: number
}

export default function FaceIdReports() {
  const { t } = useTranslation()
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const [isLoading, setIsLoading] = useState(false)

  // Simulate data loading when changing filters
  const handleFilterChange = (value: "daily" | "weekly" | "monthly" | "yearly") => {
    setIsLoading(true)
    setReportType(value)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Handle date range change
  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    setIsLoading(true)
    setDate(newDate)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Handle export
  const handleExport = () => {
    alert(`Exporting ${reportType} report data...`)
  }

  // Calculate summary data
  const totalEmployees = mockDepartmentReports.reduce((sum, dept) => sum + dept.totalEmployees, 0)
  const presentCount = mockDepartmentReports.reduce((sum, dept) => sum + dept.presentCount, 0)
  const lateCount = mockDepartmentReports.reduce((sum, dept) => sum + dept.lateCount, 0)
  const absentCount = mockDepartmentReports.reduce((sum, dept) => sum + dept.absentCount, 0)
  const attendanceRate = Math.round(((presentCount + lateCount) / (presentCount + lateCount + absentCount)) * 100)

  return (
    <div className="flex flex-col w-full   min-h-screen">
      <Navbar title={t("reports")} />
      <main className="flex-1  p-6">
        <div className="mb-6 flex flex-col  md:flex-row justify-between items-center  md:items-center gap-4">
          <h1 className="text-2xl font-bold">{t("reports")}</h1>
          <ReportFilters
            
            reportType={reportType}
            onReportTypeChange={handleFilterChange}
            dateRange={date}
            onDateRangeChange={handleDateChange}
            onExport={handleExport}
            onPrint={() => window.print()}
          />
          {/* <img src="https://picsum.photos/200" alt="" /> */}
        </div>

        {/* Summary Cards */}
        <SummaryCardsGrid
          isLoading={isLoading}
          cards={[
            {
              title: "Total Employees",
              value: totalEmployees,
              description: "For selected period",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Present",
              value: presentCount,
              description: "On-time employees",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Late",
              value: lateCount,
              description: "Late arrivals",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Attendance Rate",
              value: `${attendanceRate}%`,
              description: "Overall attendance",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
          ]}
        />

        {/* Charts */}
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <ReportChart
            title="Attendance by Department"
            description="Attendance rates across departments"
            chartType="pie"
            isLoading={isLoading}
            data={{
              labels: mockDepartmentReports.map((dept) => dept.department),
              datasets: [
                {
                  label: "Attendance Rate (%)",
                  data: mockDepartmentReports.map((dept) => dept.attendanceRate),
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                  ],
                },
              ],
            }}
          />
          <ReportChart
            title="Daily Attendance Trend"
            description="Attendance over time"
            chartType="bar"
            isLoading={isLoading}
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "Present",
                  data: [38, 40, 37, 39, 35, 20, 15],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Late",
                  data: [5, 3, 6, 4, 8, 2, 1],
                  backgroundColor: "rgba(255, 206, 86, 0.6)",
                  borderColor: "rgba(255, 206, 86, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>

        {/* Tabbed Reports */}
        <ResponsiveTabs
          tabs={[
            {
              value: "attendance",
              label: "Attendance Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Reports</CardTitle>
                    <CardDescription>Detailed attendance data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">Loading report data...</p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={attendanceColumns}
                        data={mockAttendanceReports}
                        searchKey="employeeName"
                        searchPlaceholder="Search by employee name..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "departments",
              label: "Department Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Department Reports</CardTitle>
                    <CardDescription>Aggregated data by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">Loading report data...</p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={departmentColumns}
                        data={mockDepartmentReports}
                        searchKey="department"
                        searchPlaceholder="Search by department name..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "employees",
              label: "Employee Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Reports</CardTitle>
                    <CardDescription>Aggregated data by employee</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">Loading report data...</p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={employeeColumns}
                        data={mockEmployeeReports}
                        searchKey="employeeName"
                        searchPlaceholder="Search by employee name..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </main>
    </div>
  )
}

// Mock data for attendance reports
const mockAttendanceReports: AttendanceReport[] = [
  {
    id: "ar-1",
    date: "2023-05-15",
    employeeName: "Alisher Usmanov",
    department: "Engineering",
    checkIn: "08:45",
    checkOut: "17:30",
    hoursWorked: 8.75,
    status: "on-time",
  },
  {
    id: "ar-2",
    date: "2023-05-15",
    employeeName: "Dilnoza Karimova",
    department: "Finance",
    checkIn: "08:52",
    checkOut: "17:45",
    hoursWorked: 8.88,
    status: "on-time",
  },
  {
    id: "ar-3",
    date: "2023-05-15",
    employeeName: "Bobur Toshmatov",
    department: "Marketing",
    checkIn: "09:05",
    checkOut: "18:00",
    hoursWorked: 8.92,
    status: "late",
  },
  {
    id: "ar-4",
    date: "2023-05-15",
    employeeName: "Gulnora Azimova",
    department: "HR",
    checkIn: "08:30",
    checkOut: "17:15",
    hoursWorked: 8.75,
    status: "on-time",
  },
  {
    id: "ar-5",
    date: "2023-05-15",
    employeeName: "Timur Aliyev",
    department: "Operations",
    checkIn: "09:12",
    checkOut: "18:20",
    hoursWorked: 9.13,
    status: "late",
  },
  {
    id: "ar-6",
    date: "2023-05-15",
    employeeName: "Nodira Saidova",
    department: "Engineering",
    checkIn: "",
    checkOut: "",
    hoursWorked: 0,
    status: "absent",
  },
  {
    id: "ar-7",
    date: "2023-05-16",
    employeeName: "Alisher Usmanov",
    department: "Engineering",
    checkIn: "08:40",
    checkOut: "17:35",
    hoursWorked: 8.92,
    status: "on-time",
  },
  {
    id: "ar-8",
    date: "2023-05-16",
    employeeName: "Dilnoza Karimova",
    department: "Finance",
    checkIn: "08:50",
    checkOut: "17:40",
    hoursWorked: 8.83,
    status: "on-time",
  },
]

// Mock data for department reports
const mockDepartmentReports: DepartmentReport[] = [
  {
    id: "dr-1",
    department: "Engineering",
    totalEmployees: 12,
    presentCount: 10,
    lateCount: 1,
    absentCount: 1,
    attendanceRate: 92,
    averageHours: 8.65,
  },
  {
    id: "dr-2",
    department: "Finance",
    totalEmployees: 8,
    presentCount: 7,
    lateCount: 0,
    absentCount: 1,
    attendanceRate: 88,
    averageHours: 8.78,
  },
  {
    id: "dr-3",
    department: "Marketing",
    totalEmployees: 6,
    presentCount: 4,
    lateCount: 2,
    absentCount: 0,
    attendanceRate: 100,
    averageHours: 8.85,
  },
  {
    id: "dr-4",
    department: "HR",
    totalEmployees: 4,
    presentCount: 4,
    lateCount: 0,
    absentCount: 0,
    attendanceRate: 100,
    averageHours: 8.7,
  },
  {
    id: "dr-5",
    department: "Operations",
    totalEmployees: 10,
    presentCount: 7,
    lateCount: 2,
    absentCount: 1,
    attendanceRate: 90,
    averageHours: 8.95,
  },
]

// Mock data for employee reports
const mockEmployeeReports: EmployeeReport[] = [
  {
    id: "er-1",
    employeeName: "Alisher Usmanov",
    department: "Engineering",
    daysPresent: 20,
    daysLate: 1,
    daysAbsent: 0,
    totalHours: 182.5,
    averageHours: 8.68,
  },
  {
    id: "er-2",
    employeeName: "Dilnoza Karimova",
    department: "Finance",
    daysPresent: 19,
    daysLate: 2,
    daysAbsent: 0,
    totalHours: 180.2,
    averageHours: 8.58,
  },
  {
    id: "er-3",
    employeeName: "Bobur Toshmatov",
    department: "Marketing",
    daysPresent: 15,
    daysLate: 4,
    daysAbsent: 2,
    totalHours: 165.8,
    averageHours: 8.73,
  },
  {
    id: "er-4",
    employeeName: "Gulnora Azimova",
    department: "HR",
    daysPresent: 21,
    daysLate: 0,
    daysAbsent: 0,
    totalHours: 183.8,
    averageHours: 8.75,
  },
  {
    id: "er-5",
    employeeName: "Timur Aliyev",
    department: "Operations",
    daysPresent: 16,
    daysLate: 3,
    daysAbsent: 2,
    totalHours: 168.5,
    averageHours: 8.87,
  },
]
