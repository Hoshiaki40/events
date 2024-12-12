import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/src/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { Badge } from "@/src/presentation/components/ui/badge";
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
import { Separator } from "@/src/presentation/components/ui/separator";
import { useDebounce } from "@/app/hooks/use-debounce";
import type { Option } from "@/app/lib/types";

interface DataTableFacetedFilterProps {
  title?: string;
  itemKey: string;
  options: Option[];
}

export function DataTableFacetedFilter({
  title,
  itemKey,
  options,
}: DataTableFacetedFilterProps) {
  const searchParams = useSearchParams();
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set(searchParams.get(itemKey)?.split(","))
  );
  const handleFilter = useDebounce(itemKey);

  const toggleOption = useCallback(
    (optionValue: string, isMultiple: boolean) => {
      setSelectedValues((prevValues) => {
        const newValues = new Set(prevValues);
        if (isMultiple) {
          console.log("optionValue :", searchParams.get(itemKey));
          if (newValues.has(optionValue)) {
            newValues.delete(optionValue);
          } else {
            newValues.add(optionValue);
          }
        } else {
          if (newValues.has(optionValue)) {
            newValues.clear();
          } else {
            newValues.clear();
            newValues.add(optionValue);
          }
        }
        handleFilter(Array.from(newValues).join(","));
        return newValues;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleFilter]
  );

  const clearFilters = useCallback(() => {
    setSelectedValues(new Set());
    handleFilter(undefined);
  }, [handleFilter]);

  const renderBadges = () => {
    if (selectedValues.size > 1) {
      return (
        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
          {selectedValues.size} selected
        </Badge>
      );
    }
    return options
      .filter((option) => selectedValues.has(option.value))
      .map((option) => (
        <Badge
          variant="secondary"
          key={option.value}
          className="rounded-sm px-1 font-normal"
        >
          {option.label}
        </Badge>
      ));
  };

  const renderCommandItem = (option: Option) => (
    <CommandItem
      key={option.value}
      onSelect={() => toggleOption(option.value, !!option.isSelectedMultiple)}
    >
      <OptionCheckbox isSelected={selectedValues.has(option.value)} />
      {option.icon && <option.icon className="mr-2" aria-hidden="true" />}
      <span>{option.label}</span>
      {option.withCount && (
        <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs" />
      )}
    </CommandItem>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 size-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">{renderBadges()}</div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 bg-background p-0" align="start">
        <Command className="bg-background">
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>{options.map(renderCommandItem)}</CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearFilters}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function OptionCheckbox({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className={cn(
        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "opacity-50 [&_svg]:invisible"
      )}
    >
      <CheckIcon className="size-4" aria-hidden="true" />
    </div>
  );
}
