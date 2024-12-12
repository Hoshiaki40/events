// src/infrastructure/store/container.ts
import { PrismaClient } from "@prisma/client";

import { AdaptiveAgent } from "@/src/domain/usecases/agent.usecase";
import { AuthUseCase } from "@/src/domain/usecases/auth.usecase"; // Import AuthUseCase
import { SubjectUseCase } from "@/src/domain/usecases/subject.usecase";

import { AgentRepository } from "../repositories/agent.repository";
import { SubjectRepository } from "../repositories/subject.repository";
import { UserRepository } from "../repositories/user.repository"; // Import UserRepository

// Importez d'autres repositories et usecases

export class Container {
  private static instance: Container;

  // Repositories
  private subjectRepository: SubjectRepository;
  private userRepository: UserRepository; // Add UserRepository

  // Usecases
  private subjectsUseCase: SubjectUseCase;
  private authUseCase: AuthUseCase; // Add AuthUseCase

  private constructor() {
    // Initialize Repositories
    this.subjectRepository = new SubjectRepository();
    this.userRepository = new UserRepository(); // Initialize UserRepository

    // Initialize Usecases
    this.subjectsUseCase = new SubjectUseCase(this.subjectRepository);
    this.authUseCase = new AuthUseCase(this.userRepository); // Initialize AuthUseCase with UserRepository
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Repository getters
  public getSubjectRepository(): SubjectRepository {
    return this.subjectRepository;
  }

  public getUserRepository(): UserRepository {
    // Add getter for UserRepository
    return this.userRepository;
  }

  // Usecase getters
  public getSubjectsUseCase(): SubjectUseCase {
    return this.subjectsUseCase;
  }

  public getAuthUseCase(): AuthUseCase {
    // Add getter for AuthUseCase
    return this.authUseCase;
  }
}
