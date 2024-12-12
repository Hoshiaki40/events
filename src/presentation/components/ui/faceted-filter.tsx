"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { FetchOptions, PaginatedResponse } from "@/app/lib/api"
import { useDebounce } from "@/app/hooks/use-debounce"
import { useGenericFetch } from "@/app/hooks/use-generic-fetch"

import { MultiSelect, Options } from "./multi-select"

interface FacetedFilterProps<T> {
    queryKey: string[]
    params: string
    placeholder: string
    selectMode?: "single" | "multiple"
    usage?: "form" | "filter"
    fetch: (option?: FetchOptions) => Promise<PaginatedResponse<T>>
    formatOption: (data: PaginatedResponse<T> | undefined) => Options[]
}

function FacetedFilter<T>({
    queryKey,
    params,
    placeholder,
    selectMode,
    usage,
    fetch,
    formatOption,
}: FacetedFilterProps<T>) {
    const searchParams = useSearchParams()

    const [query, setQuery] = useState<(number | string)[]>(
        searchParams.get(params)?.split(",").map(Number) || []
    )
    const debouncedSubjectTitle = useDebounce(params)

    const { data } = useGenericFetch(queryKey, fetch)

    const options: Options[] = formatOption(data)

    useEffect(() => {
        debouncedSubjectTitle(query?.toString())
    }, [query, debouncedSubjectTitle])

    return (
        <MultiSelect
            options={options}
            onValueChange={setQuery}
            defaultValue={query}
            placeholder={placeholder}
            variant="inverted"
            selectMode={selectMode}
            usage={usage}
            animation={2}
            maxCount={1}
        />
    )
}

export default FacetedFilter
