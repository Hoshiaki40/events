// src/components/multi-Faceted-select.tsx

import * as React from "react";
import { cn } from "@/src/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  WandSparkles,
  XCircle,
} from "lucide-react";

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

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * An array of option objects to be displayed in the multi-select component.
 * Each option object has a label, value, and an optional icon.
 */
export interface Options {
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: number | string;
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue">,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: Options[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: (string | number | any)[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue: (string | number | any)[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  /**
   * Mode de sélection. 'single' pour une sélection unique, 'multiple' pour une sélection multiple.
   * Par défaut, 'multiple'.
   */
  selectMode?: "single" | "multiple";
  /**
   * usage. 'form' pour une utilisation sur formulaire, 'filter' pour une utilisation en tant que filtre.
   * Par défaut, 'filter'.
   */
  usage?: "form" | "filter";
}

export type MultiSelectExtraProps = Pick<
  MultiSelectProps,
  "defaultValue" | "usage" | "onValueChange" | "selectMode" | "placeholder"
>;

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 1,
      modalPopover = true,
      asChild = false,
      className,
      selectMode = "multiple",
      usage = "filter",
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<
      (string | number)[]
    >(() => {
      // Fonction pour vérifier si une valeur est valide
      const isValidValue = (
        value: string | number | null | undefined
      ): value is string | number => {
        return (
          value !== null && value !== undefined && value !== 0 && value !== ""
        );
      };

      // Filtrer les valeurs invalides
      const filteredValues = defaultValue.filter(isValidValue);

      // Si le mode est "single", ne prendre que la première valeur valide
      return selectMode === "single"
        ? filteredValues.slice(0, 1)
        : filteredValues;
    });
    // >(selectMode === "single" ? defaultValue.slice(0, 1) : defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(
        defaultValue.filter((item) => ![0, "", undefined].includes(item))
      );
    }, [defaultValue]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string | number) => {
      let newSelectedValues: (string | number)[];
      if (selectMode === "single") {
        newSelectedValues = [value];
      } else {
        newSelectedValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value];
      }
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = () => {
      if (selectMode === "multiple") {
        if (selectedValues.length === options.length) {
          handleClear();
        } else {
          const allValues = options.map((option) => option.value);
          setSelectedValues(allValues);
          onValueChange(allValues);
        }
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          {usage === "filter" ? (
            <Button
              ref={ref}
              {...props}
              variant={"outline-warning"}
              size="sm"
              onClick={handleTogglePopover}
              className={cn("h-8 border-dashed", className)}
            >
              <div className="mx-auto flex w-full items-center justify-between">
                <PlusCircledIcon className="mr-2 h-4 cursor-pointer" />
                <span className="text-sm">{placeholder}</span>
              </div>
              {selectedValues.length > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-wrap items-center">
                      {selectedValues.length === 1 &&
                        selectedValues.slice(0, maxCount).map((value) => {
                          const option = options.find((o) => o.value === value);
                          const IconComponent = option?.icon;
                          return (
                            <Badge
                              key={value}
                              className={cn(
                                isAnimating ? "animate-bounce" : "",
                                multiSelectVariants({
                                  variant,
                                })
                              )}
                              style={{
                                animationDuration: `${animation}s`,
                              }}
                            >
                              {IconComponent && (
                                <IconComponent className="mr-2 h-4 w-4" />
                              )}
                              {option?.label}
                            </Badge>
                          );
                        })}
                      {selectedValues.length > maxCount && (
                        <Badge
                          className={cn(
                            "border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
                            isAnimating ? "animate-bounce" : "",
                            multiSelectVariants({
                              variant,
                            })
                          )}
                          style={{
                            animationDuration: `${animation}s`,
                          }}
                        >
                          {`+ ${selectedValues.length} selected`}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <XCircle
                        className="mx-2 h-4 w-4 cursor-pointer text-muted-foreground"
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
          ) : (
            <Button
              variant="outline"
              role="combobox"
              {...props}
              className={cn("w-full justify-between", className)}
            >
              <div className="flex w-full truncate">
                {selectedValues.length > 0
                  ? options.find((option) => option.value === selectedValues[0])
                      ?.label
                    ? options.find(
                        (option) => option.value === selectedValues[0]
                      )?.label
                    : placeholder
                  : placeholder}
              </div>
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto border p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              className="border-0 focus:ring-0"
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList className="max-h-[250px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectMode === "multiple" && (
                  <CommandItem
                    key="all"
                    onSelect={toggleAll}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValues.length === options.length
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>(Tout sélectionner)</span>
                  </CommandItem>
                )}
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        toggleOption(option.value);
                        if (selectMode === "single") {
                          setIsPopoverOpen(false);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem
                      onSelect={handleClear}
                      className="flex-1 cursor-pointer justify-center"
                    >
                      Effacer
                    </CommandItem>
                    <Separator
                      orientation="vertical"
                      className="flex h-full min-h-6"
                    />
                  </>
                )}
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className="max-w-full flex-1 cursor-pointer justify-center"
                >
                  Fermer
                </CommandItem>
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
        {/* {animation > 0 && selectedValues.length > 0 && (
                    <WandSparkles
                        className={cn(
                            "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
                            isAnimating ? "" : "text-muted-foreground"
                        )}
                        onClick={() => setIsAnimating(!isAnimating)}
                    />
                )} */}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
