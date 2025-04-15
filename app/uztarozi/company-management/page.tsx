"use client"

import { useState } from "react"
import { BarChart3, Edit, Plus, Trash } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { CompanyDialog } from "./company-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Company {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  status: "active" | "blocked" | "onLeave"
  totalCargo: number
}

export default function CompanyManagement() {
  const { t } = useTranslation()
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "totalCargo",
      header: "Total Cargo (kg)",
      cell: ({ row }) => row.original.totalCargo.toLocaleString(),
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
              setSelectedCompany(row.original)
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
              setSelectedCompany(row.original)
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

  const handleAddCompany = (company: Omit<Company, "id" | "totalCargo">) => {
    const newCompany = {
      ...company,
      id: `company-${Date.now()}`,
      totalCargo: 0,
    }
    setCompanies([newCompany, ...companies])
    setIsAddDialogOpen(false)
  }

  const handleEditCompany = (company: Company) => {
    setCompanies(companies.map((c) => (c.id === company.id ? company : c)))
    setIsEditDialogOpen(false)
    setSelectedCompany(null)
  }

  const handleDeleteCompany = () => {
    if (selectedCompany) {
      setCompanies(companies.filter((c) => c.id !== selectedCompany.id))
      setIsDeleteDialogOpen(false)
      setSelectedCompany(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("companyManagement")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("companyManagement")}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNew")}
          </Button>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-xs text-muted-foreground">
                {companies.filter((c) => c.status === "active").length} active companies
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Cargo Handled</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {companies.reduce((sum, company) => sum + company.totalCargo, 0).toLocaleString()} kg
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Cargo per Company</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  companies.reduce((sum, company) => sum + company.totalCargo, 0) / companies.length,
                ).toLocaleString()}{" "}
                kg
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={companies} searchKey="name" searchPlaceholder="Search by company name..." />

        <CompanyDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddCompany}
          title={`${t("addNew")} ${t("company")}`}
        />

        {selectedCompany && (
          <>
            <CompanyDialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              onSave={handleEditCompany}
              title={`${t("edit")} ${t("company")}`}
              defaultValues={selectedCompany}
            />

            <ConfirmDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              title="Delete Company"
              description={`Are you sure you want to delete company ${selectedCompany.name}? This action cannot be undone.`}
              onConfirm={handleDeleteCompany}
            />
          </>
        )}
      </main>
    </div>
  )
}

const mockCompanies: Company[] = [
  {
    id: "company-1",
    name: "UzLogistics",
    contactPerson: "Akmal Karimov",
    phone: "+998 90 123 4567",
    email: "info@uzlogistics.uz",
    status: "active",
    totalCargo: 125480,
  },
  {
    id: "company-2",
    name: "TransCargo LLC",
    contactPerson: "Dilshod Rakhimov",
    phone: "+998 90 234 5678",
    email: "contact@transcargo.uz",
    status: "active",
    totalCargo: 98750,
  },
  {
    id: "company-3",
    name: "SilkRoad Transport",
    contactPerson: "Feruza Azimova",
    phone: "+998 90 345 6789",
    email: "info@silkroad-transport.uz",
    status: "active",
    totalCargo: 76320,
  },
  {
    id: "company-4",
    name: "Tashkent Shipping",
    contactPerson: "Jahongir Usmanov",
    phone: "+998 90 456 7890",
    email: "contact@tashkentshipping.uz",
    status: "blocked",
    totalCargo: 54890,
  },
  {
    id: "company-5",
    name: "UzbekExpress",
    contactPerson: "Malika Turaeva",
    phone: "+998 90 567 8901",
    email: "info@uzbekexpress.uz",
    status: "active",
    totalCargo: 32450,
  },
]
