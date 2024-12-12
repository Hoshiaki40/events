"use server";

import { auth } from "@/auth";

import { Event } from "@/src/domain/event/event";
import db from "@/src/infrastructure/database/prisma";

export async function getEventById(id: string): Promise<{
  success: boolean;
  data?: Event;
  error?: string;
}> {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Vous devez être connecté");
    }

    const event = await db.event.findUnique({
      where: {
        id,
        // Optionnel : vérifier que l'utilisateur est l'organisateur
        organizerId: session.user.id,
      },
    });

    if (!event) {
      return {
        success: false,
        error: "Événement non trouvé",
      };
    }

    return {
      success: true,
      data: event,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}
