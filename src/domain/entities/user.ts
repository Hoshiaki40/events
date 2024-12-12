export type ClientType = "NURSERY" | "PRIMARY" | "COLLEGE" | "HIGH_SCHOOL";
export type Gender = "HOMME" | "FEMME";

export interface PostalAddress {
  id: number;
  profileId: string;
  address: string;
  isCurrent: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string | null;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string | null;
  gender: Gender;
  birthDate: Date;
  birthPlace: string | null;
  profession: string | null;
  registrationNumber: string;
  cin: string | null;
  postalAddress: PostalAddress[];
  phone: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Client {
  id: string;
  userId: string;
  clientType: ClientType;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  active: boolean;
  emailVerified: Date | null;
  image: string | null;
  isTwoFactorEnabled: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile | null;
  client?: Client | null;
}
