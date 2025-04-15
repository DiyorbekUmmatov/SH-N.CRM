"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileText, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({ onFileSelect, accept = ".pdf", maxSize = 5 }: FileUploadProps) {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null

    if (!selectedFile) {
      setFile(null)
      onFileSelect(null)
      return
    }

    // Check file type
    if (accept && !selectedFile.type.includes("pdf")) {
      setError("Only PDF files are allowed")
      setFile(null)
      onFileSelect(null)
      return
    }

    // Check file size
    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      setFile(null)
      onFileSelect(null)
      return
    }

    setError(null)
    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">{t("uploadContract")}</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, max {maxSize}MB</p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={accept} className="hidden" />
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2 border rounded-lg">
          <FileText className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
