export type EventStatus =
  | "DRAFT"
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";
export type Category =
  | "CONFERENCE"
  | "WORKSHOP"
  | "NETWORKING"
  | "CULTURAL"
  | "SPORTS"
  | "OTHER";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  imageUrl: string | null;
  status: EventStatus;
  category: Category;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  organizerId: string;
}
