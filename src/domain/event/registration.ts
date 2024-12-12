export type RegistrationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "WAITLIST";

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}
