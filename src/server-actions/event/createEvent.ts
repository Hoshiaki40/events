"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

import db from "@/src/infrastructure/database/prisma";
import {
  EventFormData,
  eventSchema,
} from "@/src/presentation/schemas/event.schema";

export async function createEvent(data: EventFormData) {
  try {
    // Vérification de l'authentification
    const session = await auth();
    if (!session?.user) {
      throw new Error("Vous devez être connecté pour créer un événement");
    }

    // Validation des données avec Zod
    const validatedData = eventSchema.parse(data);

    // Création de l'événement dans la base de données
    const event = await db.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: validatedData.date,
        location: validatedData.location,
        capacity: validatedData.capacity,
        category: validatedData.category,
        tags: validatedData.tags,
        imageUrl: validatedData.imageUrl || null,
        status: validatedData.status,
        organizerId: session.user.id,
      },
    });

    // Revalidation du cache
    revalidatePath("/events");
    revalidatePath("/my-events");

    return { success: true, data: event };
  } catch (error) {
    console.log(error);
    // Gestion des erreurs de validation Zod
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Données invalides",
        details: error.flatten().fieldErrors,
      };
    }

    // Gestion des autres erreurs
    return {
      success: false,
      error: "Une erreur est survenue lors de la création de l'événement",
      details: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}
