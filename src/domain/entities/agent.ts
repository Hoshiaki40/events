export interface AgentSkill {
  id: string;
  userId: string;
  domain: string;
  levelSkill: number;
  performanceHistory: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentQLearningState {
  id: string;
  userId: string;
  domain: string;
  qTable: number[][];
  cumulativeRewards: number[];
  nAttempts: number[];
  epsilon: number;
  createdAt: Date;
  updatedAt: Date;
}
