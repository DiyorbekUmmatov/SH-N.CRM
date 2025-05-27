"use client";

import { useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTranslation } from "@/hooks/use-translation";
import type { ColumnDef } from "@tanstack/react-table";
import { addDays } from "date-fns";
import { ReportFilters } from "./report-filters";
import { ReportChart } from "@/components/report-chart";
import { SummaryCardsGrid } from "@/components/summary-cards";
import { ResponsiveTabs } from "@/components/responsive-tabs";
import { Button } from "@/components/ui/button";

// Define the data structure for vehicle reports
interface VehicleReport {
  id: string;
  date: string;
  plateNumber: string;
  company: string;
  cargoName: string;
  cargoWeight: number;
  price: number;
  checkIn: string;
  checkOut: string;
  duration: string; // Added field
  driver: string; // Added field
  status: string; // Added field
}

// Define the data structure for company reports
interface CompanyReport {
  id: string;
  company: string;
  totalVehicles: number;
  totalWeight: number;
  totalRevenue: number;
  averageWeight: number;
  contactPerson: string; // Added field
  phone: string; // Added field
  email: string; // Added field
}

// Define the data structure for cargo reports
interface CargoReport {
  id: string;
  cargoName: string;
  totalWeight: number;
  totalRevenue: number;
  vehicleCount: number;
  averagePrice: number; // Added field
  origin: string; // Added field
  destination: string; // Added field
}

export default function UztaroziReports() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simulate data loading when changing filters
  const handleFilterChange = (
    value: "daily" | "weekly" | "monthly" | "yearly"
  ) => {
    setIsLoading(true);
    setReportType(value);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Handle date range change
  const handleDateChange = (newDate: { from: Date; to: Date }) => {
    setIsLoading(true);
    setDate(newDate);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Vehicle report columns - expanded with more columns
  const vehicleColumns: ColumnDef<VehicleReport>[] = [
    {
      accessorKey: "date",
      header: t("date"),
    },
    {
      accessorKey: "plateNumber",
      header: t("plateNumber"),
    },
    {
      accessorKey: "driver",
      header: "Driver",
    },
    {
      accessorKey: "company",
      header: t("company"),
    },
    {
      accessorKey: "cargoName",
      header: t("cargoName"),
    },
    {
      accessorKey: "cargoWeight",
      header: t("weight"),
      cell: ({ row }) => `${row.original.cargoWeight.toLocaleString()} kg`,
    },
    {
      accessorKey: "price",
      header: t("cost"),
      cell: ({ row }) => `${row.original.price.toLocaleString()} UZS`,
    },
    {
      accessorKey: "checkIn",
      header: t("checkIn"),
    },
    {
      accessorKey: "checkOut",
      header: t("checkOut"),
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.original.status === "Completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : row.original.status === "In Progress"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          }`}
        >
          {row.original.status}
        </div>
      ),
    },
  ];

  // Company report columns - expanded with more columns
  const companyColumns: ColumnDef<CompanyReport>[] = [
    {
      accessorKey: "company",
      header: t("company"),
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "totalVehicles",
      header: "Total Vehicles",
      cell: ({ row }) => row.original.totalVehicles.toLocaleString(),
    },
    {
      accessorKey: "totalWeight",
      header: "Total Weight",
      cell: ({ row }) => `${row.original.totalWeight.toLocaleString()} kg`,
    },
    {
      accessorKey: "totalRevenue",
      header: "Total Revenue",
      cell: ({ row }) => `${row.original.totalRevenue.toLocaleString()} UZS`,
    },
    {
      accessorKey: "averageWeight",
      header: "Avg. Weight per Vehicle",
      cell: ({ row }) => `${row.original.averageWeight.toLocaleString()} kg`,
    },
  ];

  // Cargo report columns - expanded with more columns
  const cargoColumns: ColumnDef<CargoReport>[] = [
    {
      accessorKey: "cargoName",
      header: t("cargoName"),
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "totalWeight",
      header: "Total Weight",
      cell: ({ row }) => `${row.original.totalWeight.toLocaleString()} kg`,
    },
    {
      accessorKey: "totalRevenue",
      header: "Total Revenue",
      cell: ({ row }) => `${row.original.totalRevenue.toLocaleString()} UZS`,
    },
    {
      accessorKey: "vehicleCount",
      header: "Vehicle Count",
      cell: ({ row }) => row.original.vehicleCount.toLocaleString(),
    },
    {
      accessorKey: "averagePrice",
      header: "Avg. Price per kg",
      cell: ({ row }) => `${row.original.averagePrice.toLocaleString()} UZS`,
    },
  ];

  // Handle export
  const handleExport = () => {
    alert(`Exporting ${reportType} report data...`);
  };

  // Calculate summary data
  const totalVehicles = mockVehicleReports.length;
  const totalWeight = mockVehicleReports.reduce(
    (sum, report) => sum + report.cargoWeight,
    0
  );
  const totalRevenue = mockVehicleReports.reduce(
    (sum, report) => sum + report.price,
    0
  );
  const averageWeight = Math.round(totalWeight / totalVehicles);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={t("reports")} />
      <main className="flex-1 p-4 md:p-6 w-full">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">{t("reports")}</h1>
          <ReportFilters
            reportType={reportType}
            onReportTypeChange={handleFilterChange}
            dateRange={date}
            onDateRangeChange={handleDateChange}
            onExport={handleExport}
            onPrint={handlePrint}
          />
        </div>

        {/* Summary Cards */}
        <SummaryCardsGrid
          isLoading={isLoading}
          cards={[
            {
              title: "Total Vehicles",
              value: totalVehicles,
              description: "For selected period",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Total Weight",
              value: `${totalWeight.toLocaleString()} kg`,
              description: "For selected period",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Total Revenue",
              value: `${totalRevenue.toLocaleString()} UZS`,
              description: "For selected period",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Average Weight",
              value: `${averageWeight.toLocaleString()} kg`,
              description: "Per vehicle",
              icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            },
          ]}
        />

        {/* Charts */}
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <ReportChart
            title="Weight Distribution by Company"
            description="Total cargo weight by company"
            chartType="pie"
            isLoading={isLoading}
            data={{
              labels: mockCompanyReports.map((company) => company.company),
              datasets: [
                {
                  label: "Total Weight (kg)",
                  data: mockCompanyReports.map(
                    (company) => company.totalWeight
                  ),
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                  ],
                },
              ],
            }}
          />
          <ReportChart
            title="Daily Cargo Trend"
            description="Cargo weight over time"
            chartType="bar"
            isLoading={isLoading}
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "Cargo Weight (kg)",
                  data: [12500, 19200, 15700, 18600, 21300, 9800, 5400],
                  backgroundColor: ["rgba(54, 162, 235, 0.6)"],
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>

        {/* Tabbed Reports */}
        <ResponsiveTabs
          tabs={[
            {
              value: "vehicles",
              label: "Vehicle Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Entry Reports</CardTitle>
                    <CardDescription>
                      Detailed vehicle entry and exit data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Loading report data...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={vehicleColumns}
                        data={mockVehicleReports}
                        searchKey="plateNumber"
                        searchPlaceholder="Search by plate number..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "companies",
              label: "Company Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Company Reports</CardTitle>
                    <CardDescription>
                      Aggregated data by company
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Loading report data...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={companyColumns}
                        data={mockCompanyReports}
                        searchKey="company"
                        searchPlaceholder="Search by company name..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
            {
              value: "cargo",
              label: "Cargo Reports",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Cargo Reports</CardTitle>
                    <CardDescription>
                      Aggregated data by cargo type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="w-full py-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">
                            Loading report data...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <DataTable
                        columns={cargoColumns}
                        data={mockCargoReports}
                        searchKey="cargoName"
                        searchPlaceholder="Search by cargo name..."
                      />
                    )}
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />

        <Button onClick={handlePrint}>{t("print")}</Button>
      </main>
    </div>
  );
}

