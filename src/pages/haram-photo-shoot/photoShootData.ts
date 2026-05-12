import haramFrame1 from "@/assets/images/haram_1.png";
import haramFrame2 from "@/assets/images/haram_2.png";
import haramFrame3 from "@/assets/images/haram_3.png";
import haramFrame4 from "@/assets/images/haram_4.png";

export const STORAGE_KEY = "haramPhotoShoot.photos.v1";
export const PHOTO_COUNT = 4;
export const PHOTO_BOOTH_WIDTH = 728;
export const PHOTO_BOOTH_HEIGHT = 510.152;
export const PHOTO_FRAME_LEFT = 350;
export const PHOTO_FRAME_TOP = 30.33;
export const PHOTO_FRAME_WIDTH = 377.788;
export const PHOTO_FRAME_HEIGHT = 504.636;
export const RESULT_PHOTO_WIDTH = 269.998;
export const RESULT_PHOTO_HEIGHT = 189.203;

export const HARAM_FRAME_SRC = [
  haramFrame1,
  haramFrame2,
  haramFrame3,
  haramFrame4,
] as const;

export function loadPhotos(): (string | null)[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

export function savePhotos(photos: (string | null)[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function nextEmptySlot(photos: (string | null)[]) {
  const index = photos.findIndex((photo) => !photo);
  return index === -1 ? PHOTO_COUNT : index;
}
