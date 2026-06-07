import { apiClient } from "./client";
import type { CharacterId } from "@/constants/characters";
import type { CharacterInfo, CompatibilityData } from "@/types/api";

/**
 * 특정 캐릭터의 정보를 가져옵니다.
 */
export async function fetchCharacterInfo(characterId: CharacterId): Promise<CharacterInfo> {
  return apiClient.get<CharacterInfo>(`/characters/${characterId}`);
}

/**
 * 사용자 정보와 캐릭터의 사주 궁합 결과를 가져오거나 생성합니다.
 */
export async function fetchCompatibility(userId: string): Promise<CompatibilityData> {
  const data = await apiClient.post<any>("/api/character", { userId });

  // 백엔드 응답 형식을 CompatibilityData 형식으로 변환
  return {
    characterId: data.characterId as CharacterId,
    totalScore: data.overallScore,
    scores: [
      { label: "총 궁합점수", score: data.overallScore, description: "" },
      { label: "사주 궁합", score: data.badgeScores.sajuCompatibility, description: "" },
      { label: "연애 스타일", score: data.badgeScores.datingStyle, description: "" },
      { label: "취향 및 성격", score: data.badgeScores.preferencePersonality, description: "" },
    ],
    details: [
      { title: "운명적 인연 및 종합 합치도", body: data.sections.destiny },
      { title: "성격 및 소통 시너지", body: data.sections.personality },
      { title: "사주 오행 및 에너지 보완", body: data.sections.elemental },
      { title: "연애 스타일 및 데이트 궁합", body: data.sections.dating },
      { title: "관계 성장 및 특별 버프", body: data.sections.growth },
    ],
  };
}
