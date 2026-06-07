import { apiClient } from "./client";

/**
 * 분석 결과를 이메일로 전송합니다.
 */
export async function sendResultEmail(userId: string, email: string, photo?: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post<{ success: boolean; message: string }>("/transmission", { userId, email, photo });
}
