import { apiClient } from "./client";
import type { UserSajuData, CoronalData } from "@/types/api";

/**
 * 사용자의 사주 분석 결과를 가져옵니다.
 */
export async function fetchSajuAnalysis(userId: string): Promise<{ saju: UserSajuData, isDone: boolean }> {
  const response = await apiClient.get<{ data: { saju: UserSajuData, isDone: boolean } }>(`/api/saju/${userId}`);
  return response.data;
}

/**
 * 사용자의 관상 분석 결과를 가져옵니다.
 */
export async function fetchCoronalAnalysis(userId: string): Promise<CoronalData> {
  const response = await apiClient.get<{ data: CoronalData, isDone: boolean }>(`/api/physiognomy/${userId}`);
  return response.data;
}

/**
 * 관상 분석을 요청합니다 (최초 생성 시)
 */
export async function analyzePhysiognomy(userId: string, image: Blob): Promise<{ data: { userId: string } }> {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("image", image);
  return apiClient.post<{ data: { userId: string } }>("/api/physiognomy/", formData);
}

/**
 * 사주 분석을 요청합니다 (최초 생성 시)
 */
export async function analyzeSaju(userData: any): Promise<{ data: { user_id: string } }> {
  return apiClient.post<{ data: { user_id: string } }>("/api/saju/", userData);
}
