// components/ComboboxGeneric.tsx
import React from "react";
import { cn } from "@/src/utils";
import { PopoverPortal } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, Path, useController } from "react-hook-form";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/presentation/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/presentation/components/ui/popover";

export interface ComboboxOption {
  value: string | number | boolean | undefined;
  label: string;
}

interface ComboboxGenericProps<T extends Record<string, any>> {
  name: keyof T;
  control: Control<T>;
  label: string;
  placeholder: string;
  options: ComboboxOption[];
  emptyMessage: string;
  onSelect?: (option: ComboboxOption) => void;
}

export function ComboboxGeneric<T extends Record<string, any>>({
  name,
  control,
  label,
  placeholder,
  options,
  emptyMessage,
  onSelect,
}: ComboboxGenericProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: name as Path<T>,
    control,
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value?.toString() ?? ""}
                    onSelect={() => {
                      onSelect ? onSelect(option) : null;
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </PopoverPortal>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </Popover>
  );
}
