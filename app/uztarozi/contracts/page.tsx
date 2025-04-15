"use client"

import { useState } from "react"
import { Download, Plus, Trash } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { ContractDialog } from "./contract-dialog"

interface Contract {
  id: string
  name: string
  company: string
  type: string
  startDate: string
  endDate: string
  hasFile: boolean
}

export default function Contracts() {
  const { t } = useTranslation()
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const columns: ColumnDef<Contract>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "company",
      header: t("company"),
    },
    {
      accessorKey: "type",
      header: t("type"),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "hasFile",
      header: "File",
      cell: ({ row }) => (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.original.hasFile
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          }`}
        >
          {row.original.hasFile ? "Uploaded" : "Missing"}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.hasFile && (
            <Button variant="ghost" size="icon" onClick={() => handleDownload(row.original.id)}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedContract(row.original)
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

  const handleAddContract = (contract: Omit<Contract, "id">) => {
    const newContract = {
      ...contract,
      id: `contract-${Date.now()}`,
    }
    setContracts([newContract, ...contracts])
    setIsAddDialogOpen(false)
  }

  const handleDeleteContract = () => {
    if (selectedContract) {
      setContracts(contracts.filter((c) => c.id !== selectedContract.id))
      setIsDeleteDialogOpen(false)
      setSelectedContract(null)
    }
  }

  const handleDownload = (contractId: string) => {
    // In a real app, this would download the contract file
    alert(`Downloading contract ${contractId}...`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("contracts")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("contracts")}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNew")}
          </Button>
        </div>

        <DataTable columns={columns} data={contracts} searchKey="name" searchPlaceholder="Search by contract name..." />

        <ContractDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddContract}
          title={`${t("addNew")} ${t("contracts")}`}
        />

        {selectedContract && (
          <ConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="Delete Contract"
            description={`Are you sure you want to delete contract ${selectedContract.name}? This action cannot be undone.`}
            onConfirm={handleDeleteContract}
          />
        )}
      </main>
    </div>
  )
}

const mockContracts: Contract[] = [
  {
    id: "contract-1",
    name: "Annual Transport Agreement",
    company: "UzLogistics",
    type: "Transport",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    hasFile: true,
  },
  {
    id: "contract-2",
    name: "Cargo Handling Services",
    company: "TransCargo LLC",
    type: "Service",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    hasFile: true,
  },
  {
    id: "contract-3",
    name: "Vehicle Maintenance Agreement",
    company: "SilkRoad Transport",
    type: "Maintenance",
    startDate: "2023-03-10",
    endDate: "2024-03-09",
    hasFile: false,
  },
  {
    id: "contract-4",
    name: "International Shipping Contract",
    company: "Tashkent Shipping",
    type: "Shipping",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    hasFile: true,
  },
  {
    id: "contract-5",
    name: "Express Delivery Agreement",
    company: "UzbekExpress",
    type: "Delivery",
    startDate: "2023-05-15",
    endDate: "2024-05-14",
    hasFile: true,
  },
]
