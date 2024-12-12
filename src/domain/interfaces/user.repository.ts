import { User, Client } from "../entities/user";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  createUser(
    userData: Pick<User, "username" | "email" | "password">
  ): Promise<User>;
  createClient(
    clientData: Pick<Client, "clientType" | "userId">
  ): Promise<Client>;
}
