"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getSubjects } from "@/src/server-actions/subject/get-subject.action";
import { motion } from "framer-motion";

import {
  Avatar,
  AvatarFallback,
} from "@/src/presentation/components/ui/avatar";
import { Card, CardContent } from "@/src/presentation/components/ui/card";
import { Subject } from "@/src/domain/entities/subject";
import { AppError } from "@/src/utils/errors";

import { useServerAction } from "../../hooks/use-server-action";
import { SubjectFilter } from "../../schemas/subject.schema";

const MotionCard = motion(Card);
// Fonction pour associer des icônes aux matières
const getSubjectIcon = (code: string): { icon: string; domains: string[] } => {
  const subjects: { [key: string]: { icon: string; domains: string[] } } = {
    FRS: {
      icon: "📚",
      domains: [
        "Grammaire",
        "Littérature",
        "Expression écrite",
        "Compréhension",
      ],
    },
    ANG: {
      icon: "🇬🇧",
      domains: ["Grammar", "Vocabulary", "Reading", "Listening"],
    },

    PHY: {
      icon: "🤔",
      domains: ["Éthique", "Métaphysique", "Épistémologie", "Logique"],
    },

    HG: {
      icon: "🌍",
      domains: [
        "Histoire ancienne",
        "Histoire moderne",
        "Géographie physique",
        "Géographie humaine",
      ],
    },

    MGA: {
      icon: "🇲🇬",
      domains: ["Grammaire", "Littérature", "Culture", "Oral"],
    },

    SVT: {
      icon: "🌱",
      domains: ["Biologie", "Géologie", "Écologie", "Évolution"],
    },

    PC: {
      icon: "⚗️",
      domains: [
        "Mécanique",
        "Électricité",
        "Chimie organique",
        "Chimie inorganique",
      ],
    },

    MATHS: {
      icon: "📐",
      domains: ["Algèbre", "Géométrie", "Analyse", "Probabilités"],
    },
  };
  return subjects[code] || { icon: "📘", domains: [] }; // Icône par défaut si non trouvée
};
export function SubjectCardList() {
  const router = useRouter();
  const { data, isLoading, isFetched, error } = useServerAction<
    SubjectFilter,
    Subject[]
  >(getSubjects, {
    input: {
      levelId: 5,
      schoolYearId: 2,
      serie: "A",
    },
    queryKey: ["subjects"],
    // Désactiver le refetch automatique
    enabled: true,
  });
  const handleSubjectClick = (codification: string) => {
    router.push(`/subjects/${codification}`);
  };

  // Afficher un squelette de chargement
  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-white p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="w-full animate-pulse rounded-xl border border-gray-700 bg-gray-800/70 p-6"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 h-16 w-16 rounded-full bg-gray-700" />
                <div className="mb-3 h-6 w-32 rounded bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error instanceof AppError) {
    return <div>Error: {error.detail}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-gray-400">Aucune matière disponible</div>
      </div>
    );
  }

  const subjects = data.map((subject) => {
    const { icon, domains } = getSubjectIcon(subject.subjectTitle.codification);
    return {
      ...subject,
      icon,
      domains,
    };
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-radial-dark from-gray-950 via-gray-900 to-gray-950 p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h1 className="mb-12 text-center text-4xl font-bold text-white">
            Choisissez une matière
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject: any, index: number) => (
              <MotionCard
                key={subject.id}
                className="w-full cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800/70 backdrop-blur-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(31, 41, 55, 0.9)",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  handleSubjectClick(subject.subjectTitle.codification)
                }
              >
                <CardContent className="flex flex-col items-center p-6">
                  <motion.div
                    className="mb-6"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Avatar className="h-16 w-16 bg-primary text-3xl font-bold text-primary-foreground">
                      <AvatarFallback>{subject.icon}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <h2 className="mb-3 text-center text-2xl font-semibold text-white">
                    {subject.subjectTitle.name}
                  </h2>
                  <p className="text-center text-sm text-gray-300">
                    {subject.domains.join(", ")}
                  </p>
                </CardContent>
              </MotionCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
