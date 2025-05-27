import type React from "react"
import { Clock, DollarSign, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic";

const CameraStream = dynamic(() => import("@/components/camerastream"), {
  ssr: false,
});

export default function FaceIdDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Face ID System Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Today's Attendance"
            value="42/48"
            icon={Users}
            description="87.5% attendance rate"
          />
          <DashboardCard
            title="Active Employees"
            value="48"
            icon={Users}
            description="2 on leave, 0 blocked"
          />
          <DashboardCard
            title="Total Salary"
            value="$24,680"
            icon={DollarSign}
            description="This month"
          />
          <DashboardCard
            title="Late Arrivals"
            value="5"
            icon={Clock}
            description="10.4% of employees"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              
              <CameraStream />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCheckIns.map((checkIn) => (
                  <div key={checkIn.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{checkIn.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {checkIn.department}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{checkIn.time}</div>
                      <div className="text-sm text-muted-foreground">
                        {checkIn.status}
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
  );
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

const recentCheckIns = [
  { id: 1, name: "Alisher Usmanov", department: "Engineering", time: "08:45 AM", status: "On Time" },
  { id: 2, name: "Dilnoza Karimova", department: "Finance", time: "08:52 AM", status: "On Time" },
  { id: 3, name: "Bobur Toshmatov", department: "Marketing", time: "09:05 AM", status: "Late" },
  { id: 4, name: "Gulnora Azimova", department: "HR", time: "08:30 AM", status: "On Time" },
  { id: 5, name: "Timur Aliyev", department: "Operations", time: "09:12 AM", status: "Late" },
]
