"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { FileUpload } from "@/components/file-upload"

interface ContractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: string
  employeeName: string
  onUpload: (employeeId: string) => void
}

export function ContractDialog({ open, onOpenChange, employeeId, employeeName, onUpload }: ContractDialogProps) {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (file) {
      // In a real app, you would upload the file to a server
      onUpload(employeeId)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("uploadContract")}: {employeeName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <FileUpload onFileSelect={setFile} accept=".pdf" maxSize={5} />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            {t("uploadContract")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
