"use client"

import { useState } from "react"
import { Edit, FileText, Plus, Trash } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { EmployeeDialog } from "./employee-dialog"
import { ContractDialog } from "./contract-dialog"

interface Employee {
  id: string
  name: string
  role: string
  department: string
  contact: string
  status: "active" | "blocked" | "onLeave"
  hasContract: boolean
}

export default function EmployeeManagement() {
  const { t } = useTranslation()
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "role",
      header: t("role"),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "contact",
      header: t("contact"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "hasContract",
      header: "Contract",
      cell: ({ row }) => (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.original.hasContract
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          }`}
        >
          {row.original.hasContract ? "Yes" : "No"}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedEmployee(row.original)
              setIsEditDialogOpen(true)
            }}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">{t("edit")}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedEmployee(row.original)
              setIsContractDialogOpen(true)
            }}
          >
            <FileText className="h-4 w-4" />
            <span className="sr-only">{t("uploadContract")}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedEmployee(row.original)
              setIsDeleteDialogOpen(true)
            }}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">{t("delete")}</span>
          </Button>
        </div>
      ),
    },
  ]

  const handleAddEmployee = (employee: Omit<Employee, "id" | "hasContract">) => {
    const newEmployee = {
      ...employee,
      id: `emp-${Date.now()}`,
      hasContract: false,
    }
    setEmployees([newEmployee, ...employees])
    setIsAddDialogOpen(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEmployees(employees.map((e) => (e.id === employee.id ? employee : e)))
    setIsEditDialogOpen(false)
    setSelectedEmployee(null)
  }

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter((e) => e.id !== selectedEmployee.id))
      setIsDeleteDialogOpen(false)
      setSelectedEmployee(null)
    }
  }

  const handleUploadContract = (employeeId: string) => {
    setEmployees(employees.map((e) => (e.id === employeeId ? { ...e, hasContract: true } : e)))
    setIsContractDialogOpen(false)
    setSelectedEmployee(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("employeeManagement")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("employeeManagement")}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNew")}
          </Button>
        </div>

        <DataTable columns={columns} data={employees} searchKey="name" searchPlaceholder="Search by name..." />

        <EmployeeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddEmployee}
          title={`${t("addNew")} ${t("employeeManagement")}`}
        />

        {selectedEmployee && (
          <>
            <EmployeeDialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              onSave={handleEditEmployee}
              title={`${t("edit")} ${t("employeeManagement")}`}
              defaultValues={selectedEmployee}
            />

            <ContractDialog
              open={isContractDialogOpen}
              onOpenChange={setIsContractDialogOpen}
              employeeId={selectedEmployee.id}
              employeeName={selectedEmployee.name}
              onUpload={handleUploadContract}
            />

            <ConfirmDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              title="Delete Employee"
              description={`Are you sure you want to delete employee ${selectedEmployee.name}? This action cannot be undone.`}
              onConfirm={handleDeleteEmployee}
            />
          </>
        )}
      </main>
    </div>
  )
}

const mockEmployees: Employee[] = [
  {
    id: "emp-1",
    name: "Alisher Usmanov",
    role: "Software Engineer",
    department: "Engineering",
    contact: "+998 90 123 4567",
    status: "active",
    hasContract: true,
  },
  {
    id: "emp-2",
    name: "Dilnoza Karimova",
    role: "Financial Analyst",
    department: "Finance",
    contact: "+998 90 234 5678",
    status: "active",
    hasContract: true,
  },
  {
    id: "emp-3",
    name: "Bobur Toshmatov",
    role: "Marketing Specialist",
    department: "Marketing",
    contact: "+998 90 345 6789",
    status: "active",
    hasContract: false,
  },
  {
    id: "emp-4",
    name: "Gulnora Azimova",
    role: "HR Manager",
    department: "HR",
    contact: "+998 90 456 7890",
    status: "active",
    hasContract: true,
  },
  {
    id: "emp-5",
    name: "Timur Aliyev",
    role: "Operations Manager",
    department: "Operations",
    contact: "+998 90 567 8901",
    status: "blocked",
    hasContract: true,
  },
  {
    id: "emp-6",
    name: "Nodira Saidova",
    role: "QA Engineer",
    department: "Engineering",
    contact: "+998 90 678 9012",
    status: "onLeave",
    hasContract: true,
  },
  {
    id: "emp-7",
    name: "Rustam Kamolov",
    role: "Accountant",
    department: "Finance",
    contact: "+998 90 789 0123",
    status: "active",
    hasContract: true,
  },
]
