"use client";

import { useCallback, useState } from "react";
import { cn } from "@/src/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateTimePickerV2Props {
  date?: Date;
  setDate?: (value: Date | undefined) => void;
}

export function DateTimePickerV2({ date, setDate }: DateTimePickerV2Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (setDate) {
        if (selectedDate) {
          // Convertir la selectedDate en UTC
          const utcDate = new Date(
            Date.UTC(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate()
            )
          );
          // Formater la selectedDate en ISO string et la parser à nouveau pour s'assurer qu'elle est en UTC
          const isoString = format(utcDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
          const finalDate = parseISO(isoString);
          setDate(finalDate);
        } else {
          setDate(undefined);
        }
      }
    },
    [setDate]
  );
  return (
    <div className="flex w-full gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? (
                `${format(date, "PPP", { locale: fr })}`
              ) : (
                <span>Sélectionnez une date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            defaultMonth={date || undefined}
            selected={date || undefined}
            onSelect={handleSelect}
            onDayClick={() => setIsOpen(false)}
            fromYear={2000}
            toYear={new Date().getFullYear() + 10}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
