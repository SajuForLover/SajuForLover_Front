import type { CharacterId } from "@/constants/characters";

/**
 * 사주 속성 (능력치)
 */
export interface SajuAttribute {
  type: string;
  score: number;
  status: string;
  name_ko: string;
  status_description: string;
}

/**
 * 오행 요소
 */
export interface FiveElement {
  type: "Wood" | "Fire" | "Earth" | "Metal" | "Water";
  name_ko: string;
  ratio_percent: number;
  characteristics: string;
}

/**
 * 사용자의 사주 분석 데이터 (API 응답 기반)
 */
export interface UserSajuData {
  stats: SajuAttribute[];
  career: {
    work_style: string;
    warning_note: string;
    recommended_jobs: string[];
  };
  fortune: {
    lucky_food: string;
    best_partner: string;
    lucky_colors: string[];
    lucky_numbers: number[];
    worst_partner: string;
  };
  profile: {
    name: string;
    soul_color: string;
    hash_tags: string[];
    nickname: string;
    soul_title: string;
    description: string;
    matching_mbti: string[];
    core_description: string;
  };
  five_elements: FiveElement[];
}

/**
 * 관상 분석 데이터
 */
export interface CoronalData {
  overall_analysis: {
    impression: string;
    five_elements: string;
    element_description: string;
  };
  facial_features: {
    forehead: { shape: string; meaning: string };
    eyes: { shape: string; meaning: string };
    nose: { shape: string; meaning: string };
    mouth: { shape: string; meaning: string };
  };
  fortune_prediction: {
    wealth: { score: number; description: string };
    romance: { score: number; description: string };
    career: { score: number; description: string };
    academic: { score: number; description: string };
    health: { score: number; description: string };
  };
  summary_advice: string;
  image_url?: string;
}

/**
 * 캐릭터와의 사주 궁합 데이터
 */
export interface CompatibilityData {
  characterId: CharacterId;
  totalScore: number;
  scores: {
    label: string;
    score: number;
    description: string;
  }[];
  details: {
    title: string;
    body: string;
  }[];
}

/**
 * 캐릭터 정보 (API 응답용)
 */
export interface CharacterInfo {
  id: CharacterId;
  name: string;
  age: string;
  birth: string;
  tags: string[];
  description: string;
  imageUrl: string;
}
