"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"

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

interface VehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (vehicle: Vehicle) => void
  title: string
  defaultValues?: Vehicle
}

export function VehicleDialog({ open, onOpenChange, onSave, title, defaultValues }: VehicleDialogProps) {
  const { t } = useTranslation()
  const [plateNumber, setPlateNumber] = useState(defaultValues?.plateNumber || "")
  const [type, setType] = useState(defaultValues?.type || "")
  const [company, setCompany] = useState(defaultValues?.company || "")
  const [status, setStatus] = useState<"active" | "blocked" | "onLeave">(defaultValues?.status || "active")
  const [cargoName, setCargoName] = useState(defaultValues?.cargoName || "")
  const [cargoWeight, setCargoWeight] = useState<number | undefined>(defaultValues?.cargoWeight)
  const [price, setPrice] = useState<number | undefined>(defaultValues?.price)

  const handleSave = () => {
    const vehicle = {
      ...(defaultValues && { id: defaultValues.id }),
      plateNumber,
      type,
      company,
      status,
      ...(defaultValues && { lastEntry: defaultValues.lastEntry }),
      cargoName: cargoName || undefined,
      cargoWeight: cargoWeight || undefined,
      price: price || undefined,
    }
    onSave(vehicle)

    // Reset form if not editing
    if (!defaultValues) {
      setPlateNumber("")
      setType("")
      setCompany("")
      setStatus("active")
      setCargoName("")
      setCargoWeight(undefined)
      setPrice(undefined)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="plateNumber">{t("plateNumber")}</Label>
            <Input
              id="plateNumber"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="01A123BB"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">{t("type")}</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Truck">Truck</SelectItem>
                <SelectItem value="Van">Van</SelectItem>
                <SelectItem value="Pickup">Pickup</SelectItem>
                <SelectItem value="Trailer">Trailer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t("company")}</Label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UzLogistics">UzLogistics</SelectItem>
                <SelectItem value="TransCargo LLC">TransCargo LLC</SelectItem>
                <SelectItem value="SilkRoad Transport">SilkRoad Transport</SelectItem>
                <SelectItem value="Tashkent Shipping">Tashkent Shipping</SelectItem>
                <SelectItem value="UzbekExpress">UzbekExpress</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t("status")}</Label>
            <Select value={status} onValueChange={(value: "active" | "blocked" | "onLeave") => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t("active")}</SelectItem>
                <SelectItem value="blocked">{t("blocked")}</SelectItem>
                <SelectItem value="onLeave">{t("onLeave")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargoName">{t("cargoName")}</Label>
            <Input
              id="cargoName"
              value={cargoName}
              onChange={(e) => setCargoName(e.target.value)}
              placeholder="Enter cargo name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargoWeight">{t("weight")} (kg)</Label>
            <Input
              id="cargoWeight"
              type="number"
              value={cargoWeight || ""}
              onChange={(e) => setCargoWeight(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">{t("cost")} (UZS)</Label>
            <Input
              id="price"
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave}>{t("save")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
