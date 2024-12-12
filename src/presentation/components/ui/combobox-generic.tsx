import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/src/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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

interface Option {
  value: string | number;
  label: string;
}

interface ComboboxGenericProps {
  options: Option[];
  placeholder: string;
  onValueChange: (value: string | number) => void;
  defaultValue?: string | number;
}

function ComboboxGeneric({
  options,
  onValueChange,
  defaultValue,
  placeholder = "Sélectionnez un élément",
}: ComboboxGenericProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | number | undefined>(defaultValue);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[250px] p-0">
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder="Rechercher..."
            className="border-none focus:ring-0 focus:ring-transparent"
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setValue(option.value);
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboboxGeneric;
