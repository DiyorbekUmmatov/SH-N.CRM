"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Check, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

interface Employee {
  id: string
  name: string
  department: string
  time: string
  status: "check-in" | "check-out"
}

export default function LiveScan() {
  const { t } = useTranslation()
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [detectedEmployee, setDetectedEmployee] = useState<Employee | null>(null)
  const [recentLogs, setRecentLogs] = useState<Employee[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "time",
      header: t("time"),
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => (
        <div
          className={`inline-block h-3 w-3 rounded-full mr-2 ${
            row.original.status === "check-in" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          <span className="ml-4 text-xs">{row.original.status === "check-in" ? "Check In" : "Check Out"}</span>
        </div>
      ),
    },
  ]

  const toggleCamera = () => {
    if (isCameraActive) {
      // Stop camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setIsCameraActive(false)
      setDetectedEmployee(null)
    } else {
      // Start camera
      startCamera()
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsCameraActive(true)

      // Simulate face detection after 3 seconds
      setTimeout(() => {
        const employee: Employee = {
          id: "emp-" + Math.floor(Math.random() * 1000),
          name: "Alisher Usmanov",
          department: "Engineering",
          time: new Date().toLocaleTimeString(),
          status: Math.random() > 0.5 ? "check-in" : "check-out",
        }
        setDetectedEmployee(employee)
      }, 3000)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const confirmAttendance = () => {
    if (detectedEmployee) {
      setRecentLogs((prev) => [detectedEmployee, ...prev])
      setDetectedEmployee(null)

      // Simulate new face detection after 2 seconds
      setTimeout(() => {
        const employee: Employee = {
          id: "emp-" + Math.floor(Math.random() * 1000),
          name: ["Dilnoza Karimova", "Bobur Toshmatov", "Gulnora Azimova", "Timur Aliyev"][
            Math.floor(Math.random() * 4)
          ],
          department: ["Finance", "Marketing", "HR", "Operations"][Math.floor(Math.random() * 4)],
          time: new Date().toLocaleTimeString(),
          status: Math.random() > 0.5 ? "check-in" : "check-out",
        }
        setDetectedEmployee(employee)
      }, 2000)
    }
  }

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("liveScan")} />
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("scanFace")}</CardTitle>
              <CardDescription>Face recognition for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                {isCameraActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {detectedEmployee && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-lg">{detectedEmployee.name}</div>
                        <div className="text-sm text-muted-foreground">{detectedEmployee.department}</div>
                      </div>
                      <Button onClick={confirmAttendance} size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-center">
                <Button onClick={toggleCamera} variant={isCameraActive ? "destructive" : "default"}>
                  {isCameraActive ? "Stop Camera" : "Start Camera"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("employeeLog")}</CardTitle>
              <CardDescription>Recent attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={recentLogs} searchKey="name" searchPlaceholder="Search employees..." />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
