export enum AchievementId {
  FIRST_FLIGHT = 'first_flight',
  FREQUENT_FLYER = 'frequent_flyer',
  GLOBE_TROTTER = 'globe_trotter',
  CENTURY = 'century',
  MARATHON = 'marathon',
  FIRST_CLASS = 'first_class',
}

export class Achievement {
  constructor(
    public readonly id: AchievementId,
    public readonly name: string,
    public readonly description: string,
    public readonly unlockedAt: Date | null,
  ) {}

  get isUnlocked(): boolean {
    return this.unlockedAt !== null;
  }

  unlock(): Achievement {
    return new Achievement(this.id, this.name, this.description, new Date());
  }
}

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt' | 'isUnlocked' | 'unlock'>[] = [
  { id: AchievementId.FIRST_FLIGHT,   name: 'First Flight',    description: '첫 번째 세션을 완료하세요' },
  { id: AchievementId.FREQUENT_FLYER, name: 'Frequent Flyer',  description: '10번의 세션을 완료하세요' },
  { id: AchievementId.GLOBE_TROTTER,  name: 'Globe Trotter',   description: '50번의 세션을 완료하세요' },
  { id: AchievementId.CENTURY,        name: 'Century',         description: '누적 마일 100마일을 달성하세요' },
  { id: AchievementId.MARATHON,       name: 'Marathon',        description: '120분짜리 세션을 완료하세요' },
  { id: AchievementId.FIRST_CLASS,    name: 'First Class',     description: '퍼스트 클래스로 세션을 완료하세요' },
];
