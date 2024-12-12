"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import db from "@/src/infrastructure/database/prisma";

export async function deleteEvent(id: string) {
  try {
    // Vérification de l'authentification
    const session = await auth();
    if (!session?.user) {
      throw new Error("Vous devez être connecté pour supprimer un événement");
    }

    // Suppression de l'événement
    await db.event.delete({
      where: {
        id,
        organizerId: session.user.id, // Sécurité : seul l'organisateur peut supprimer
      },
    });

    // Revalidation des chemins
    revalidatePath("/events");
    revalidatePath("/my-events");

    // Redirection après suppression
    redirect("/events");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de l'événement",
    };
  }
}
