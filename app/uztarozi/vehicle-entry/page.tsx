"use client"

import { useState } from "react"
import { Camera, Save, Truck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"

export default function VehicleEntry() {
  const { t } = useTranslation()
  const [plateNumber, setPlateNumber] = useState("")
  const [cargoName, setCargoName] = useState("")
  const [company, setCompany] = useState("")
  const [weight, setWeight] = useState("")
  const [cost, setCost] = useState("")

  const handleSave = () => {
    // Save the vehicle entry data
    console.log({
      plateNumber,
      cargoName,
      company,
      weight,
      cost,
    })

    // Reset form
    setPlateNumber("")
    setCargoName("")
    setCompany("")
    setWeight("")
    setCost("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("vehicleEntry")} />
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ANPR Camera Feed</CardTitle>
              <CardDescription>Automatic Number Plate Recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Camera feed will appear here</p>
                  <Button className="mt-4" variant="outline">
                    Activate Camera
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="text-lg font-semibold">{plateNumber || "No vehicle detected"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Entry Form</CardTitle>
              <CardDescription>Enter cargo details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
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
                  <Label htmlFor="weight">{t("weight")} (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                  />
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
                  <Label htmlFor="company">{t("company")}</Label>
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uzlogistics">UzLogistics</SelectItem>
                      <SelectItem value="transcargo">TransCargo LLC</SelectItem>
                      <SelectItem value="silkroad">SilkRoad Transport</SelectItem>
                      <SelectItem value="tashkent">Tashkent Shipping</SelectItem>
                      <SelectItem value="uzbekexpress">UzbekExpress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">{t("cost")} (UZS)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <Button type="button" className="w-full" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  {t("save")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
