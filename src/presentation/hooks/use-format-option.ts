import { Mention } from "@/app/types/mentions.type"
import { SeanceType } from "@/app/types/seance_types.type"
import { SubjectTitle } from "@/app/types/subject_title.type"
import { TeachingUnit } from "@/app/types/teaching_unit.type"
import { Team } from "@/app/types/teams.type"
import { Staff } from "@/app/types/users.type"
import { PaginatedResponse } from "@/app/lib/api"

import { IClassroom } from "../types"
import { CollegeYear } from "../types/college_years.type"
import { IModel } from "../types/default.type"
import { Fee } from "../types/fee.type"
import { Grade } from "../types/grades.type"
import { Level } from "../types/levels.type"
import { ISemester } from "../types/semesters.type"

export const useFormatOption = () => {
    const formatSubjectTitleOptions = (
        data?: PaginatedResponse<SubjectTitle>
    ) => {
        return (
            data?.results.map((subjectTitle) => ({
                label: subjectTitle.name?.toString() as string,
                value: Number(subjectTitle.id),
            })) || []
        )
    }

    const formatCollegeYearOptions = (
        data?: PaginatedResponse<CollegeYear>
    ) => {
        return (
            data?.results.map((cy) => ({
                label: cy.name,
                value: Number(cy.id),
            })) || []
        )
    }

    const formatTeachingUnitOptions = (
        data?: PaginatedResponse<TeachingUnit>
    ) => {
        return (
            data?.results.map((teaching_unit) => ({
                label: teaching_unit.name?.toString() as string,
                value: Number(teaching_unit.id),
            })) || []
        )
    }

    const formatSeanceTypeOptions = (data?: PaginatedResponse<SeanceType>) => {
        return (
            data?.results.map((seance_type) => ({
                label: seance_type.name?.toString() as string,
                value: Number(seance_type.id),
            })) || []
        )
    }

    const formatTeacherOptions = (data?: PaginatedResponse<Staff>) => {
        return (
            data?.results.map((teacher) => ({
                label: teacher.getName(),
                value: Number(teacher.id),
            })) || []
        )
    }

    const formatGradeOptions = (data?: PaginatedResponse<Grade>) => {
        return (
            data?.results.map((team) => ({
                label: String(team.name),
                value: Number(team.id),
            })) || []
        )
    }

    const formatTeamOptions = (data?: PaginatedResponse<Team>) => {
        return (
            data?.results.map((team) => ({
                label: String(team.name),
                value: Number(team.id),
            })) || []
        )
    }

    const formatMentionOptions = (data?: PaginatedResponse<Mention>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.name),
                value: Number(item.id),
            })) || []
        )
    }

    const formatLevelOptions = (data?: PaginatedResponse<Level>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.name),
                value: Number(item.id),
            })) || []
        )
    }

    const formatFeeOptions = (data?: PaginatedResponse<Fee>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.toString()),
                value: Number(item.id),
            })) || []
        )
    }

    const formatSemestersOptions = (data?: PaginatedResponse<ISemester>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.name),
                value: Number(item.id),
            })) || []
        )
    }

    const formatClassroomsOptions = (data?: PaginatedResponse<IClassroom>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.name),
                value: Number(item.id),
            })) || []
        )
    }

    const formatModelOptions = (data?: PaginatedResponse<IModel>) => {
        return (
            data?.results.map((item) => ({
                label: String(item.name),
                value: Number(item.id),
            })) || []
        )
    }

    return {
        formatGradeOptions,
        formatTeamOptions,
        formatTeacherOptions,
        formatMentionOptions,
        formatSeanceTypeOptions,
        formatTeachingUnitOptions,
        formatSubjectTitleOptions,
        formatLevelOptions,
        formatFeeOptions,
        formatCollegeYearOptions,
        formatSemestersOptions,
        formatClassroomsOptions,
        formatModelOptions,
    }
}
