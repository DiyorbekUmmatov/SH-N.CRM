"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  date: DateRange;
  setDate: (date: DateRange) => void;
  className?: string;
  numberOfMonths: number;
}

export function DateRangePicker({
  date,
  setDate,
  className,
  numberOfMonths,
}: DateRangePickerProps) {
  const [numberOfMonthsState, setNumberOfMonthsState] =
    useState(numberOfMonths);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setNumberOfMonthsState(window.innerWidth < 768 ? 1 : 2);

    const handleResize = () => {
      setNumberOfMonthsState(window.innerWidth < 768 ? 1 : 2);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={numberOfMonthsState}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
