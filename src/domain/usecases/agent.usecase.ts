import { IAgentRepository } from "../interfaces/agent.repository";

export class AdaptiveAgent {
  private skills: Map<string, number> = new Map();
  private performanceHistory: Map<string, number[]> = new Map();
  private readonly learningRate = 0.01;
  private readonly emaAlpha = 0.2;

  constructor(
    private userId: string,
    private repository: IAgentRepository
  ) {}

  async initialize(): Promise<void> {
    const skills = await this.repository.getAgentSkills(this.userId);
    skills.forEach((skill) => {
      this.skills.set(skill.domain, skill.levelSkill);
      this.performanceHistory.set(skill.domain, skill.performanceHistory);
    });
  }

  async updateSkill(
    domain: string,
    score: number,
    difficulty: number
  ): Promise<number> {
    const currentSkill = this.skills.get(domain) || 0.5;
    const history = this.performanceHistory.get(domain) || [];

    // Calcul du nouveau skill
    const pretest = 5 * (1 - Math.abs(currentSkill - difficulty));
    const normalizedGain = pretest < 5 ? (score - pretest) / (5 - pretest) : 0;
    const conceptualGain = (difficulty - currentSkill) * normalizedGain;
    const learningEffect = this.learningRate * conceptualGain;
    const newSkill = Math.min(
      1.0,
      Math.max(0.0, currentSkill + learningEffect)
    );

    // Mise à jour des états
    this.skills.set(domain, newSkill);
    history.push(score / 5);
    this.performanceHistory.set(domain, history);

    // Persistance
    await this.repository.updateAgentSkill({
      userId: this.userId,
      domain,
      levelSkill: newSkill,
      performanceHistory: history,
    });

    return newSkill;
  }

  predictPerformance(domain: string): number {
    const history = this.performanceHistory.get(domain) || [];
    if (history.length === 0) return 0.5;
    if (history.length === 1) return history[0];

    let ema = history[0];
    for (let i = 1; i < history.length; i++) {
      ema = this.emaAlpha * history[i] + (1 - this.emaAlpha) * ema;
    }
    return ema;
  }
}
