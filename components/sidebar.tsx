"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Truck,
  Building2,
  FileText,
  Users,
  Camera,
  ClipboardList,
  DollarSign,
  LogOut,
  Moon,
  Sun,
  Languages,
  PieChart,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/hooks/use-translation";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  SidebarProvider as ShadcnSidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShadcnSidebarProvider defaultOpen={true}>{children}</ShadcnSidebarProvider>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [activeInterface, setActiveInterface] = useState<"uztarozi" | "faceid">(
    pathname.includes("/faceid") ? "faceid" : "uztarozi"
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  const uztaroziMenuItems = [
    {
      title: t("dashboard"),
      icon: BarChart3,
      path: "/uztarozi/dashboard",
    },
    {
      title: t("vehicleEntry"),
      icon: Truck,
      path: "/uztarozi/vehicle-entry",
    },
    {
      title: t("vehicleManagement"),
      icon: Truck,
      path: "/uztarozi/vehicle-management",
    },
    {
      title: t("companyManagement"),
      icon: Building2,
      path: "/uztarozi/company-management",
    },
    {
      title: t("contracts"),
      icon: FileText,
      path: "/uztarozi/contracts",
    },
    {
      title: t("employeeManagement"),
      icon: Users,
      path: "/uztarozi/employee-management",
    },
    {
      title: t("reports"),
      icon: PieChart,
      path: "/uztarozi/reports",
    },
  ];

  const faceidMenuItems = [
    {
      title: t("dashboard"),
      icon: BarChart3,
      path: "/faceid/dashboard",
    },
    {
      title: t("liveScan"),
      icon: Camera,
      path: "/faceid/live-scan",
    },
    {
      title: t("attendanceHistory"),
      icon: ClipboardList,
      path: "/faceid/attendance-history",
    },
    {
      title: t("payroll"),
      icon: DollarSign,
      path: "/faceid/payroll",
    },
    {
      title: t("employeeManagement"),
      icon: Users,
      path: "/faceid/employee-management",
    },
    {
      title: t("reports"),
      icon: PieChart,
      path: "/faceid/reports",
    },
  ];

  return (
    <SidebarComponent
      variant="sidebar"
      collapsible={isMobile ? "offcanvas" : "icon"}
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl">SH/S.CRM</div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("interfaces")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeInterface === "uztarozi"}
                  onClick={() => setActiveInterface("uztarozi")}
                  asChild
                >
                  <Link href="/uztarozi/dashboard">
                    <Truck />
                    <span>UZTAROZI+</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeInterface === "faceid"}
                  onClick={() => setActiveInterface("faceid")}
                  asChild
                >
                  <Link href="/faceid/dashboard">
                    <Camera />
                    <span>{t("faceIdSystem")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {activeInterface === "uztarozi" && (
          <SidebarGroup>
            <SidebarGroupLabel>UZTAROZI+</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {uztaroziMenuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive(item.path)}
                      asChild
                      tooltip={item.title}
                    >
                      <Link href={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {activeInterface === "faceid" && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("faceIdSystem")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {faceidMenuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive(item.path)}
                      asChild
                      tooltip={item.title}
                    >
                      <Link href={item.path}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-muted-foreground">
                  admin@example.com
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Languages className="mr-2 h-4 w-4" />
                  {currentLanguage === "en" ? "English" : "Uzbek"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("uz")}>
                  Uzbek
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  );
}
