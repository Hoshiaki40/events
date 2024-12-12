"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DefaultValues } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { partialUpdate } from "../api/student.api"
import { useFormHook } from "./use-form-hook"

type Props<T extends z.ZodType<any, any, any>> = {
    url: string
    initialData: DefaultValues<z.infer<T>>
    onSaved: (saved: boolean) => void
    schema: T
}

function useStudentQuery<T extends z.ZodType<any, any, any>>({
    url,
    initialData,
    onSaved,
    schema,
}: Props<T>) {
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: (data: z.infer<T>) => partialUpdate(data, url),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return (
                        Array.isArray(query.queryKey) &&
                        query.queryKey[0] === "students"
                    )
                },
            })
        },
    })

    const { form, handleSubmit, isSubmitting, isValid } = useFormHook<T>({
        schema,
        initialData,
        onSubmit: async (data) => {
            try {
                await schema.parseAsync(data)
                await updateMutation.mutateAsync(data)
                onSaved(true)
            } catch (error) {
                toast.error("Error", { description: String(error) })
                onSaved(false)
            }
        },
    })

    return { form, handleSubmit, isSubmitting, isValid }
}

export default useStudentQuery
