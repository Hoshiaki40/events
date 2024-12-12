import {
  Subject as PrismaSubject,
  SubjectTitle as PrismaSubjectTitle,
} from "@prisma/client";

import { Subject } from "../entities/subject";
import { SubjectTitleMapper } from "./subject-title.mapper"; // Importez le mapper existant

export class SubjectMapper {
  static toDomain(
    prismaSubject: PrismaSubject & {
      subjectTitle: PrismaSubjectTitle;
    }
  ): Subject {
    return {
      id: prismaSubject.id,
      coefficient: prismaSubject.coefficient,
      createdBy: prismaSubject.createdBy,
      updatedBy: prismaSubject.updatedBy,
      subjectTitleId: prismaSubject.subjectTitleId,
      subjectTitle: SubjectTitleMapper.toDomain(prismaSubject.subjectTitle), // Utilisez le mapper existant
      schoolYearId: prismaSubject.schoolYearId,
      levelId: prismaSubject.levelId,
      serie: prismaSubject.serie,
      createdAt: prismaSubject.createdAt ?? null,
      updatedAt: prismaSubject.updatedAt ?? null,
    };
  }
}
