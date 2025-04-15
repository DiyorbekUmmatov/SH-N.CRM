"use client"

import { useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useTranslation } from "@/hooks/use-translation"
import type { ColumnDef } from "@tanstack/react-table"
import { VehicleDialog } from "./vehicle-dialog"

// Update the Vehicle interface to include new fields
interface Vehicle {
  id: string
  plateNumber: string
  type: string
  company: string
  status: "active" | "blocked" | "onLeave"
  lastEntry: string
  cargoName?: string
  cargoWeight?: number
  price?: number
}

export default function VehicleManagement() {
  const { t } = useTranslation()
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Update the columns definition to include new columns
  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: "plateNumber",
      header: t("plateNumber"),
    },
    {
      accessorKey: "type",
      header: t("type"),
    },
    {
      accessorKey: "company",
      header: t("company"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "cargoName",
      header: t("cargoName"),
      cell: ({ row }) => row.original.cargoName || "-",
    },
    {
      accessorKey: "cargoWeight",
      header: t("weight"),
      cell: ({ row }) => (row.original.cargoWeight ? `${row.original.cargoWeight} kg` : "-"),
    },
    {
      accessorKey: "price",
      header: t("cost"),
      cell: ({ row }) => (row.original.price ? `${row.original.price.toLocaleString()} UZS` : "-"),
    },
    {
      accessorKey: "lastEntry",
      header: "Last Entry",
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
              setSelectedVehicle(row.original)
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
              setSelectedVehicle(row.original)
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

  const handleAddVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle = {
      ...vehicle,
      id: `vehicle-${Date.now()}`,
      lastEntry: "N/A",
    }
    setVehicles([newVehicle, ...vehicles])
    setIsAddDialogOpen(false)
  }

  const handleEditVehicle = (vehicle: Vehicle) => {
    setVehicles(vehicles.map((v) => (v.id === vehicle.id ? vehicle : v)))
    setIsEditDialogOpen(false)
    setSelectedVehicle(null)
  }

  const handleDeleteVehicle = () => {
    if (selectedVehicle) {
      setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id))
      setIsDeleteDialogOpen(false)
      setSelectedVehicle(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("vehicleManagement")} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("vehicleManagement")}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNew")}
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={vehicles}
          searchKey="plateNumber"
          searchPlaceholder="Search by plate number..."
        />

        <VehicleDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddVehicle}
          title={`${t("addNew")} ${t("vehicleManagement")}`}
        />

        {selectedVehicle && (
          <VehicleDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSave={handleEditVehicle}
            title={`${t("edit")} ${t("vehicleManagement")}`}
            defaultValues={selectedVehicle}
          />
        )}

        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="Delete Vehicle"
          description={`Are you sure you want to delete vehicle ${selectedVehicle?.plateNumber}? This action cannot be undone.`}
          onConfirm={handleDeleteVehicle}
        />
      </main>
    </div>
  )
}

// Update the mock data to include the new fields
const mockVehicles: Vehicle[] = [
  {
    id: "vehicle-1",
    plateNumber: "01A123BB",
    type: "Truck",
    company: "UzLogistics",
    status: "active",
    lastEntry: "2023-05-15 14:30",
    cargoName: "Cotton",
    cargoWeight: 5200,
    price: 3500000,
  },
  {
    id: "vehicle-2",
    plateNumber: "01B456CC",
    type: "Van",
    company: "TransCargo LLC",
    status: "active",
    lastEntry: "2023-05-14 09:15",
    cargoName: "Electronics",
    cargoWeight: 1800,
    price: 4200000,
  },
  {
    id: "vehicle-3",
    plateNumber: "01C789DD",
    type: "Truck",
    company: "SilkRoad Transport",
    status: "blocked",
    lastEntry: "2023-05-10 11:45",
    cargoName: "Textiles",
    cargoWeight: 4500,
    price: 2800000,
  },
  {
    id: "vehicle-4",
    plateNumber: "01D012EE",
    type: "Truck",
    company: "Tashkent Shipping",
    status: "active",
    lastEntry: "2023-05-13 16:20",
    cargoName: "Machinery",
    cargoWeight: 7800,
    price: 5600000,
  },
  {
    id: "vehicle-5",
    plateNumber: "01E345FF",
    type: "Van",
    company: "UzbekExpress",
    status: "onLeave",
    lastEntry: "2023-05-08 10:30",
    cargoName: "Fruits",
    cargoWeight: 2200,
    price: 1800000,
  },
]