// Mock data for vehicle reports - expanded with more fields
const mockVehicleReports: VehicleReport[] = [
  {
    id: "vr-1",
    date: "2023-05-15",
    plateNumber: "01A123BB",
    company: "UzLogistics",
    cargoName: "Cotton",
    cargoWeight: 5200,
    price: 3500000,
    checkIn: "08:30",
    checkOut: "10:15",
    duration: "1h 45m",
    driver: "Alisher Karimov",
    status: "Completed",
  },
  {
    id: "vr-2",
    date: "2023-05-15",
    plateNumber: "01B456CC",
    company: "TransCargo LLC",
    cargoName: "Electronics",
    cargoWeight: 1800,
    price: 4200000,
    checkIn: "09:45",
    checkOut: "11:30",
    duration: "1h 45m",
    driver: "Bobur Alimov",
    status: "Completed",
  },
  {
    id: "vr-3",
    date: "2023-05-15",
    plateNumber: "01C789DD",
    company: "SilkRoad Transport",
    cargoName: "Textiles",
    cargoWeight: 4500,
    price: 2800000,
    checkIn: "10:30",
    checkOut: "12:15",
    duration: "1h 45m",
    driver: "Dilshod Rakhimov",
    status: "Completed",
  },
  {
    id: "vr-4",
    date: "2023-05-16",
    plateNumber: "01D012EE",
    company: "Tashkent Shipping",
    cargoName: "Machinery",
    cargoWeight: 7800,
    price: 5600000,
    checkIn: "08:15",
    checkOut: "10:45",
    duration: "2h 30m",
    driver: "Jahongir Usmanov",
    status: "Completed",
  },
  {
    id: "vr-5",
    date: "2023-05-16",
    plateNumber: "01E345FF",
    company: "UzbekExpress",
    cargoName: "Fruits",
    cargoWeight: 2200,
    price: 1800000,
    checkIn: "11:00",
    checkOut: "12:30",
    duration: "1h 30m",
    driver: "Malika Turaeva",
    status: "Completed",
  },
  {
    id: "vr-6",
    date: "2023-05-16",
    plateNumber: "01A123BB",
    company: "UzLogistics",
    cargoName: "Cotton",
    cargoWeight: 4800,
    price: 3200000,
    checkIn: "14:30",
    checkOut: "16:15",
    duration: "1h 45m",
    driver: "Alisher Karimov",
    status: "Completed",
  },
  {
    id: "vr-7",
    date: "2023-05-17",
    plateNumber: "01F678GG",
    company: "TransCargo LLC",
    cargoName: "Electronics",
    cargoWeight: 2100,
    price: 4500000,
    checkIn: "09:30",
    checkOut: "11:00",
    duration: "1h 30m",
    driver: "Rustam Saidov",
    status: "Completed",
  },
  {
    id: "vr-8",
    date: "2023-05-17",
    plateNumber: "01G901HH",
    company: "SilkRoad Transport",
    cargoName: "Textiles",
    cargoWeight: 3900,
    price: 2400000,
    checkIn: "13:15",
    checkOut: "15:00",
    duration: "1h 45m",
    driver: "Aziz Toshmatov",
    status: "Completed",
  },
];

