import React, { useMemo, useState } from "react";

import { Input } from "@/src/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/presentation/components/ui/select";

interface Option {
  value: string | number;
  label: string;
}

interface SelectGenericProps {
  options: Option[];
  placeholder: string;
  onValueChange: (value: string | number) => void;
  defaultValue?: string | number;
}

function SelectGeneric({
  options,
  onValueChange,
  defaultValue,
  placeholder = "Sélectionnez un élément",
}: SelectGenericProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  return (
    <Select
      onValueChange={(value) => {
        onValueChange(value);
      }}
      value={defaultValue?.toString()}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger onClick={() => setIsOpen(true)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[250px]">
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        {filteredOptions.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
        {filteredOptions.length === 0 && (
          <div className="p-2 text-center text-gray-500">
            Aucun résultat trouvé
          </div>
        )}
      </SelectContent>
    </Select>
  );
}

export default SelectGeneric;
