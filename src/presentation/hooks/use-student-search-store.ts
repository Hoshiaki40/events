// studentSearchStore.ts
import { StudentRegistration } from "@/app/types"
import { create } from "zustand"

import { ID } from "../types/default.type"

interface StudentSearchState {
    registrationStudents: StudentRegistration[]
    addRegistrationStudent: (student: StudentRegistration) => void
    removeRegistrationStudent: (registrationId: ID) => void
    clearRegistrationStudents: () => void
}

export const useStudentSearchStore = create<StudentSearchState>((set) => ({
    registrationStudents: [],

    addRegistrationStudent: (student) =>
        set((state) => {
            const exists = state.registrationStudents.some(
                (s) => s.id === student.id // Assurez-vous que 'id' est la clé unique
            )
            if (!exists) {
                return {
                    registrationStudents: [
                        ...state.registrationStudents,
                        student,
                    ],
                }
            }
            return state
        }),

    removeRegistrationStudent: (registrationId) =>
        set((state) => ({
            registrationStudents: state.registrationStudents.filter(
                (s) => s.id !== registrationId
            ),
        })),

    clearRegistrationStudents: () => set({ registrationStudents: [] }),
}))
