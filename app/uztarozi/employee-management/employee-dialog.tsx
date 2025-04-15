"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"

interface Employee {
  id: string
  name: string
  role: string
  department: string
  contact: string
  status: "active" | "blocked" | "onLeave"
  hasContract: boolean
}

interface EmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (employee: any) => void
  title: string
  defaultValues?: Employee
}

export function EmployeeDialog({ open, onOpenChange, onSave, title, defaultValues }: EmployeeDialogProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(defaultValues?.name || "")
  const [role, setRole] = useState(defaultValues?.role || "")
  const [department, setDepartment] = useState(defaultValues?.department || "")
  const [contact, setContact] = useState(defaultValues?.contact || "")
  const [status, setStatus] = useState<"active" | "blocked" | "onLeave">(defaultValues?.status || "active")

  const handleSave = () => {
    const employee = {
      ...(defaultValues && { id: defaultValues.id }),
      name,
      role,
      department,
      contact,
      status,
      ...(defaultValues && { hasContract: defaultValues.hasContract }),
    }
    onSave(employee)

    // Reset form if not editing
    if (!defaultValues) {
      setName("")
      setRole("")
      setDepartment("")
      setContact("")
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
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t("role")}</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job Title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">{t("contact")}</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+998 90 123 4567"
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
