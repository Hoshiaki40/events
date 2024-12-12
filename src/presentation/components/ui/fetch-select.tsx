// components/FetchSelect.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form";

import { ComboboxGeneric } from "@/src/presentation/components/ui/combobox";
import { FetchOptions, PaginatedResponse } from "@/app/lib/api";

import SelectGeneric from "./select-generic";

interface Option {
  value: string | number;
  label: string;
}

interface FetchSelectProps<T> {
  value: number | string;
  queryKey: string[];
  placeholder: string;
  onValueChange: (...event: any[]) => void;
  queryFn: (option?: FetchOptions) => Promise<PaginatedResponse<T>>;
  formatOption: (data: PaginatedResponse<T> | undefined) => Option[];
}

export function FetchSelect<T>({
  value,
  queryKey,
  placeholder,
  onValueChange,
  queryFn,
  formatOption,
}: FetchSelectProps<T>) {
  const defaultPaginatedResponse: PaginatedResponse<T> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn,
  });

  const paginatedData = data ?? defaultPaginatedResponse;

  const options = formatOption(paginatedData);

  return (
    <SelectGeneric
      onValueChange={onValueChange}
      defaultValue={value}
      placeholder={placeholder}
      options={options}
    />
  );
}
