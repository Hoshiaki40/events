"use client";

import * as React from "react";
import { cn } from "@/src/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/src/presentation/components/ui/button";
import { Calendar } from "@/src/presentation/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/presentation/components/ui/popover";

import { MultiSelect } from "./multi-select";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const multiSelectVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-background",
        link: "text-primary underline-offset-4 hover:underline text-background",
        "outline-warning":
          "border border-warning text-warning bg-background shadow-sm hover:bg-warning hover:text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CalendarDatePickerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  id?: string;
  className?: string;
  date?: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;

  /**
   * usageMode. 'form' pour une utilisation sur formulaire, 'filter' pour une utilisation en tant que filtre.
   * Par défaut, 'filter'.
   */
  usageMode?: "form" | "filter";

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;
  size?: "default" | "icon" | "sm" | "lg" | null | undefined;
  onDateSelect: (range: DateRange | undefined) => void;
}

export const CalendarDatePicker = React.forwardRef<
  HTMLButtonElement,
  CalendarDatePickerProps
>(
  (
    {
      id = "calendar-date-picker",
      className,
      date,
      usageMode = "filter",
      closeOnSelect = false,
      modalPopover = true,
      numberOfMonths = 2,
      yearsRange = 10,
      size = "default",
      onDateSelect,
      variant,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedRange, setSelectedRange] = React.useState<string | null>(
      numberOfMonths === 2 ? "This Year" : "Today"
    );
    const [monthFrom, setMonthFrom] = React.useState<Date | undefined>();
    // date?.from
    const [yearFrom, setYearFrom] = React.useState<number | undefined>(
      date?.from?.getFullYear()
    );
    const [monthTo, setMonthTo] = React.useState<Date | undefined>(
      numberOfMonths === 2 ? date?.to : date?.from
    );
    const [yearTo, setYearTo] = React.useState<number | undefined>(
      numberOfMonths === 2 ? date?.to?.getFullYear() : date?.from?.getFullYear()
    );
    const [highlightedPart, setHighlightedPart] = React.useState<string | null>(
      null
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleClose = () => setIsPopoverOpen(false);

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate =
        numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      setMonthFrom(from);
      setYearFrom(from.getFullYear());
      setMonthTo(to);
      setYearTo(to.getFullYear());
      closeOnSelect && setIsPopoverOpen(false);
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      console.log("range : ", range);
      console.log("date : ", date);
      // if (range) {
      //     let from = startOfDay(toDate(range.from as Date, { timeZone }))
      //     let to = range.to
      //         ? endOfDay(toDate(range.to, { timeZone }))
      //         : from
      //     if (numberOfMonths === 1) {
      //         if (range.from !== date?.from) {
      //             to = from
      //         } else {
      //             from = startOfDay(
      //                 toDate(range.to as Date, { timeZone })
      //             )
      //         }
      //     }
      //     onDateSelect({ from, to })
      //     setMonthFrom(from)
      //     setYearFrom(from.getFullYear())
      //     setMonthTo(to)
      //     setYearTo(to.getFullYear())
      // }

      setMonthTo(range?.to);
      setYearTo(range?.to?.getFullYear());
      setYearFrom(range?.from?.getFullYear());
      setMonthFrom(range?.from);
      onDateSelect(range);
      setSelectedRange(null);
    };

    const handleMonthChange = (newMonthIndex: number, part: string) => {
      setSelectedRange(null);
      if (part === "from") {
        if (yearFrom !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearFrom, newMonthIndex, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date?.from
                ? new Date(
                    date?.from.getFullYear(),
                    newMonth.getMonth(),
                    date?.from.getDate()
                  )
                : newMonth;
          const to =
            numberOfMonths === 2
              ? date?.to
                ? endOfDay(toDate(date?.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            setMonthFrom(newMonth);
            setMonthTo(date?.to);
          }
        }
      } else {
        if (yearTo !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearTo, newMonthIndex, 1);
          const from = date?.from
            ? startOfDay(toDate(date?.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to =
            numberOfMonths === 2
              ? endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            setMonthTo(newMonth);
            setMonthFrom(date?.from);
          }
        }
      }
    };

    const handleYearChange = (newYear: number, part: string) => {
      setSelectedRange(null);
      if (part === "from") {
        if (years.includes(newYear)) {
          const newMonth = monthFrom
            ? new Date(newYear, monthFrom ? monthFrom.getMonth() : 0, 1)
            : new Date(newYear, 0, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date?.from
                ? new Date(newYear, newMonth.getMonth(), date?.from.getDate())
                : newMonth;
          const to =
            numberOfMonths === 2
              ? date?.to
                ? endOfDay(toDate(date?.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            setYearFrom(newYear);
            setMonthFrom(newMonth);
            setYearTo(date?.to?.getFullYear());
            setMonthTo(date?.to);
          }
        }
      } else {
        if (years.includes(newYear)) {
          const newMonth = monthTo
            ? new Date(newYear, monthTo.getMonth(), 1)
            : new Date(newYear, 0, 1);
          const from = date?.from
            ? startOfDay(toDate(date?.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to =
            numberOfMonths === 2
              ? endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearTo(newYear);
            setMonthTo(newMonth);
            setYearFrom(date?.from?.getFullYear());
            setMonthFrom(date?.from);
          }
        }
      }
    };

    const today = new Date();

    const years = Array.from(
      { length: yearsRange + 1 },
      (_, i) => today.getFullYear() - yearsRange / 2 + i
    );

    const dateRanges = [
      { label: "Aujourd'hui", start: today, end: today },
      {
        label: "Hier",
        start: subDays(today, 1),
        end: subDays(today, 1),
      },
      {
        label: "Cette semaine",
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      },
      {
        label: "La semaine dernière",
        start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
        end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
      },
      { label: "7 derniers jours", start: subDays(today, 6), end: today },
      {
        label: "Ce mois-ci",
        start: startOfMonth(today),
        end: endOfMonth(today),
      },
      {
        label: "Mois précédent",
        start: startOfMonth(subDays(today, today.getDate())),
        end: endOfMonth(subDays(today, today.getDate())),
      },
      {
        label: "Cette année",
        start: startOfYear(today),
        end: endOfYear(today),
      },
      {
        label: "L'an dernier",
        start: startOfYear(subDays(today, 365)),
        end: endOfYear(subDays(today, 365)),
      },
    ];

    const handleMouseOver = (part: string) => {
      setHighlightedPart(part);
    };

    const handleMouseLeave = () => {
      setHighlightedPart(null);
    };

    const handleWheel = (event: React.WheelEvent, part: string) => {
      event.preventDefault();
      setSelectedRange(null);
      if (highlightedPart === "firstDay") {
        const newDate = new Date(date?.from as Date);
        const increment = event.deltaY > 0 ? -1 : 1;
        newDate.setDate(newDate.getDate() + increment);
        if (newDate <= (date?.to as Date)) {
          numberOfMonths === 2
            ? onDateSelect({
                from: newDate,
                to: new Date(date?.to as Date),
              })
            : onDateSelect({ from: newDate, to: newDate });
          setMonthFrom(newDate);
        } else if (newDate > (date?.to as Date) && numberOfMonths === 1) {
          onDateSelect({ from: newDate, to: newDate });
          setMonthFrom(newDate);
        }
      } else if (highlightedPart === "firstMonth") {
        const currentMonth = monthFrom ? monthFrom.getMonth() : 0;
        const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
        handleMonthChange(newMonthIndex, "from");
      } else if (highlightedPart === "firstYear" && yearFrom !== undefined) {
        const newYear = yearFrom + (event.deltaY > 0 ? -1 : 1);
        handleYearChange(newYear, "from");
      } else if (highlightedPart === "secondDay") {
        const newDate = new Date(date?.to as Date);
        const increment = event.deltaY > 0 ? -1 : 1;
        newDate.setDate(newDate.getDate() + increment);
        if (newDate >= (date?.from as Date)) {
          onDateSelect({
            from: new Date(date?.from as Date),
            to: newDate,
          });
          setMonthTo(newDate);
        }
      } else if (highlightedPart === "secondMonth") {
        const currentMonth = monthTo ? monthTo.getMonth() : 0;
        const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
        handleMonthChange(newMonthIndex, "to");
      } else if (highlightedPart === "secondYear" && yearTo !== undefined) {
        const newYear = yearTo + (event.deltaY > 0 ? -1 : 1);
        handleYearChange(newYear, "to");
      }
    };

    React.useEffect(() => {
      const firstDayElement = document.getElementById(`firstDay-${id}`);
      const firstMonthElement = document.getElementById(`firstMonth-${id}`);
      const firstYearElement = document.getElementById(`firstYear-${id}`);
      const secondDayElement = document.getElementById(`secondDay-${id}`);
      const secondMonthElement = document.getElementById(`secondMonth-${id}`);
      const secondYearElement = document.getElementById(`secondYear-${id}`);

      const elements = [
        firstDayElement,
        firstMonthElement,
        firstYearElement,
        secondDayElement,
        secondMonthElement,
        secondYearElement,
      ];

      const addPassiveEventListener = (element: HTMLElement | null) => {
        if (element) {
          element.addEventListener(
            "wheel",
            handleWheel as unknown as EventListener,
            {
              passive: false,
            }
          );
        }
      };

      elements.forEach(addPassiveEventListener);

      return () => {
        elements.forEach((element) => {
          if (element) {
            element.removeEventListener(
              "wheel",
              handleWheel as unknown as EventListener
            );
          }
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightedPart, date]);

    const formatWithTz = (date: Date, fmt: string) =>
      formatInTimeZone(date, timeZone, fmt, { locale: fr });

    return (
      <>
        <style>
          {`
            .date-part {
              touch-action: none;
            }
          `}
        </style>
        <Popover
          open={isPopoverOpen}
          onOpenChange={handleTogglePopover}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              id="date"
              ref={ref}
              {...props}
              className={cn(
                "w-auto",
                multiSelectVariants({ variant, className })
              )}
              size={size}
              // onClick={handleTogglePopover}
              suppressHydrationWarning
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                {date?.from ? (
                  date?.to ? (
                    <>
                      <span
                        id={`firstDay-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstDay" &&
                            "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstDay")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "dd")}
                      </span>{" "}
                      <span
                        id={`firstMonth-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstMonth" &&
                            "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstMonth")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "LLL")}
                      </span>
                      ,{" "}
                      <span
                        id={`firstYear-${id}`}
                        className={cn(
                          "date-part",
                          highlightedPart === "firstYear" &&
                            "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("firstYear")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "y")}
                      </span>
                      {numberOfMonths === 2 && (
                        <>
                          {" - "}
                          <span
                            id={`secondDay-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondDay" &&
                                "font-bold underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondDay")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date?.to, "dd")}
                          </span>{" "}
                          <span
                            id={`secondMonth-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondMonth" &&
                                "font-bold underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondMonth")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date?.to, "LLL")}
                          </span>
                          ,{" "}
                          <span
                            id={`secondYear-${id}`}
                            className={cn(
                              "date-part",
                              highlightedPart === "secondYear" &&
                                "font-bold underline"
                            )}
                            onMouseOver={() => handleMouseOver("secondYear")}
                            onMouseLeave={handleMouseLeave}
                          >
                            {formatWithTz(date?.to, "y")}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span
                        id="day"
                        className={cn(
                          "date-part",
                          highlightedPart === "day" && "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("day")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "dd")}
                      </span>{" "}
                      <span
                        id="month"
                        className={cn(
                          "date-part",
                          highlightedPart === "month" && "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("month")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "LLL")}
                      </span>
                      ,{" "}
                      <span
                        id="year"
                        className={cn(
                          "date-part",
                          highlightedPart === "year" && "font-bold underline"
                        )}
                        onMouseOver={() => handleMouseOver("year")}
                        onMouseLeave={handleMouseLeave}
                      >
                        {formatWithTz(date?.from, "y")}
                      </span>
                    </>
                  )
                ) : (
                  <span>Choisissez une date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          {isPopoverOpen && (
            <PopoverContent
              className="w-auto"
              align="center"
              // avoidCollisions={false}
              // onInteractOutside={handleClose}
              // onEscapeKeyDown={handleClose}
              style={{
                maxHeight: "var(--radix-popover-content-available-height)",
                overflowY: "auto",
              }}
            >
              <div className="flex">
                {numberOfMonths === 2 && (
                  <div className="hidden flex-col gap-1 border-r border-foreground/10 pr-4 text-left md:flex">
                    {dateRanges.map(({ label, start, end }) => (
                      <Button
                        key={label}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-start hover:bg-primary/90 hover:text-background",
                          selectedRange === label &&
                            "bg-primary text-background hover:bg-primary/90 hover:text-background"
                        )}
                        onClick={() => {
                          selectDateRange(start, end, label);
                          setMonthFrom(start);
                          setYearFrom(start.getFullYear());
                          setMonthTo(end);
                          setYearTo(end.getFullYear());
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="ml-3 flex gap-2">
                      <MultiSelect
                        options={months.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        onValueChange={(value: string[]) => {
                          handleMonthChange(months.indexOf(value[0]), "from");
                          setSelectedRange(null);
                        }}
                        defaultValue={
                          monthFrom ? [months[monthFrom.getMonth()]] : []
                        }
                        placeholder={"Mois"}
                        variant="inverted"
                        selectMode={"single"}
                        usage="form"
                        animation={2}
                        maxCount={1}
                        className="w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex"
                      />
                      <MultiSelect
                        options={years.map((item) => ({
                          label: item.toString(),
                          value: item,
                        }))}
                        onValueChange={(value: number[]) => {
                          handleYearChange(Number(value[0]), "from");
                          setSelectedRange(null);
                        }}
                        defaultValue={yearFrom ? [yearFrom] : []}
                        placeholder={"Années"}
                        variant="inverted"
                        selectMode={"single"}
                        usage="form"
                        animation={2}
                        maxCount={1}
                        className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex"
                      />
                    </div>
                    {numberOfMonths === 2 && (
                      <div className="flex gap-2">
                        <MultiSelect
                          options={months.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          onValueChange={(value: string[]) => {
                            handleMonthChange(months.indexOf(value[0]), "to");
                            setSelectedRange(null);
                          }}
                          defaultValue={
                            monthTo ? [months[monthTo.getMonth()]] : []
                          }
                          placeholder={"Mois"}
                          variant="inverted"
                          selectMode={"single"}
                          usage="form"
                          animation={2}
                          maxCount={1}
                          className="w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex"
                        />
                        <MultiSelect
                          options={years.map((item) => ({
                            label: item.toString(),
                            value: item,
                          }))}
                          onValueChange={(value: number[]) => {
                            handleYearChange(Number(value[0]), "to");
                            setSelectedRange(null);
                          }}
                          defaultValue={yearTo ? [yearTo] : []}
                          placeholder={"Années"}
                          variant="inverted"
                          selectMode={"single"}
                          usage="form"
                          animation={2}
                          maxCount={1}
                          className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <Calendar
                      mode="range"
                      defaultMonth={new Date()}
                      month={monthFrom}
                      onMonthChange={setMonthFrom}
                      selected={date}
                      onSelect={handleDateSelect}
                      numberOfMonths={numberOfMonths}
                      showOutsideDays={false}
                      className={className}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </>
    );
  }
);

CalendarDatePicker.displayName = "CalendarDatePicker";
