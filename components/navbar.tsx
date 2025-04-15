"use client"

import { Bell, Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const { t } = useTranslation()

  return (
    <div className="border-b sticky top-0 bg-background z-10">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="md:hidden">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-64 max-w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`${t("search")}...`} className="pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New vehicle registered</DropdownMenuItem>
              <DropdownMenuItem>Employee check-in</DropdownMenuItem>
              <DropdownMenuItem>Contract expiring soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
