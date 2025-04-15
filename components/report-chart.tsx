"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
    borderWidth?: number
    fill?: boolean
  }[]
}

interface ReportChartProps {
  title: string
  description: string
  chartType: "bar" | "line" | "pie" | "doughnut"
  data: ChartData
  height?: number
  isLoading?: boolean
}

export function ReportChart({
  title,
  description,
  chartType,
  data,
  height = 300,
  isLoading = false,
}: ReportChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chartInstance, setChartInstance] = useState<any>(null)

  useEffect(() => {
    // This is a placeholder for chart rendering
    // In a real implementation, you would use a charting library like Chart.js
    const renderChart = async () => {
      if (chartRef.current && !isLoading) {
        // Clean up previous chart instance
        if (chartInstance) {
          chartInstance.destroy()
        }

        // In a real implementation, you would create a new chart here
        // For example with Chart.js:
        // const newChartInstance = new Chart(chartRef.current, {
        //   type: chartType,
        //   data: data,
        //   options: { ... }
        // })
        // setChartInstance(newChartInstance)

        // For now, we'll just simulate a chart with a colored background
        const ctx = chartRef.current.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

          // Draw a placeholder chart background
          ctx.fillStyle = "#f5f5f5"
          ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height)

          // Add some text
          ctx.fillStyle = "#888888"
          ctx.font = "14px Arial"
          ctx.textAlign = "center"
          ctx.fillText(
            `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart Placeholder`,
            chartRef.current.width / 2,
            chartRef.current.height / 2,
          )
        }
      }
    }

    renderChart()

    // Clean up on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [chartType, data, isLoading, chartInstance])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading chart data...</p>
          </div>
        ) : (
          <div className="h-[300px] w-full relative">
            <canvas ref={chartRef} height={height} width={500} className="max-w-full h-auto" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
