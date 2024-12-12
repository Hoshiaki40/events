"use client";

import React, { useEffect, useState } from "react";
import { evaluateExercise } from "@/src/server-actions/exercise/evaluate.action";
import { useQuery } from "@tanstack/react-query";
import { BlockMath, InlineMath } from "react-katex";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/presentation/components/ui/accordion";
import { Button } from "@/src/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/presentation/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/presentation/components/ui/tabs";
import { Textarea } from "@/src/presentation/components/ui/textarea";

import "katex/dist/katex.min.css";

import { selectExercise } from "@/src/server-actions/exercise/select-exercice.action";
import { cn } from "@/src/utils";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { AppError } from "@/src/utils/errors";

import { useCurrentSession } from "../../hooks/use-current-session";
import { useServerAction } from "../../hooks/use-server-action";
import { useExercise } from "../../hooks/useExercise";

interface Question {
  id: string;
  statement: string;
  method: string | null;
  response: string | null;
  explication: string | null;
  exerciseId: string;
  createdAt: Date | string; // Accepter les deux formats
  updatedAt: Date | string; // Accepter les deux formats
}

interface Exercise {
  id: string;
  statement: string;
  domain: string;
  levelId: number;
  difficultyLevel: number;
  serie: string;
  createdAt: string;
  updatedAt: string;
  subjectTitleId: string;
  questions: Question[];
}

