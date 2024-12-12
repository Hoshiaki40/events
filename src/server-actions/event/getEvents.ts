// app/actions/events.ts
"use server";

import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

import db from "@/src/infrastructure/database/prisma";

export async function getEvents(options?: {
  userId?: string;
  status?: string;
  search?: string;
}) {
  try {
    const session = await auth();

    const where: Prisma.EventWhereInput = {
      ...(options?.userId && { organizerId: options.userId }),
      ...(options?.status && { status: options.status as any }),
      ...(options?.search && {
        OR: [
          { title: { contains: options.search, mode: "insensitive" } },
          { description: { contains: options.search, mode: "insensitive" } },
          { tags: { has: options.search } },
        ],
      }),
    };

    const events = await db.event.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        organizer: {
          select: {
            id: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return { success: true, data: events };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Une erreur est survenue",
    };
  }
}
