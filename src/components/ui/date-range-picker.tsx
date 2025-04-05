
import * as React from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  align?: "center" | "start" | "end";
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  label = "Selecione um período",
  placeholder = "Selecione um período",
  className,
  disabled = false,
  align = "start",
}: DateRangePickerProps) {
  return (
    <div className={className}>
      {label && (
        <span className="text-sm font-medium block mb-2 text-foreground">
          {label}
        </span>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange?.from && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy", { locale: pt })} -{" "}
                  {format(dateRange.to, "dd/MM/yyyy", { locale: pt })}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy", { locale: pt })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            initialFocus
            locale={pt}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
