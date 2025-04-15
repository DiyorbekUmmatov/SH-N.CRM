"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"

interface Company {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  status: "active" | "blocked" | "onLeave"
  totalCargo: number
}

interface CompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (company: any) => void
  title: string
  defaultValues?: Company
}

export function CompanyDialog({ open, onOpenChange, onSave, title, defaultValues }: CompanyDialogProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(defaultValues?.name || "")
  const [contactPerson, setContactPerson] = useState(defaultValues?.contactPerson || "")
  const [phone, setPhone] = useState(defaultValues?.phone || "")
  const [email, setEmail] = useState(defaultValues?.email || "")
  const [status, setStatus] = useState<"active" | "blocked" | "onLeave">(defaultValues?.status || "active")

  const handleSave = () => {
    const company = {
      ...(defaultValues && { id: defaultValues.id }),
      name,
      contactPerson,
      phone,
      email,
      status,
      ...(defaultValues && { totalCargo: defaultValues.totalCargo }),
    }
    onSave(company)

    // Reset form if not editing
    if (!defaultValues) {
      setName("")
      setContactPerson("")
      setPhone("")
      setEmail("")
      setStatus("active")
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
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company Name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 90 123 4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="company@example.com"
            />
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