const exerciseData: Exercise = {
  id: "cm2np4eh700fphr3w9z60s4mx",
  statement:
    "On considère les fonctions numériques $f$ et $h$ de la variable réelle $x$ définies sur $D = ]1; +\\infty[$ par :\n" +
    "\n" +
    "$f(x) = x - 2 + \\ln(\\sqrt{x} - 1)$ et $h(x) = \\frac{2x - 2 + \\ln(x - 1)}{\\sqrt{x} - 1}$\n" +
    "\n" +
    "Le plan est rapporté à un repère orthonormé $(O; \\vec{i}, \\vec{j})$.",
  domain: "analyse",
  difficultyLevel: 3,
  serie: "C",
  subjectTitleId: "cm2np4ef60003hr3w7ylxpc3p",
  levelId: 1,
  createdAt: "2024-10-24T19:28:12.587Z",
  updatedAt: "2024-10-24T19:28:12.587Z",
  questions: [
    {
      id: "cm2np4eh800fuhr3ws0r3ayi2",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On étudie le signe de f'(x) = 1 - 1/(2(x-1)) qui est toujours positif sur D. Donc f est strictement croissante. On calcule les limites aux bornes pour compléter le tableau.",
      method:
        "Pour dresser le tableau de variations :\n" +
        "1) Étudier le signe de f'(x)\n" +
        "2) En déduire les variations de f\n" +
        "3) Calculer les limites aux bornes\n" +
        "4) Compléter le tableau",
      response:
        "Tableau de variations de $f$ sur $D$ :\n" +
        "\n" +
        "$$\\begin{array}{|c|ccc|}\n" +
        "\\hline\n" +
        "x & 1 & & +\\infty \\\\\n" +
        "\\hline\n" +
        "f'(x) & + & + & + \\\\\n" +
        "\\hline\n" +
        "f(x) & -\\infty & \\nearrow & +\\infty \\\\\n" +
        "\\hline\n" +
        "\\end{array}$$",
      explication:
        "On étudie le signe de f'(x) = 1 - 1/(2(x-1)) qui est toujours positif sur D. Donc f est strictement croissante. On calcule les limites aux bornes pour compléter le tableau.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800fyhr3wree3bxsu",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On utilise les propriétés de continuité, croissance stricte et bijectivité de f pour montrer que 2 est l'unique solution.",
      method:
        "Pour montrer l'unicité de la solution :\n" +
        "1) Montrer que f est continue et strictement croissante\n" +
        "2) Calculer f(2) et vérifier que c'est 0\n" +
        "3) Utiliser la bijectivité de f",
      response:
        "Le réel 2 est l'unique solution de f(x) = 0 car :\n" +
        "- f est continue et strictement croissante sur ]1; +∞[\n" +
        "- f(2) = 2 - 2 + ln(√2 - 1) = ln1 = 0\n" +
        "- f réalise une bijection de ]1; +∞[ sur R",
      explication:
        "On utilise les propriétés de continuité, croissance stricte et bijectivité de f pour montrer que 2 est l'unique solution.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800fzhr3w67vy88rq",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "Le signe de f(x) se déduit directement du tableau de variations, avec 2 comme point d'annulation.",
      method:
        "Pour étudier le signe de f(x) :\n" +
        "1) Utiliser le tableau de variations\n" +
        "2) Repérer le point d'annulation\n" +
        "3) En déduire le signe avant et après ce point",
      response:
        "Signe de f(x) :\n" +
        "- Si x ∈ ]1; 2[, alors f(x) < 0\n" +
        "- Si x ∈ ]2; +∞[, alors f(x) > 0",
      explication:
        "Le signe de f(x) se déduit directement du tableau de variations, avec 2 comme point d'annulation.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800g0hr3wo605itz4",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On dérive h(x) en utilisant les règles de dérivation (quotient, composée) et on simplifie pour obtenir f(x)/(2(x-1)/(√x-1)).",
      method:
        "Pour démontrer l'égalité h'(x) = f(x)/(2(x-1)/(√x-1)) :\n" +
        "1) Dériver h(x) en utilisant les règles de dérivation\n" +
        "2) Simplifier l'expression obtenue\n" +
        "3) Identifier f(x) dans le résultat",
      response:
        "h'(x) = f(x)/(2(x-1)/(√x-1)) pour tout x ∈ ]1; +∞[\n" +
        "\n" +
        "Démonstration : [calculs détaillés]",
      explication:
        "On dérive h(x) en utilisant les règles de dérivation (quotient, composée) et on simplifie pour obtenir f(x)/(2(x-1)/(√x-1)).",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800g2hr3w0owvurwx",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On effectue une intégration par parties pour calculer l'intégrale demandée, puis on en déduit la valeur de I par calcul direct.",
      method:
        "Pour calculer l'intégrale :\n" +
        "1) Poser u(x) = ln(x-1) et v'(x) = 1/(√x-1)\n" +
        "2) Appliquer la formule d'intégration par parties\n" +
        "3) Calculer les primitives et évaluer aux bornes",
      response:
        "a) ∫(3/2)ln(x-1)dx/(√x-1) = [(ln2 - 2)/√2] + 2\n" +
        "\n" +
        "I = 10/√2 + 8/3 + √2ln2",
      explication:
        "On effectue une intégration par parties pour calculer l'intégrale demandée, puis on en déduit la valeur de I par calcul direct.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800g3hr3wz787rvvc",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On utilise la croissance de h sur ]2; +∞[ pour encadrer l'intégrale sur chaque petit intervalle [2+j/n; 2+(j+1)/n].",
      method:
        "Pour démontrer l'encadrement :\n" +
        "1) Utiliser la croissance de h sur ]2; +∞[\n" +
        "2) Appliquer l'inégalité à l'intégrale sur [2+j/n; 2+(j+1)/n]\n" +
        "3) Simplifier en utilisant la définition de l'intégrale",
      response: "b) Démonstration par encadrement de l'intégrale",
      explication:
        "On utilise la croissance de h sur ]2; +∞[ pour encadrer l'intégrale sur chaque petit intervalle [2+j/n; 2+(j+1)/n].",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800g5hr3wmkj45jlo",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On somme les inégalités obtenues en b) pour tous les j de 0 à n-1 pour obtenir l'encadrement de I par un.",
      method:
        "Pour établir l'encadrement de I :\n" +
        "1) Sommer les inégalités obtenues pour tous les j\n" +
        "2) Identifier la somme de Riemann correspondant à un\n" +
        "3) Simplifier pour obtenir l'encadrement final",
      response:
        "c) un + h(3)/n ≤ I ≤ un + h(2)/n\n" +
        "\n" +
        "Démonstration en utilisant le résultat de b)",
      explication:
        "On somme les inégalités obtenues en b) pour tous les j de 0 à n-1 pour obtenir l'encadrement de I par un.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
    {
      id: "cm2np4eh800g6hr3wive4fy82",
      exerciseId: "cm2np4eh700fphr3w9z60s4mx",
      statement:
        "On utilise le théorème d'encadrement (ou théorème des gendarmes) avec le résultat de c) pour conclure que la limite de un est I.",
      method:
        "Pour calculer la limite :\n" +
        "1) Utiliser l'encadrement un + h(3)/n ≤ I ≤ un + h(2)/n\n" +
        "2) Appliquer le théorème d'encadrement\n" +
        "3) Conclure que la limite de un est I",
      response: "lim(n→+∞) un = I = 10/√2 + 8/3 + √2ln2",
      explication:
        "On utilise le théorème d'encadrement (ou théorème des gendarmes) avec le résultat de c) pour conclure que la limite de un est I.",
      createdAt: "2024-10-24T19:28:12.587Z",
      updatedAt: "2024-10-24T19:28:12.587Z",
    },
  ],
};

function LatexRenderer({ content }: { content: string }) {
  const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </>
  );
}

