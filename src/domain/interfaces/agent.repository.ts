import { AgentQLearningState, AgentSkill } from "../entities/agent";

export interface IAgentRepository {
  getAgentSkills(userId: string): Promise<AgentSkill[]>;
  updateAgentSkill(skill: Partial<AgentSkill>): Promise<AgentSkill>;
  getQLearningState(
    userId: string,
    domain: string
  ): Promise<AgentQLearningState>;
  updateQLearningState(
    state: Partial<AgentQLearningState>
  ): Promise<AgentQLearningState>;
}
