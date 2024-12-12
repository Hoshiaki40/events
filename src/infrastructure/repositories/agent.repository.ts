// src/infrastructure/repositories/AgentRepository.ts
import { AgentQLearningState, AgentSkill } from "@/src/domain/entities/agent";
import { IAgentRepository } from "@/src/domain/interfaces/agent.repository";
import prisma from "@/src/infrastructure/database/prisma";

export class AgentRepository implements IAgentRepository {
  getQLearningState(
    userId: string,
    domain: string
  ): Promise<AgentQLearningState> {
    throw new Error("Method not implemented.");
  }
  updateQLearningState(
    state: Partial<AgentQLearningState>
  ): Promise<AgentQLearningState> {
    throw new Error("Method not implemented.");
  }
  async getAgentSkills(userId: string): Promise<AgentSkill[]> {
    const skills = await prisma.agentSkill.findMany({
      where: { userId },
    });
    return skills.map((skill) => ({
      ...skill,
      performanceHistory: JSON.parse(skill.performanceHistory),
    }));
  }

  async updateAgentSkill(skill: Partial<AgentSkill>): Promise<AgentSkill> {
    const updatedSkill = await prisma.agentSkill.update({
      where: {
        userId_domain: {
          userId: skill.userId!,
          domain: skill.domain!,
        },
      },
      data: {
        ...skill,
        performanceHistory: JSON.stringify(skill.performanceHistory),
      },
    });
    return {
      ...updatedSkill,
      performanceHistory: JSON.parse(updatedSkill.performanceHistory),
    };
  }

  // Implémentations similaires pour QLearningState
}
