export interface SchoolYear {
  id: number;
  startYear: number;
  endYear: number;
  createdBy: string;
  updatedBy?: string | null;
  updatedAt: Date;
  createdAt: Date;
}
