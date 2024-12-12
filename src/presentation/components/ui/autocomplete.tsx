import { useMemo, useState } from "react";
import { cn } from "@/src/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";

type ItemProps<T, K extends number | string> = {
  value: T;
  label: string;
  key: K;
};

type Props<T, K extends number | string> = {
  selectedValue?: T;
  selectedKey: K;
  onSelectedValueChange: (value: T) => void;
  onSelectedKeyChange: (value: K) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: ItemProps<T, K>[];
  isLoading?: boolean;
  isResetOnSelect?: boolean;
  emptyMessage?: string;
  placeholder?: string;
};

export function AutoComplete<T, K extends number | string>({
  selectedKey,
  selectedValue,
  onSelectedValueChange,
  onSelectedKeyChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
  isResetOnSelect = true,
}: Props<T, K>) {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.key] = item;
          return acc;
        },
        {} as Record<string | number, ItemProps<T, K>>
      ),
    [items]
  );

  const reset = () => {
    const key = typeof selectedKey === "number" ? (0 as K) : ("" as K);
    onSelectedKeyChange(key);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.hasAttribute("cmdk-list")) {
      // reset()
    }
  };

  const onSelectItem = (value: string) => {
    const key = typeof selectedKey === "number" ? Number(value) : value;
    if (key !== selectedKey) {
      onSelectedKeyChange(key as K);
      onSelectedValueChange(labels[key].value as T);
      onSearchValueChange(String(labels[key].key) ?? "");
    } else {
    }
    if (isResetOnSelect) reset();
    setOpen(false);
  };

  return (
    <div className="flex w-full items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.key}
                      value={String(option.key)}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedKey === option.key
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
