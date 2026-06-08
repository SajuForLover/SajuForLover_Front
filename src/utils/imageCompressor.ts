/**
 * 클라이언트 사이드에서 이미지를 Canvas를 사용하여 JPEG로 압축합니다.
 * @param base64Str 원본 이미지 Base64 문자열
 * @param maxWidth 최대 너비 (기본값: 800)
 * @param quality 이미지 품질 (0.0 ~ 1.0, 0.8 추천)
 */
export const compressImage = (base64Str: string, maxWidth = 800, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context를 가져올 수 없습니다.'));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // JPEG 포맷 및 설정된 품질로 압축
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => reject(new Error('이미지 로드에 실패했습니다.'));
  });
};
