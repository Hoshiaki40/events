import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ApiErrors } from "@/src/lib/utils";

type FormSchema<T extends z.ZodType<any, any>> = T;
type InitialData<T extends z.ZodType<any, any>> = DefaultValues<z.infer<T>>;

interface UseFormHookOptions<T extends z.ZodType<any, any>> {
  schema: FormSchema<T>;
  initialData?: InitialData<T>;
  onSubmit?: (data: z.infer<T>) => Promise<void> | void;
}

interface UseFormHookReturn<T extends z.ZodType<any, any>> {
  form: UseFormReturn<z.infer<T>, any>;
  isSubmitting: boolean;
  isValid: boolean;
  router: ReturnType<typeof useRouter>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function useFormHook<T extends z.ZodType<any, any>>({
  schema,
  initialData,
  onSubmit,
}: UseFormHookOptions<T>): UseFormHookReturn<T> {
  const router = useRouter();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        // form.reset()
      } else {
        toast.error("Succès", {
          description: "----",
        });
      }
    } catch (error) {
      if (error instanceof ApiErrors) {
        error.errors.map((item) => {
          toast.error("Erreur", {
            description: item,
          });
        });
      } else {
        toast.error("Erreur", {
          description: "Une erreur inconnue est survenue.",
        });
      }
    }
  });

  return { form, isSubmitting, isValid, router, handleSubmit };
}

export type UseFormHookReturnType<T extends z.ZodType<any, any>> =
  UseFormHookReturn<T>;
export type UseFormHookOptionsType<T extends z.ZodType<any, any>> =
  UseFormHookOptions<T>;
