import type React from "react"
import { BarChart3, Building2, Scale, Truck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UztaroziDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="UZTAROZI+ Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Vehicles" value="1,284" icon={Truck} description="+12% from last month" />
          <DashboardCard title="Total Weight" value="458,290 kg" icon={Scale} description="+5% from last month" />
          <DashboardCard title="Daily Cargo" value="24,560 kg" icon={BarChart3} description="+8% from yesterday" />
          <DashboardCard title="Active Companies" value="48" icon={Building2} description="+3 new this month" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Cargo Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart will be displayed here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Cargo Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((company) => (
                  <div key={company.id} className="flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{company.name}</span>
                        <span className="text-sm text-muted-foreground">{company.volume} kg</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${company.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  icon: React.ElementType
  description: string
}

function DashboardCard({ title, value, icon: Icon, description }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

const topCompanies = [
  { id: 1, name: "UzLogistics", volume: 125480, percentage: 100 },
  { id: 2, name: "TransCargo LLC", volume: 98750, percentage: 78 },
  { id: 3, name: "SilkRoad Transport", volume: 76320, percentage: 60 },
  { id: 4, name: "Tashkent Shipping", volume: 54890, percentage: 43 },
  { id: 5, name: "UzbekExpress", volume: 32450, percentage: 25 },
]
