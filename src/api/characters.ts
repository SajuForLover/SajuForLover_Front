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
 * 사용자 정보와 캐릭터의 사주 궁합 결과를 가져옵니다.
 */
export async function fetchCompatibility(userId: string, characterId: CharacterId): Promise<CompatibilityData> {
  return apiClient.get<CompatibilityData>(`/compatibility?userId=${userId}&characterId=${characterId}`);
}
