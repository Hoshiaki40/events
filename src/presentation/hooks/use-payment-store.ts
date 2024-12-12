import { create } from "zustand"

import { StudentRegistration } from "../types"
import { ID } from "../types/default.type"
import { useHydration } from "./use-store"

export type PaymentDataProps = {
    student?: { nie?: string; name?: string; team?: string } | undefined
    restEstimatedPayable?: number
    concernedFeeAmount?: number
    rest?: number
}
export interface PaymentState {
    //! Level
    selectedLevelFilters: (string | number)[]
    setSelectedLevelFilters: (filters: (string | number)[]) => void
    //! College Year
    selectedCollegeYearFilters: (string | number)[]
    setSelectedCollegeYearFilters: (filters: (string | number)[]) => void
    //! To Print
    paymentData: PaymentDataProps | null
    setPaymentData: (
        data:
            | PaymentDataProps
            | ((prevData: PaymentDataProps | null) => PaymentDataProps)
    ) => void
    // !Registration Student
    registrationStudents?: StudentRegistration
    addRegistrationStudent: (student: StudentRegistration) => void
    clearRegistrationStudents: () => void
}

export const usePaymentStore = create<PaymentState>((set) => ({
    //! Level
    selectedLevelFilters: [],
    setSelectedLevelFilters: (filters) =>
        set({ selectedLevelFilters: filters }),

    //! College Year
    selectedCollegeYearFilters: [],
    setSelectedCollegeYearFilters: (filters) =>
        set({ selectedCollegeYearFilters: filters }),

    //! To print
    paymentData: null,
    setPaymentData: (data) =>
        set((state) => ({
            paymentData:
                typeof data === "function" ? data(state.paymentData) : data,
        })),

    //! Registration Student
    registrationStudents: undefined,

    addRegistrationStudent: (registration) =>
        set({ registrationStudents: registration }),

    clearRegistrationStudents: () => set({ registrationStudents: undefined }),
}))

export function useHydratedPaymentStore() {
    const store = usePaymentStore()
    const hydrated = useHydration()

    if (!hydrated) {
        return {} as typeof store
    }

    return store
}
