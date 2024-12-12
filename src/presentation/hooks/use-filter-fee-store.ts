import { endOfYear, startOfYear } from "date-fns"
import { DateRange } from "react-day-picker"
import { create } from "zustand"

interface FilterFeeState {
    //! Level
    selectedLevelFilters: (string | number)[]
    setSelectedLevelFilters: (filters: (string | number)[]) => void
    //! College Year
    selectedCollegeYearFilters: (string | number)[]
    setSelectedCollegeYearFilters: (filters: (string | number)[]) => void
    //! Tranche
    selectedTrancheFilters: (string | number)[]
    setSelectedTrancheFilters: (filters: (string | number)[]) => void
    //! Tuition fee
    selectedTuitionFeeFilters: (string | number)[]
    setSelectedTuitionFeeFilters: (filters: (string | number)[]) => void
    //! Range date
    selectedRangeDateFilters: DateRange | undefined
    setSelectedRangeDateFilters: (filters: DateRange | undefined) => void
}

export const useFilterFeeStore = create<FilterFeeState>((set) => ({
    //! Level
    selectedLevelFilters: [],
    setSelectedLevelFilters: (filters) =>
        set({ selectedLevelFilters: filters }),

    //! College Year
    selectedCollegeYearFilters: [],
    setSelectedCollegeYearFilters: (filters) =>
        set({ selectedCollegeYearFilters: filters }),

    //! Tranche
    selectedTrancheFilters: [],
    setSelectedTrancheFilters: (filters) =>
        set({ selectedTrancheFilters: filters }),

    //! Tuition fee
    selectedTuitionFeeFilters: [],
    setSelectedTuitionFeeFilters: (filters) =>
        set({ selectedTuitionFeeFilters: filters }),

    //! Range date
    selectedRangeDateFilters: {
        from: startOfYear(new Date()),
        to: endOfYear(new Date()),
    },
    setSelectedRangeDateFilters: (filters) =>
        set({ selectedRangeDateFilters: filters }),
}))
