export type JobCategory =
  | 'vehicleSw'
  | 'autonomousAi'
  | 'electrificationHw'
  | 'qualitySafety'
  | 'serviceData';

export interface JobScores {
  vehicleSw: number; // 차량 SW 개발
  autonomousAi: number; // 자율주행/AI
  electrificationHw: number; // 배터리/전동화 HW
  qualitySafety: number; // 품질/기능안전
  serviceData: number; // 모빌리티 서비스 기획/데이터
}

export interface Character {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarBg: string;
  accentColor: string;
  initials: string;
}

export interface EventOption {
  id: string;
  label: string;
  actionText: string;
  scoreDeltas: Partial<JobScores>;
  pros: string; // 👍 장점 및 기대 효과
  cons: string; // ⚠️ 한계, 리스크 및 트레이드오프
  feedbackReaction: {
    characterId: string;
    praise: string; // 긍정적 성과 평가
    concern: string; // 현실적 우려 및 주의할 점
    comment: string; // 종합 대화
    tone: 'enthusiastic' | 'impressed' | 'thoughtful' | 'approving' | 'cautious';
  };
  highlightKeywords: string[];
}

export interface IndustryTip {
  title: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  fieldRelevance: string;
}

export interface WorkEvent {
  id: number;
  day: number;
  orderInDay: number;
  totalInDay: number;
  timeString: string;
  title: string;
  badge: string;
  characterId: string;
  situation: string;
  dialogueBefore: string;
  options: EventOption[];
  industryTip: IndustryTip;
}

export interface UserChoiceRecord {
  eventId: number;
  day: number;
  eventTitle: string;
  chosenOptionId: string;
  chosenActionText: string;
  scoreDeltas: Partial<JobScores>;
  feedbackComment: string;
  characterName: string;
  pros?: string;
  cons?: string;
  praise?: string;
  concern?: string;
}

export interface JobTrackInfo {
  id: JobCategory;
  title: string;
  shortName: string;
  archetype: string;
  tagline: string;
  color: string;
  badgeColor: string;
  iconName: string;
  description: string;
  coreCompetencies: string[];
  keyTools: string[];
  top3PreparationTips: {
    title: string;
    detail: string;
    actionItem: string;
  }[];
  dayInTheLife: string;
  futureVision: string;
}

export interface AIAnalysisReport {
  archetype: string;
  personalizedSummary: string;
  whyFit: string;
  top3PreparationTips: {
    title: string;
    detail: string;
    actionItem: string;
  }[];
  retrospectiveHighlights: {
    eventTitle: string;
    userChoiceText: string;
    evalComment: string;
    tradeOffNotice?: string;
  }[];
  encouragement: string;
}

export type GameStage =
  | 'start'
  | 'onboarding'
  | 'event'
  | 'event_feedback'
  | 'clock_out'
  | 'final_report';
