import z from "zod";

export const subjectFilterSchema = z.object({
  schoolYearId: z.number().optional(),
  levelId: z.number().optional(),
  createdBy: z.string().optional(),
  coefficient: z.number().optional(),
  serie: z.enum(["A", "D", "C", "TECHNIQUE", "OSE", "S", "L", "G2"]).optional(),
});

export type SubjectFilter = z.infer<typeof subjectFilterSchema>;
