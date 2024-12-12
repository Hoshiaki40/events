import React, { useState } from "react";
import { cn } from "@/src/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Check, XCircleIcon } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/presentation/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/presentation/components/ui/popover";

import { Badge } from "./badge";
import { Separator } from "./separator";

export type SingleFacetedFilterProps = {
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValue: string | number | null;
  onChange: (value: string | number | null) => void;
};

export function SingleFacetedFilter({
  title,
  options,
  selectedValue,
  onChange,
}: SingleFacetedFilterProps) {
  const [open, setOpen] = useState(false);

  const handleClear = () => {
    onChange(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className={cn("h-8 border-dashed")}
        >
          <div className="mx-auto flex w-full items-center justify-between">
            <PlusCircledIcon className="mx-2 h-4 cursor-pointer text-muted-foreground" />
            <span className="mx-3 text-sm text-muted-foreground">{title}</span>
          </div>
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {options
                    .filter((item) => item.value === selectedValue)
                    .map((option) => {
                      const IconComponent = option?.icon;

                      return (
                        <Badge key={option.label}>
                          {IconComponent && (
                            <IconComponent className="mr-2 h-4 w-4" />
                          )}
                          {option?.label}
                        </Badge>
                      );
                    })}
                </div>
                <div className="flex items-center justify-between">
                  <XCircleIcon
                    className="ml-2 h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandEmpty>No {title} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(isSelected ? null : option.value);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <div className="flex items-center justify-between">
              {selectedValue && (
                <>
                  <CommandItem
                    onSelect={handleClear}
                    className="flex-1 cursor-pointer justify-center"
                  >
                    Clear
                  </CommandItem>
                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                </>
              )}
              <CommandItem
                onSelect={() => setOpen(false)}
                className="max-w-full flex-1 cursor-pointer justify-center"
              >
                Close
              </CommandItem>
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
