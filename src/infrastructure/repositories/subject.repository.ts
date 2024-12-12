import { Subject } from "@/src/domain/entities/subject";
import { ISubjectRepository } from "@/src/domain/interfaces/subject.repository";
import { SubjectMapper } from "@/src/domain/mappers/subject.mapper";
import prisma from "@/src/infrastructure/database/prisma";

export class SubjectRepository implements ISubjectRepository {
  async getSubjectById(id: string): Promise<Subject | null> {
    const prismaSubject = await prisma.subject.findUnique({
      where: { id },
      include: { subjectTitle: true },
    });
    return prismaSubject ? SubjectMapper.toDomain(prismaSubject) : null;
  }

  async getSubjects(
    filter: Partial<
      Pick<
        Subject,
        "schoolYearId" | "levelId" | "createdBy" | "coefficient" | "serie"
      >
    >
  ): Promise<Subject[]> {
    const prismaSubjects = await prisma.subject.findMany({
      where: filter,
      include: { subjectTitle: true },
    });
    return prismaSubjects.map(SubjectMapper.toDomain);
  }

  async createSubject(
    subjectData: Pick<
      Subject,
      | "coefficient"
      | "createdBy"
      | "subjectTitleId"
      | "schoolYearId"
      | "levelId"
    >
  ): Promise<Subject> {
    const prismaSubject = await prisma.subject.create({
      data: subjectData,
      include: { subjectTitle: true },
    });
    return SubjectMapper.toDomain(prismaSubject);
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
    >
  ): Promise<Subject | null> {
    const prismaSubject = await prisma.subject.update({
      where: { id },
      data: subjectData,
      include: { subjectTitle: true },
    });
    return prismaSubject ? SubjectMapper.toDomain(prismaSubject) : null;
  }

  async deleteSubject(id: string): Promise<void> {
    await prisma.subject.delete({
      where: { id },
    });
  }
}
