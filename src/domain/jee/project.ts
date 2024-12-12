import { Role } from "./roles";

// Définition du type pour un projet
export interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  members: Array<{ userId: string; role: Role }>;
  taskIds: string[];
}
