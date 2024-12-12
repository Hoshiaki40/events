// src/infrastructure/mappers/UserMapper.ts
import {
  User as PrismaUser,
  Profile as PrismaProfile,
  Client as PrismaClient,
  PostalAddress as PrismaPostalAddress,
} from "@prisma/client";
import {
  User,
  Profile,
  Client,
  PostalAddress,
} from "../../domain/entities/user";

export class UserMapper {
  static toDomain(
    prismaUser: PrismaUser & {
      profile?:
        | (PrismaProfile & {
            postalAddress: PrismaPostalAddress[];
          })
        | null;
      client?: PrismaClient | null;
    }
  ): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.username,
      password: prismaUser.password,
      active: prismaUser.active,
      emailVerified: prismaUser.emailVerified,
      image: prismaUser.image,
      isTwoFactorEnabled: prismaUser.isTwoFactorEnabled,
      createdBy: prismaUser.createdBy,
      updatedBy: prismaUser.updatedBy,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      profile: prismaUser.profile
        ? this.toDomainProfile(prismaUser.profile)
        : null,
      client: prismaUser.client ? this.toDomainClient(prismaUser.client) : null,
    };
  }

  static toDomainProfile(
    prismaProfile: PrismaProfile & { postalAddress: PrismaPostalAddress[] }
  ): Profile {
    return {
      id: prismaProfile.id,
      firstName: prismaProfile.firstName,
      lastName: prismaProfile.lastName,
      gender: prismaProfile.gender,
      birthDate: prismaProfile.birthDate,
      birthPlace: prismaProfile.birthPlace,
      profession: prismaProfile.profession,
      registrationNumber: prismaProfile.registrationNumber,
      cin: prismaProfile.cin,
      postalAddress: prismaProfile.postalAddress.map((address) =>
        this.toDomainPostalAddress(address)
      ),
      phone: prismaProfile.phone,
      createdAt: prismaProfile.createdAt,
      updatedAt: prismaProfile.updatedAt,
      userId: prismaProfile.userId,
    };
  }

  static toDomainPostalAddress(
    postalAddress: PrismaPostalAddress
  ): PostalAddress {
    return {
      id: postalAddress.id,
      profileId: postalAddress.profileId,
      address: postalAddress.address,
      isCurrent: postalAddress.isCurrent,
      createdAt: postalAddress.createdAt,
      createdBy: postalAddress.createdBy,
      updatedAt: postalAddress.updatedAt,
      updatedBy: postalAddress.updatedBy,
    };
  }

  static toDomainClient(prismaClient: PrismaClient): Client {
    return {
      id: prismaClient.id,
      userId: prismaClient.userId,
      clientType: prismaClient.clientType,
      createdAt: prismaClient.createdAt,
      updatedAt: prismaClient.updatedAt,
    };
  }
}
