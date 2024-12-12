import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const usePagination = (totalPage: number) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const page_content = Number(searchParams.get("page_content")) || 10

    const createPageURL = (updates: Record<string, string | number>) => {
        const params = new URLSearchParams(searchParams)
        Object.entries(updates).forEach(([key, value]) =>
            params.set(key, value.toString())
        )
        return `${pathname}?${params.toString()}`
    }

    const navigateTo = (url: string) => {
        router.push(url, { scroll: false })
    }

    const getPageUrl = (newPage: number) => {
        return createPageURL({
            page: Math.max(1, Math.min(newPage, totalPage || Infinity)),
        })
    }

    const getPerPageUrl = (newPerPage: number) => {
        return createPageURL({ page: 1, page_content: newPerPage })
    }
    const isFirstPage = page <= 1
    const isLastPage = totalPage !== undefined && page >= totalPage

    return {
        navigateTo,
        getPageUrl,
        getPerPageUrl,
        page,
        page_content,
        isFirstPage,
        isLastPage,
    }
}
