"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SummaryCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  isLoading?: boolean
}

export function SummaryCard({ title, value, description, icon, isLoading = false }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-24 mb-1" />
            {description && <Skeleton className="h-4 w-32" />}
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface SummaryCardsGridProps {
  cards: {
    title: string
    value: string | number
    description?: string
    icon?: React.ReactNode
  }[]
  isLoading?: boolean
  columns?: 2 | 3 | 4
}

export function SummaryCardsGrid({ cards, isLoading = false, columns = 4 }: SummaryCardsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }

  return (
    <div className={`grid gap-4 mb-6 ${gridCols[columns]}`}>
      {cards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
