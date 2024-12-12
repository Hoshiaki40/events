import prisma from "@/src/infrastructure/database/prisma";
import { Client, User } from "@/src/domain/entities/user";
import { UserMapper } from "@/src/domain/mappers/user.mapper";
import { IUserRepository } from "@/src/domain/interfaces/user.repository";

export class UserRepository implements IUserRepository {
  async createClient(
    clientData: Pick<Client, "clientType" | "userId">
  ): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        clientType: clientData.clientType,
        userId: clientData.userId,
      },
    });

    return UserMapper.toDomainClient(client);
  }
  async createUser(
    userData: Pick<User, "username" | "email" | "password">
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        username: userData.username,
      },
    });

    return UserMapper.toDomain(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
      include: { profile: { include: { postalAddress: true } }, client: true },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { username },
      include: { profile: { include: { postalAddress: true } }, client: true },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async getUserById(id: string): Promise<User | null> {
    const prismaUser = await prisma.user.findUnique({
      where: { id },
      include: { profile: { include: { postalAddress: true } }, client: true },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }
}
