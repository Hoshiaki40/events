import { Subject } from "../entities/subject";

export interface ISubjectRepository {
  getSubjectById(id: string): Promise<Subject | null>;
  getSubjects(
    filter: Partial<
      Pick<Subject, "schoolYearId" | "levelId" | "createdBy" | "coefficient">
    >,
  ): Promise<Subject[]>;
  createSubject(
    subjectData: Pick<
      Subject,
      | "coefficient"
      | "createdBy"
      | "subjectTitleId"
      | "schoolYearId"
      | "levelId"
    >,
  ): Promise<Subject>;
  updateSubject(
    id: string,
    subjectData: Partial<
      Pick<
        Subject,
        | "coefficient"
        | "updatedBy"
        | "subjectTitleId"
        | "schoolYearId"
        | "levelId"
      >
    >,
  ): Promise<Subject | null>;
  deleteSubject(id: string): Promise<void>;
}
