import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { useDebouncedCallback } from "use-debounce";

import { formatDate } from "@/src/lib/utils";

export function useDebounce(key: string | string[], delay: number = 600) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return useDebouncedCallback(
    (
      term: string | string[] | undefined | DateRange,
      pageParams: boolean = true
    ) => {
      const oldParams = new URLSearchParams(searchParams);
      const newParams = new URLSearchParams(searchParams);
      let page = newParams.get("page") ?? "1";
      const page_content = newParams.get("page_content") ?? "10";

      newParams.delete("page");
      newParams.delete("page_content");
      oldParams.delete("page");
      oldParams.delete("page_content");

      if (term) {
        if (
          Array.isArray(key) &&
          typeof term === "object" &&
          "from" in term &&
          "to" in term
        ) {
          // Cas spécifique pour from et to
          if (term.from) {
            newParams.set(key[0], formatDate(term.from));
          } else {
            newParams.delete(key[0]);
          }
          if (term.to) {
            newParams.set(key[1], formatDate(term.to));
          } else {
            newParams.delete(key[1]);
          }
        } else if (Array.isArray(term)) {
          // Si term est un tableau, joindre les éléments avec une virgule
          newParams.set(key as string, term.join(","));
        } else if (typeof term === "string" && term !== "") {
          // Si term est une chaîne, l'utiliser directement
          newParams.set(key as string, term);
        }
      } else {
        // Si term est undefined, supprimer les clés correspondantes
        if (Array.isArray(key)) {
          key.forEach((k) => newParams.delete(k));
        } else {
          newParams.delete(key);
        }
      }

      // Vérifier si c'est un nouveau filtrage
      const isNewFilter = newParams.toString() !== oldParams.toString();
      if (isNewFilter) {
        // Réinitialiser page et page_content seulement pour un nouveau filtrage
        newParams.set("page", "1");
      } else {
        newParams.set("page", page);
      }

      newParams.set("page_content", page_content);
      if (!pageParams) {
        newParams.delete("page");
        newParams.delete("page_content");
      }
      router.push(`${pathname}?${newParams.toString()}`);
    },
    delay
  );
}
