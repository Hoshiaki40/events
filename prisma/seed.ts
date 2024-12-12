import { readFileSync } from "fs";
import path from "path";
import { hashPassword } from "@/src/utils";
import { Cycle, Parcours, SERIE, Status } from "@prisma/client";

import prisma from "@/src/infrastructure/database/prisma";

// Définir le type qui correspond à la structure de votre JSON
interface Exercise {
  matiere: string;
  serie: string;
  sous_matiere: string;
  niveau_difficulte: number;
  enonce: string;
  questions: string[];
  responses: string[];
  explications: string[];
  methodes?: string[];
  // ... autres champs
}

async function main() {
  try {
    // Lire le fichier JSON
    const exercisesData = JSON.parse(
      readFileSync(path.join(__dirname, "./data/exos.json"), "utf-8")
    ) as Exercise[];

    const exercises = exercisesData.map((exercise) => {
      const length_question = exercise.questions.length;
      const questions: { [k: string]: string }[] = [];
      for (let i = 0; i < length_question; i++) {
        const question: { [k: string]: string } = {};
        if (exercise.methodes && exercise.methodes.length > 0) {
          question["method"] = exercise.methodes[i];
        }
        if (exercise.responses.length > 0) {
          question["response"] = exercise.responses[i];
        }
        if (exercise.explications.length > 0) {
          question["explication"] = exercise.explications[i];
        }
        question["statement"] = exercise.explications[i];

        questions.push(question);
      }
      return {
        serie: exercise.serie as SERIE,
        difficulty_level: exercise.niveau_difficulte,
        statement: exercise.enonce,
        domain: exercise.sous_matiere,
        questions: questions,
      };
    });

    // const prisma = new PrismaClient();
    const createdBy = "b736ddc4-71d1-425e-be5e-82de1e293aec";
    // Hasher le mot de passe
    const hashedPassword = await hashPassword("12345678");

    const user = await prisma.user.create({
      data: {
        id: createdBy,
        email: "phoenix@email.com",
        username: "phoenix",
        password: hashedPassword,
        createdBy,
      },
    });

    const lemonLycee = await prisma.school.create({
      data: {
        name: "Lemon-Lycée",
        createdBy,
        status: Status.PRIVE,
        parcours: Parcours.GENERAL,
      },
    });

    const schoolYear = await prisma.schoolYear.create({
      data: {
        startYears: 2023,
        endYears: 2024,
        createdBy,
      },
    });

    const terminale = await prisma.level.create({
      data: {
        name: "Tle",
        createdBy,
        cycle: Cycle.LYCEE,
      },
    });

    const premiere = await prisma.level.create({
      data: {
        name: "1ère",
        createdBy,
        cycle: Cycle.LYCEE,
      },
    });

    const seconde = await prisma.level.create({
      data: {
        name: "2nd",
        createdBy,
        cycle: Cycle.LYCEE,
      },
    });

    const mathsTitle = await prisma.subjectTitle.create({
      data: {
        name: "Mathématiques",
        codification: "MATHS",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const francaisTitle = await prisma.subjectTitle.create({
      data: {
        name: "Français",
        codification: "FRS",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const physiqueTitle = await prisma.subjectTitle.create({
      data: {
        name: "Physique-Chimie",
        codification: "PC",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const anglaisTitle = await prisma.subjectTitle.create({
      data: {
        name: "Anglais",
        codification: "ANG",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const phylosTitle = await prisma.subjectTitle.create({
      data: {
        name: "Phylosophie",
        codification: "PHY",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const svtTitle = await prisma.subjectTitle.create({
      data: {
        name: "Science de la vie et de la terre",
        codification: "SVT",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const malagasyTitle = await prisma.subjectTitle.create({
      data: {
        name: "Malagasy",
        codification: "MGA",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const histogeoTitle = await prisma.subjectTitle.create({
      data: {
        name: "Histo-Géo",
        codification: "HG",
        createdBy: createdBy,
        schoolId: lemonLycee.id, // Add the missing schoolId property
      },
    });

    const francaisTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 3,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: francaisTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: francaisTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: francaisTitle.id,
          createdBy,
        },
      ],
    });

    const anglaisTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 2,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: anglaisTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: anglaisTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: anglaisTitle.id,
          createdBy,
        },
      ],
    });

    const phyloTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 2,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: phylosTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: phylosTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: phylosTitle.id,
          createdBy,
        },
      ],
    });

    const hystogeoTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 3,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: histogeoTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: histogeoTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: histogeoTitle.id,
          createdBy,
        },
      ],
    });

    const malagasyTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 3,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: malagasyTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: malagasyTitle.id,
          createdBy,
        },
        {
          coefficient: 2,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: malagasyTitle.id,
          createdBy,
        },
      ],
    });

    const svtTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 2,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: svtTitle.id,
          createdBy,
        },
        {
          coefficient: 4,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: svtTitle.id,
          createdBy,
        },
        {
          coefficient: 3,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: svtTitle.id,
          createdBy,
        },
      ],
    });

    const physChiTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 2,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: physiqueTitle.id,
          createdBy,
        },
        {
          coefficient: 5,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: physiqueTitle.id,
          createdBy,
        },
        {
          coefficient: 8,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: physiqueTitle.id,
          createdBy,
        },
      ],
    });

    const mathsTerminaleSubject = await prisma.subject.createMany({
      data: [
        {
          coefficient: 2,
          serie: SERIE.A,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: mathsTitle.id,
          createdBy,
        },
        {
          coefficient: 5,
          serie: SERIE.C,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: mathsTitle.id,
          createdBy,
        },
        {
          coefficient: 4,
          serie: SERIE.D,
          schoolYearId: schoolYear.id,
          levelId: terminale.id,
          subjectTitleId: mathsTitle.id,
          createdBy,
        },
      ],
    });

    console.log("Start Seeding exercises...");
    const createExercice = async (exercise: (typeof exercises)[0]) => {
      const createdExercise = await prisma.exercise.create({
        data: {
          levelId: terminale.id,
          difficultyLevel: exercise.difficulty_level,
          serie: exercise.serie,
          statement: exercise.statement,
          subjectTitleId: mathsTitle.id,
          domain: exercise.domain,
          questions: {
            createMany: {
              data: exercise.questions.map((question) => ({
                statement: question.statement,
                response: question.response,
                method: question.method,
                explication: question.explication,
              })),
            },
          },
        },
        include: {
          questions: true,
        },
      });

      console.log("Exercise created: ", createdExercise);

      return createdExercise;
    };

    const exercisesToCreated = exercises.map((exercise) => {
      return createExercice(exercise);
    });

    await Promise.all(exercisesToCreated);
    console.log("End Seeding exercises...");

    const existingUser = await prisma.user.findFirst({
      where: {
        id: createdBy,
      },
      include: {
        skills: true,
        exerciceHistory: true,
      },
    });

    // const mathsSubject = await prisma.subject.create({
    //     data: {
    //         coefficient: ,
    //         createdBy,
    //     },
    // });
  } catch (error) {}
}

main();
