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
 * object-fit: cover 방식으로 이미지를 캔버스 슬롯에 그립니다.
 * 원본 비율을 유지한 채 슬롯을 꽉 채우고, 넘치는 부분은 중앙 기준으로 잘라냅니다.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number, dy: number, dw: number, dh: number
): void {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const slotAspect = dw / dh;
  let sx: number, sy: number, sw: number, sh: number;

  if (imgAspect > slotAspect) {
    // 이미지가 슬롯보다 가로로 넓음 → 세로 꽉 채우고 좌우 크롭
    sh = img.naturalHeight;
    sw = sh * slotAspect;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    // 이미지가 슬롯보다 세로로 길음 → 가로 꽉 채우고 상하 크롭
    sw = img.naturalWidth;
    sh = sw / slotAspect;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * 4장의 사진을 하나의 네컷 이미지로 합성합니다.
 */
export async function createFourCutComposite(photos: string[], frameColor: string, logoSrc: string): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  const stripWidth = 1000;
  const photoW = 880;
  const photoH = 620;
  const marginX = (stripWidth - photoW) / 2;
  const startY = 80;
  const gapY = 40;

  // UI의 bottomWhiteBox 비율 적용: UI에서 131.561px / 사진너비 269.998px ≈ 0.487
  const bottomBoxH = Math.round(photoW * (131.561 / 269.998));
  const bottomBoxGap = 60;
  const stripHeight = startY + 4 * (photoH + gapY) - gapY + bottomBoxGap + bottomBoxH + bottomBoxGap;

  canvas.width = stripWidth;
  canvas.height = stripHeight;

  // 1. 배경색(프레임 색상) 채우기
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, stripWidth, stripHeight);

  // 2. 사진 4장 그리기 (비율 유지 cover 방식)
  for (let i = 0; i < 4; i++) {
    if (!photos[i]) continue;
    const img = new Image();
    img.src = photos[i];
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const y = startY + i * (photoH + gapY);
    drawImageCover(ctx, img, marginX, y, photoW, photoH);
  }

  // 3. 하단 로고 박스 (UI의 bottomWhiteBox와 동일하게 프레임 색상 배경)
  const logoBoxY = startY + 4 * photoH + 3 * gapY + bottomBoxGap;
  ctx.fillStyle = frameColor;
  ctx.fillRect(marginX, logoBoxY, photoW, bottomBoxH);

  // 4. 로고 이미지 그리기 (UI: 212×53px in 270px wide box → 비율 유지 스케일)
  const logoImg = new Image();
  logoImg.src = logoSrc;
  await new Promise((resolve, reject) => {
    logoImg.onload = resolve;
    logoImg.onerror = reject;
  });
  const logoW = Math.round(photoW * (212 / 269.998));
  const logoH = Math.round(logoW * (53 / 212));
  const logoX = marginX + (photoW - logoW) / 2;
  const logoY = logoBoxY + (bottomBoxH - logoH) / 2;
  ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

  // PNG 대신 JPEG 사용 및 품질 조절 (0.8) 로 용량 대폭 절감
  return canvas.toDataURL("image/jpeg", 0.8);
}
