import { SubjectTitle } from "./subject-title";

export type SERIE = "A" | "D" | "C" | "TECHNIQUE" | "OSE" | "S" | "L" | "G2";

export interface Subject {
  id: string;
  coefficient: number;
  createdBy: string;
  serie?: SERIE | null;
  updatedBy?: string | null;
  subjectTitleId: string;
  subjectTitle: SubjectTitle;
  schoolYearId: number;
  levelId: number;
  createdAt: Date;
  updatedAt: Date;
}
