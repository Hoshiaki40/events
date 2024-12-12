import { SubjectFilter } from "@/src/presentation/schemas/subject.schema";
import { Subject } from "../entities/subject";
import { ISubjectRepository } from "../interfaces/subject.repository";

export class SubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async getSubjectById(id: string): Promise<Subject | null> {
    return this.subjectRepository.getSubjectById(id);
  }

  async getSubjects(
    filter: SubjectFilter,
  ): Promise<Subject[]> {
    return this.subjectRepository.getSubjects(filter);
  }

  async createSubject(
    subjectData: Pick<
      Subject,
      | "coefficient"
      | "createdBy"
      | "subjectTitleId"
      | "schoolYearId"
      | "levelId"
    >,
  ): Promise<Subject> {
    return this.subjectRepository.createSubject(subjectData);
  }

  async updateSubject(
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
  ): Promise<Subject | null> {
    return this.subjectRepository.updateSubject(id, subjectData);
  }

  async deleteSubject(id: string): Promise<void> {
    return this.subjectRepository.deleteSubject(id);
  }
}
