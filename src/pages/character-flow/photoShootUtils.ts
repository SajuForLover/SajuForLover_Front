import { type CharacterId, CHARACTERS } from "@/constants/characters";

export const PHOTO_COUNT = 4;
export const PHOTO_BOOTH_WIDTH = 728;
export const PHOTO_BOOTH_HEIGHT = 510.152;
export const PHOTO_FRAME_LEFT = 350;
export const PHOTO_FRAME_TOP = 30.33;
export const PHOTO_FRAME_WIDTH = 377.788;
export const PHOTO_FRAME_HEIGHT = 504.636;
export const RESULT_PHOTO_WIDTH = 269.998;
export const RESULT_PHOTO_HEIGHT = 189.203;

export function loadPhotos(characterId: CharacterId): (string | null)[] {
  const config = CHARACTERS[characterId];
  if (!config) return Array.from({ length: PHOTO_COUNT }, () => null);

  try {
    const raw = sessionStorage.getItem(config.storageKey);
    if (!raw) return Array.from({ length: PHOTO_COUNT }, () => null);

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return Array.from({ length: PHOTO_COUNT }, () => null);

    const arr = parsed.map((item) => (typeof item === "string" ? item : null));
    while (arr.length < PHOTO_COUNT) arr.push(null);
    return arr.slice(0, PHOTO_COUNT) as (string | null)[];
  } catch {
    return Array.from({ length: PHOTO_COUNT }, () => null);
  }
}

export function savePhotos(characterId: CharacterId, photos: (string | null)[]) {
  const config = CHARACTERS[characterId];
  if (!config) return;
  sessionStorage.setItem(config.storageKey, JSON.stringify(photos));
}

export function nextEmptySlot(photos: (string | null)[]) {
  const index = photos.findIndex((photo) => !photo);
  return index === -1 ? PHOTO_COUNT : index;
}

/**
 * 4장의 사진을 하나의 네컷 이미지로 합성합니다.
 */
export async function createFourCutComposite(photos: string[], frameColor: string): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  const stripWidth = 1000;
  const stripHeight = 3200; // 4장 + 여백
  const photoW = 880;
  const photoH = 620;
  const marginX = (stripWidth - photoW) / 2;
  const startY = 80;
  const gapY = 40;

  canvas.width = stripWidth;
  canvas.height = stripHeight;

  // 1. 배경색(프레임 색상) 채우기
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, stripWidth, stripHeight);

  // 2. 사진 4장 그리기
  for (let i = 0; i < 4; i++) {
    if (!photos[i]) continue;
    const img = new Image();
    img.src = photos[i];
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const y = startY + i * (photoH + gapY);
    ctx.drawImage(img, marginX, y, photoW, photoH);
  }

  // 3. 하단 여백 및 브랜드 텍스트
  ctx.fillStyle = frameColor === "#000" || frameColor === "#5e3535" ? "#fff" : "#5e3535";
  ctx.font = "bold 40px Paperlogy";
  ctx.textAlign = "center";
  ctx.fillText("애인 사주오!", stripWidth / 2, stripHeight - 10);
  
  // PNG 대신 JPEG 사용 및 품질 조절 (0.8) 로 용량 대폭 절감
  return canvas.toDataURL("image/jpeg", 0.8);
}
