"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tab {
  value: string
  label: string
  content: React.ReactNode
}

interface ResponsiveTabsProps {
  tabs: Tab[]
  defaultValue?: string
  className?: string
}

export function ResponsiveTabs({ tabs, defaultValue = tabs[0]?.value, className }: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div className={className}>
      {isMobile ? (
        <div className="space-y-4">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger>
              <SelectValue placeholder="Select tab" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>{tabs.find((tab) => tab.value === activeTab)?.content}</div>
        </div>
      ) : (
        <Tabs defaultValue={defaultValue} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
