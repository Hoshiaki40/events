import { SubjectTitle as PrismaSubjectTitle } from "@prisma/client";
import { SubjectTitle } from "../entities/subject-title";

export class SubjectTitleMapper {
  static toDomain(prismaSubjectTitle: PrismaSubjectTitle): SubjectTitle {
    return {
      id: prismaSubjectTitle.id,
      name: prismaSubjectTitle.name,
      codification: prismaSubjectTitle.codification,
      createdAt: prismaSubjectTitle.createdAt,
      updatedAt: prismaSubjectTitle.updatedAt,
      createdBy: prismaSubjectTitle.createdBy,
      updatedBy: prismaSubjectTitle.updatedBy,
      schoolId: prismaSubjectTitle.schoolId,
    };
  }
}
