"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/hooks/use-translation"

interface PayrollRecord {
  id: string
  employeeName: string
  department: string
  hoursWorked: number
  baseSalary: number
  bonus: number
  penalty: number
  totalSalary: number
}

interface PayrollDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: PayrollRecord
  onSave: (record: PayrollRecord) => void
}

export function PayrollDialog({ open, onOpenChange, record, onSave }: PayrollDialogProps) {
  const { t } = useTranslation()
  const [baseSalary, setBaseSalary] = useState(record.baseSalary)
  const [bonus, setBonus] = useState(record.bonus)
  const [penalty, setPenalty] = useState(record.penalty)

  const calculateTotal = () => {
    return baseSalary + bonus - penalty
  }

  const handleSave = () => {
    const updatedRecord = {
      ...record,
      baseSalary,
      bonus,
      penalty,
      totalSalary: calculateTotal(),
    }
    onSave(updatedRecord)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("manualOverride")}: {record.employeeName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="baseSalary">Base Salary ($)</Label>
            <Input
              id="baseSalary"
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bonus">{t("bonus")} ($)</Label>
            <Input id="bonus" type="number" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penalty">{t("penalty")} ($)</Label>
            <Input id="penalty" type="number" value={penalty} onChange={(e) => setPenalty(Number(e.target.value))} />
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">{t("total")} Salary:</span>
              <span className="font-bold">${calculateTotal().toLocaleString()}</span>
            </div>
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
