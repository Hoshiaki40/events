export interface SubjectTitle {
  id: string;
  name: string;
  codification: string;
  createdBy: string;
  updatedBy?: string | null;
  schoolId: string;
  createdAt: Date;
  updatedAt: Date;
}
