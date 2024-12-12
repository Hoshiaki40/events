"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  Avatar,
  AvatarFallback,
} from "@/src/presentation/components/ui/avatar";
import { Card, CardContent } from "@/src/presentation/components/ui/card";

const MotionCard = motion(Card);

const subjects = {
  MATHS: {
    name: "Mathématiques",
    icon: "📐",
    domains: [
      { name: "Analyse", icon: "📊" },
      { name: "Algèbre", icon: "🧮" },
      { name: "Géométrie", icon: "📐" },
      { name: "Probabilités", icon: "🎲" },
    ],
  },
  FRS: {
    name: "Français",
    icon: "📚",
    domains: [
      { name: "Grammaire", icon: "📝" },
      { name: "Littérature", icon: "📖" },
      { name: "Expression écrite", icon: "✍️" },
      { name: "Compréhension", icon: "🧠" },
    ],
  },
  ANG: {
    name: "Anglais",
    icon: "🇬🇧",
    domains: [
      { name: "Grammar", icon: "📏" },
      { name: "Vocabulary", icon: "📚" },
      { name: "Reading", icon: "👀" },
      { name: "Listening", icon: "👂" },
    ],
  },
  PHY: {
    name: "Phylosophie",
    icon: "🤔",
    domains: [
      { name: "Éthique", icon: "⚖️" },
      { name: "Métaphysique", icon: "🌌" },
      { name: "Épistémologie", icon: "🔬" },
      { name: "Logique", icon: "🧩" },
    ],
  },
  HG: {
    name: "Histo-Géo",
    icon: "🌍",
    domains: [
      { name: "Histoire ancienne", icon: "🏛️" },
      { name: "Histoire moderne", icon: "🏙️" },
      { name: "Géographie physique", icon: "🗻" },
      { name: "Géographie humaine", icon: "👥" },
    ],
  },
  MG: {
    name: "Malagasy",
    icon: "🇲🇬",
    domains: [
      { name: "Grammaire", icon: "📝" },
      { name: "Littérature", icon: "📚" },
      { name: "Culture", icon: "🎭" },
      { name: "Oral", icon: "🗣️" },
    ],
  },
  SVT: {
    name: "Science de la vie et de la terre",
    icon: "🌱",
    domains: [
      { name: "Biologie", icon: "🧬" },
      { name: "Géologie", icon: "🪨" },
      { name: "Écologie", icon: "🌿" },
      { name: "Évolution", icon: "🐒" },
    ],
  },
  PC: {
    name: "Physique-Chimie",
    icon: "⚗️",
    domains: [
      { name: "Mécanique", icon: "🔧" },
      { name: "Électricité", icon: "⚡" },
      { name: "Chimie organique", icon: "🧪" },
      { name: "Chimie inorganique", icon: "🔬" },
    ],
  },
};

interface DomainCardListProps {
  code: string;
}

export function DomainCardList({ code }: DomainCardListProps) {
  const router = useRouter();

  const subject = subjects[code as keyof typeof subjects];

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Matière non trouvée</h1>
          <p className="mt-4">La matière que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const handleDomainClick = (domain: string) => {
    router.push(`/session/${code}/${encodeURIComponent(domain)}`);
  };

  const handleSubjectClick = (codification: string) => {
    router.push(`/subjects/${codification}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Domaines de {subject.name}
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subject.domains.map((domain, index) => (
            <MotionCard
              key={domain.name}
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
              onClick={() => handleDomainClick(domain.name)}
            >
              <CardContent className="flex flex-col items-center p-6">
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="h-16 w-16 bg-primary text-3xl font-bold text-primary-foreground">
                    <AvatarFallback>{domain.icon}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <h2 className="text-center text-2xl font-semibold text-white">
                  {domain.name}
                </h2>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </div>
  );
}