export function ExerciseComponent() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showCorrections, setShowCorrections] = useState(false);
  const user = useCurrentSession();
  // Ajoutez ces états
  const [submissionResult, setSubmissionResult] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    newSkill: number;
    details: { [key: string]: boolean };
  } | null>(null);
  const domain = "analyse";

  const {
    data: exerciseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercise", user?.id ?? "", "analyse"],
    queryFn: async () => {
      const result = await selectExercise({
        userId: user?.id ?? "",
        domain: "analyse",
      });
      return result;
    },
    enabled: !!user?.id && !!domain,
  });
  // useExercise({
  //   userId: user?.id ?? "",
  //   domain: "analyse", // ou la valeur appropriée
  // });

  useEffect(() => {
    if (exerciseData?.predictedLevel) {
      toast(
        `Exercice de niveau ${exerciseData.predictedLevel.toFixed(2)} sélectionné`
      );
    }
  }, [exerciseData?.predictedLevel]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const {
    executeAsync: executeEvaluation,
    isPending,
    result,
    execute,
    hasSucceeded,
  } = useAction(evaluateExercise);

  const calculateScore = (
    answers: { [key: string]: string },
    questions: Question[]
  ): number => {
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        // Comparaison simple avec la réponse correcte
        const isCorrect =
          answer.trim().toLowerCase() ===
          question.response?.trim().toLowerCase();
        totalScore += isCorrect ? 1 : 0;
        answeredQuestions++;
      }
    });

    return answeredQuestions > 0 ? (totalScore / answeredQuestions) * 5 : 0;
  };

  const handleSubmit = async () => {
    try {
      const details: { [key: string]: boolean } = {};
      let correctAnswers = 0;

      exerciseData?.exercise?.questions
        .slice(0, 5)
        .forEach((question, index) => {
          const hasAnswer = !!answers[question.id]?.trim();
          const isCorrect = hasAnswer && index < 3;
          details[question.id] = isCorrect;
          if (isCorrect) correctAnswers++;
        });

      const totalQuestions = 5;
      const score = (correctAnswers / totalQuestions) * 5;
      const oldSkill = 0.5;
      const newSkill = Math.min(1, oldSkill + (score / 5) * 0.1);

      setSubmissionResult({
        score,
        correctAnswers,
        totalQuestions,
        details,
        newSkill,
      });
      setShowCorrections(true);
      toast(
        <div className="flex flex-col gap-1">
          <p>Exercice soumis avec succès</p>
          <p>Score: {score.toFixed(2)}/5</p>
          <p>Niveau de compétence: {(newSkill * 100).toFixed(1)}%</p>
        </div>
      );
    } catch (error) {
      toast("Une erreur est survenue lors de la soumission");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-destructive">
          {error instanceof AppError
            ? error.message
            : "Une erreur est survenue"}
        </p>
      </div>
    );
  }

  if (!exerciseData?.exercise) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Aucun exercice disponible</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            Exercice {exerciseData.exercise.id}{" "}
            {exerciseData.exercise.difficultyLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="statement">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="statement">Énoncé</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="corrections">Corrections</TabsTrigger>
            </TabsList>
            <TabsContent value="statement">
              <div className="whitespace-pre-wrap">
                <LatexRenderer content={exerciseData.exercise.statement} />
              </div>
            </TabsContent>
            <TabsContent value="questions">
              <Accordion type="single" collapsible className="w-full">
                {exerciseData.exercise.questions.map((question, index) => (
                  <AccordionItem key={question.id} value={`item-${index}`}>
                    <AccordionTrigger>Question {index + 1}</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        <LatexRenderer content={question.statement} />
                      </p>
                      <Textarea
                        placeholder="Entrez votre réponse ici"
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="mt-2"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button onClick={handleSubmit} className="mt-4">
                Soumettre les réponses
              </Button>
            </TabsContent>
            <TabsContent value="corrections">
              {showCorrections && submissionResult ? (
                <>
                  <div className="mb-6 rounded-lg bg-secondary p-4">
                    <h3 className="mb-4 text-lg font-bold">Résultats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Score total:</span>
                        <span className="font-bold">
                          {submissionResult.score.toFixed(2)}/5
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Questions correctes:</span>
                        <span className="font-bold">
                          {submissionResult.correctAnswers}/
                          {submissionResult.totalQuestions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Niveau de compétence:</span>
                        <span className="font-bold">
                          {(submissionResult.newSkill * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Progression du niveau
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-muted">
                          <div
                            className="h-2.5 rounded-full bg-primary transition-all duration-500"
                            style={{
                              width: `${submissionResult.newSkill * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {exerciseData.exercise?.questions.map((question, index) => (
                      <AccordionItem
                        key={question.id}
                        value={`item-${index}`}
                        className={cn(
                          "mb-2 rounded-lg border",
                          submissionResult.details[question.id]
                            ? "border-l-4 border-l-green-500"
                            : "border-l-4 border-l-red-500"
                        )}
                      >
                        <AccordionTrigger className="px-4">
                          <div className="flex items-center gap-2">
                            <span>Question {index + 1}</span>
                            {submissionResult.details[question.id] ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          {answers[question.id] && (
                            <div className="mb-4 rounded-lg bg-muted p-3">
                              <h4 className="mb-2 text-sm font-bold text-muted-foreground">
                                Votre réponse :
                              </h4>
                              <p className="whitespace-pre-wrap">
                                <LatexRenderer content={answers[question.id]} />
                              </p>
                            </div>
                          )}
                          <div className="space-y-4">
                            <div>
                              <h4 className="mb-2 font-bold">Méthode :</h4>
                              <p className="whitespace-pre-wrap">
                                <LatexRenderer
                                  content={question.method ?? ""}
                                />
                              </p>
                            </div>
                            <div>
                              <h4 className="mb-2 font-bold">
                                Réponse correcte :
                              </h4>
                              <p className="whitespace-pre-wrap">
                                <LatexRenderer
                                  content={question.response ?? ""}
                                />
                              </p>
                            </div>
                            <div>
                              <h4 className="mb-2 font-bold">Explication :</h4>
                              <p className="whitespace-pre-wrap">
                                <LatexRenderer
                                  content={question.explication ?? ""}
                                />
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-muted-foreground">
                    Soumettez vos réponses pour voir les corrections.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
