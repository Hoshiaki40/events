type Status = "PRIVE" | "PUBLIC";
type Parcours = "GENERAL" | "TECHNIQUE";
type Cycles = "COLLEGE" | "LYCEE" | "PRIMAIRE";

export interface School {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
  imageUrl: string | null;
  status: Status | null;
  parcours: Parcours | null;
  createdBy: string;
  updatedBy: string | null;
  cycle: Cycles | null;
  createdAt: Date;
  updatedAt: Date;
}
