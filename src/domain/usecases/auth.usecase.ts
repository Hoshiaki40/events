// src/domain/usecases/AuthUseCase.ts
import { UserRepository } from "@/src/infrastructure/repositories/user.repository";
import { User } from "../entities/user";
import { RegisterInput } from "@/src/presentation/schemas/auth.schema";
import { ConflictError, InternalServerError } from "@/src/utils/errors";
import { hashPassword } from "@/src/utils";
// import bcrypt from "bcryptjs";

export class AuthUseCase {
  constructor(private userRepository: UserRepository) {}

  async login(login: string, password: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(login);
  }

  async register(userData: RegisterInput): Promise<User> {
    try {
      const { email, password } = userData;

      // Créer le username à partir de l'email
      const username = email.split("@")[0];

      // Vérifier si l'utilisateur existe déjà
      const existingUserByEmail = await this.userRepository.getUserByEmail(
        email
      );
      const existingUserByUsername =
        await this.userRepository.getUserByUsername(username);

      if (existingUserByEmail || existingUserByUsername) {
        throw new ConflictError(
          "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà"
        );
      }

      // Hasher le mot de passe
      const hashedPassword = await hashPassword(password);

      // Créer l'utilisateur
      const newUser = await this.userRepository.createUser({
        email,
        username,
        password: hashedPassword,
      });

      const client = await this.userRepository.createClient({
        clientType: "NURSERY",
        userId: newUser.id,
      });

      newUser.client = client;

      return newUser;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      }
      throw new InternalServerError(
        "Une erreur inattendue s'est produite lors de l'inscription"
      );
    }
  }
}
