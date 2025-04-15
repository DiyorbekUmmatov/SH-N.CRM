"use client"

import type { ColumnDef } from "@tanstack/react-table"

// Define the data structure for attendance reports
interface AttendanceReport {
  id?: string
  date: string
  employeeName: string
  department?: string
  checkIn?: string
  checkOut?: string
  hoursWorked?: number
  status: string
}

// Define the data structure for department reports
interface DepartmentReport {
  id?: string
  department: string
  totalEmployees?: number
  presentCount?: number
  lateCount?: number
  absentCount?: number
  attendanceRate: number
  averageHours?: number
}

// Define the data structure for employee reports
interface EmployeeReport {
  id?: string
  employeeName: string
  department: string
  daysPresent?: number
  daysLate?: number
  daysAbsent?: number
  totalHours?: number
  averageHours?: number
  attendanceRate?: number
}

export const attendanceColumns: ColumnDef<AttendanceReport>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
  },
  {
    accessorKey: "hoursWorked",
    header: "Hours Worked",
    cell: ({ row }) => row.original.hoursWorked?.toFixed(2) || "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div
          className={`inline-block h-3 w-3 rounded-full ${
            status === "Present" || status === "on-time"
              ? "bg-green-500"
              : status === "Late" || status === "late"
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
        />
      )
    },
  },
]

export const departmentColumns: ColumnDef<DepartmentReport>[] = [
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "totalEmployees",
    header: "Total Employees",
    cell: ({ row }) => row.original.totalEmployees?.toString() || "-",
  },
  {
    accessorKey: "presentCount",
    header: "Present",
    cell: ({ row }) => row.original.presentCount?.toString() || "-",
  },
  {
    accessorKey: "lateCount",
    header: "Late",
    cell: ({ row }) => row.original.lateCount?.toString() || "-",
  },
  {
    accessorKey: "absentCount",
    header: "Absent",
    cell: ({ row }) => row.original.absentCount?.toString() || "-",
  },
  {
    accessorKey: "attendanceRate",
    header: "Attendance Rate",
    cell: ({ row }) => `${row.original.attendanceRate}%`,
  },
  {
    accessorKey: "averageHours",
    header: "Avg. Hours",
    cell: ({ row }) => row.original.averageHours?.toFixed(2) || "-",
  },
]

export const employeeColumns: ColumnDef<EmployeeReport>[] = [
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "daysPresent",
    header: "Days Present",
    cell: ({ row }) => row.original.daysPresent?.toString() || "-",
  },
  {
    accessorKey: "daysLate",
    header: "Days Late",
    cell: ({ row }) => row.original.daysLate?.toString() || "-",
  },
  {
    accessorKey: "daysAbsent",
    header: "Days Absent",
    cell: ({ row }) => row.original.daysAbsent?.toString() || "-",
  },
  {
    accessorKey: "totalHours",
    header: "Total Hours",
    cell: ({ row }) => row.original.totalHours?.toFixed(2) || "-",
  },
  {
    accessorKey: "averageHours",
    header: "Avg. Hours/Day",
    cell: ({ row }) => row.original.averageHours?.toFixed(2) || "-",
  },
  {
    accessorKey: "attendanceRate",
    header: "Attendance Rate",
    cell: ({ row }) => (row.original.attendanceRate ? `${row.original.attendanceRate}%` : "-"),
  },
]
