// components/FetchSelect.tsx
import React from "react"

import { FetchOptions, PaginatedResponse } from "@/app/lib/api"
import { useGenericFetch } from "@/app/hooks/use-generic-fetch"

import { MultiSelect, Options } from "./multi-select"

interface FetchSelectProps<T> {
    value: (number | string | any)[]
    queryKey: string[]
    placeholder?: string
    selectMode?: "single" | "multiple"
    usage?: "form" | "filter"
    option?: FetchOptions
    onValueChange: (...event: any[]) => void
    queryFn: (option?: FetchOptions) => Promise<PaginatedResponse<T>>
    formatOption: (data: PaginatedResponse<T> | undefined) => Options[]
}

export function FetchMultiSelect<T>({
    value,
    queryKey,
    placeholder,
    selectMode,
    usage,
    option,
    onValueChange,
    queryFn,
    formatOption,
}: FetchSelectProps<T>) {
    const { data } = useGenericFetch(
        [...queryKey, option?.queryString ?? ""],
        queryFn,
        {},
        option
    )
    const options = formatOption(data)

    return (
        <MultiSelect
            options={options}
            onValueChange={onValueChange}
            defaultValue={value}
            placeholder={placeholder}
            variant="inverted"
            maxCount={1}
            selectMode={selectMode}
            usage={usage}
        />
    )
}
