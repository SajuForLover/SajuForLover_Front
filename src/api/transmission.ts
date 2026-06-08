import { apiClient } from "./client";
import { compressImage } from "../utils/imageCompressor";

/**
 * 분석 결과를 이메일로 전송합니다.
 */
export async function sendResultEmail(userId: string, email: string, photo?: string): Promise<{ success: boolean; message: string }> {
  let finalPhoto = photo;
  if (photo && photo.startsWith('data:image')) {
    finalPhoto = await compressImage(photo);
  }

  const response = await apiClient.post<{ success: boolean; message: string }>("/api/transmission", { userId, email, photo: finalPhoto });

  if (!response.success) {
    sessionStorage.clear();
  }

  return response.success ? { success: true, message: "이메일이 성공적으로 전송되었습니다." } : { success: false, message: response.message || "이메일 전송에 실패했습니다." };
}

