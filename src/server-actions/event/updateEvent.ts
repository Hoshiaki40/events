"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import z from "zod";

import db from "@/src/infrastructure/database/prisma";
import {
  EventFormData,
  eventSchema,
} from "@/src/presentation/schemas/event.schema";

export async function updateEvent(id: string, data: EventFormData) {
  try {
    // Vérification de l'authentification
    const session = await auth();
    if (!session?.user) {
      throw new Error("Vous devez être connecté pour modifier un événement");
    }

    // Validation des données avec Zod
    const validatedData = eventSchema.parse(data);

    // Mise à jour de l'événement dans la base de données
    const updatedEvent = await db.event.update({
      where: {
        id,
        organizerId: session.user.id, // Sécurité : seul l'organisateur peut modifier
      },
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
      },
    });

    // Revalidation du cache
    revalidatePath("/events");
    revalidatePath(`/events/${id}`);

    return {
      success: true,
      data: updatedEvent,
    };
  } catch (error) {
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
      error: "Une erreur est survenue lors de la modification de l'événement",
      details: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}
