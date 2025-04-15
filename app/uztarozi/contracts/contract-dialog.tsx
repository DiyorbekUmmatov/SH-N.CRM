"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
import { FileUpload } from "@/components/file-upload"

interface ContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (contract: any) => void
  title: string
}

export function ContractDialog({ open, onOpenChange, onSave, title }: ContractDialogProps) {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [type, setType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSave = () => {
    const contract = {
      name,
      company,
      type,
      startDate,
      endDate,
      hasFile: !!file,
    }
    onSave(contract)

    // Reset form
    setName("")
    setCompany("")
    setType("")
    setStartDate("")
    setEndDate("")
    setFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contract Name" />
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
            <Label htmlFor="type">{t("type")}</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Shipping">Shipping</SelectItem>
                <SelectItem value="Delivery">Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Contract File</Label>
            <FileUpload onFileSelect={setFile} accept=".pdf" maxSize={5} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} disabled={!name || !company || !type || !startDate || !endDate}>
            {t("save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