// Mock data for company reports - expanded with more fields
const mockCompanyReports: CompanyReport[] = [
  {
    id: "cr-1",
    company: "UzLogistics",
    totalVehicles: 25,
    totalWeight: 125480,
    totalRevenue: 84500000,
    averageWeight: 5019,
    contactPerson: "Akmal Karimov",
    phone: "+998 90 123 4567",
    email: "info@uzlogistics.uz",
  },
  {
    id: "cr-2",
    company: "TransCargo LLC",
    totalVehicles: 18,
    totalWeight: 98750,
    totalRevenue: 76200000,
    averageWeight: 5486,
    contactPerson: "Dilshod Rakhimov",
    phone: "+998 90 234 5678",
    email: "contact@transcargo.uz",
  },
  {
    id: "cr-3",
    company: "SilkRoad Transport",
    totalVehicles: 15,
    totalWeight: 76320,
    totalRevenue: 52800000,
    averageWeight: 5088,
    contactPerson: "Feruza Azimova",
    phone: "+998 90 345 6789",
    email: "info@silkroad-transport.uz",
  },
  {
    id: "cr-4",
    company: "Tashkent Shipping",
    totalVehicles: 12,
    totalWeight: 54890,
    totalRevenue: 39600000,
    averageWeight: 4574,
    contactPerson: "Jahongir Usmanov",
    phone: "+998 90 456 7890",
    email: "contact@tashkentshipping.uz",
  },
  {
    id: "cr-5",
    company: "UzbekExpress",
    totalVehicles: 8,
    totalWeight: 32450,
    totalRevenue: 28800000,
    averageWeight: 4056,
    contactPerson: "Malika Turaeva",
    phone: "+998 90 567 8901",
    email: "info@uzbekexpress.uz",
  },
];

// Mock data for cargo reports - expanded with more fields
const mockCargoReports: CargoReport[] = [
  {
    id: "cgr-1",
    cargoName: "Cotton",
    totalWeight: 98500,
    totalRevenue: 65800000,
    vehicleCount: 18,
    averagePrice: 668,
    origin: "Fergana",
    destination: "Tashkent",
  },
  {
    id: "cgr-2",
    cargoName: "Electronics",
    totalWeight: 42300,
    totalRevenue: 92400000,
    vehicleCount: 22,
    averagePrice: 2185,
    origin: "China",
    destination: "Tashkent",
  },
  {
    id: "cgr-3",
    cargoName: "Textiles",
    totalWeight: 76800,
    totalRevenue: 48600000,
    vehicleCount: 16,
    averagePrice: 633,
    origin: "Namangan",
    destination: "Samarkand",
  },
  {
    id: "cgr-4",
    cargoName: "Machinery",
    totalWeight: 124500,
    totalRevenue: 89600000,
    vehicleCount: 15,
    averagePrice: 720,
    origin: "Russia",
    destination: "Tashkent",
  },
  {
    id: "cgr-5",
    cargoName: "Fruits",
    totalWeight: 45200,
    totalRevenue: 36000000,
    vehicleCount: 20,
    averagePrice: 796,
    origin: "Samarkand",
    destination: "Tashkent",
  },
];
