import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDisableIdleTimeout } from "@/context/IdleTimeoutContext";
import countNum1 from "@/assets/images/count_1.png";
import countNum2 from "@/assets/images/count_2.png";
import countNum3 from "@/assets/images/count_3.png";
import countNum4 from "@/assets/images/count_4.png";
import countNum5 from "@/assets/images/count_5.png";
import { type CharacterId, CHARACTERS } from "@/constants/characters";
import {
  drawImageCover,
  loadPhotos,
  nextEmptySlot,
  PHOTO_BOOTH_HEIGHT,
  PHOTO_BOOTH_WIDTH,
  PHOTO_FRAME_HEIGHT,
  PHOTO_FRAME_LEFT,
  PHOTO_FRAME_TOP,
  PHOTO_FRAME_WIDTH,
  RESULT_PHOTO_HEIGHT,
  RESULT_PHOTO_WIDTH,
  savePhotos,
} from "./photoShootUtils";
import styles from "@/styles/GenericPhotoShootPage.module.css";

const COUNT_NUM_SRC: Record<5 | 4 | 3 | 2 | 1, string> = {
  5: countNum5,
  4: countNum4,
  3: countNum3,
  2: countNum2,
  1: countNum1,
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

export function GenericPhotoShootPage() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const charId = characterId as CharacterId;
  const config = CHARACTERS[charId];

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null); // 컴포넌트 스코프로 이동
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [streamReady, setStreamReady] = useState(false);
  const [photos, setPhotos] = useState<(string | null)[]>(() =>
    loadPhotos(charId)
  );
  const [phase, setPhase] = useState<5 | 4 | 3 | 2 | 1 | null>(null);
  useDisableIdleTimeout(phase !== null);
  const pendingRef = useRef<number | null>(null);
  const countingRef = useRef(false);
  const photosRef = useRef(photos);
  const phaseRef = useRef(phase);
  photosRef.current = photos;
  phaseRef.current = phase;

  const nextSlot = nextEmptySlot(photos);
  const currentFrameSrc = config?.frames[Math.min(nextSlot, 3)];
  const statusLabel =
    nextSlot >= 4 ? "촬영 완료 (4/4)" : `촬영 중이예요 ${nextSlot + 1}/4`;

  const captureFrame = useCallback(
    async (slotIndex: number) => {
      const video = videoRef.current;
      if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

      const outputScale = 2;
      const boothWidth = Math.round(PHOTO_BOOTH_WIDTH * outputScale);
      const boothHeight = Math.round(PHOTO_BOOTH_HEIGHT * outputScale);
      const frameLeft = Math.round(PHOTO_FRAME_LEFT * outputScale);
      const frameTop = Math.round(PHOTO_FRAME_TOP * outputScale);
      const frameWidth = Math.round(PHOTO_FRAME_WIDTH * outputScale);
      const frameHeight = Math.round(PHOTO_FRAME_HEIGHT * outputScale);
      const resultWidth = Math.round(RESULT_PHOTO_WIDTH * outputScale);
      const resultHeight = Math.round(RESULT_PHOTO_HEIGHT * outputScale);

      const boothCanvas = document.createElement("canvas");
      boothCanvas.width = boothWidth;
      boothCanvas.height = boothHeight;
      const boothCtx = boothCanvas.getContext("2d");
      if (!boothCtx) return;

      const scale = Math.max(
        boothWidth / video.videoWidth,
        boothHeight / video.videoHeight
      );
      const drawWidth = video.videoWidth * scale;
      const drawHeight = video.videoHeight * scale;
      const offsetX = (boothWidth - drawWidth) / 2;
      const offsetY = (boothHeight - drawHeight) / 2;

      boothCtx.save();
      boothCtx.translate(boothWidth, 0);
      boothCtx.scale(-1, 1);
      boothCtx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
      boothCtx.restore();

      try {
        const frameImage = await loadImage(
          config.frames[Math.min(slotIndex, config.frames.length - 1)]
        );
        // CSS의 object-fit: cover와 동일하게 비율 유지하며 그리기
        drawImageCover(boothCtx, frameImage, frameLeft, frameTop, frameWidth, frameHeight);
      } catch {
        // Keep the camera capture even if the frame asset fails to load.
      }

      const photoCanvas = document.createElement("canvas");
      photoCanvas.width = resultWidth;
      photoCanvas.height = resultHeight;
      const photoCtx = photoCanvas.getContext("2d");
      if (!photoCtx) return;

      // 비율 유지 cover: boothCanvas 비율과 resultPhoto 비율이 미세하게 달라도 찌그러지지 않도록 처리
      const boothAspect = boothCanvas.width / boothCanvas.height;
      const photoAspect = resultWidth / resultHeight;
      let bsx: number, bsy: number, bsw: number, bsh: number;
      if (boothAspect > photoAspect) {
        bsh = boothCanvas.height;
        bsw = bsh * photoAspect;
        bsx = (boothCanvas.width - bsw) / 2;
        bsy = 0;
      } else {
        bsw = boothCanvas.width;
        bsh = bsw / photoAspect;
        bsx = 0;
        bsy = (boothCanvas.height - bsh) / 2;
      }
      photoCtx.drawImage(boothCanvas, bsx, bsy, bsw, bsh, 0, 0, resultWidth, resultHeight);

      const dataUrl = photoCanvas.toDataURL("image/jpeg", 0.8);
      setPhotos((prev) => {
        const next = [...prev];
        next[slotIndex] = dataUrl;
        savePhotos(charId, next);
        return next;
      });
    },
    [charId, config]
  );

  const finishCountdown = useCallback(() => {
    const slot = pendingRef.current;
    pendingRef.current = null;
    countingRef.current = false;
    if (slot === null) return;
    captureFrame(slot);
  }, [captureFrame]);

  useEffect(() => {
    if (phase === null) return;

    const timer = window.setTimeout(() => {
      if (phase === 1) {
        finishCountdown();
        setPhase(null);
      } else {
        setPhase((p) => {
          if (p === 5) return 4;
          if (p === 4) return 3;
          if (p === 3) return 2;
          return 1;
        });
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase, finishCountdown]);

  useEffect(() => {
    if (phase !== null || nextSlot < 4) return;
    navigate(`/photo-shoot/${charId}/result`, { replace: true });
  }, [navigate, nextSlot, phase, charId]);

  /** 카메라 준비 후 각 컷이 짧은 간격으로 자동 카운트다운됩니다. */
  useEffect(() => {
    if (cameraError || !streamReady) return;
    if (phase !== null) return;
    const slot = nextEmptySlot(photos);
    if (slot >= 4) return;
    const delayMs = 600;

    const id = window.setTimeout(() => {
      if (phaseRef.current !== null) return;
      const s = nextEmptySlot(photosRef.current);
      if (s >= 4) return;
      if (countingRef.current) return;
      pendingRef.current = s;
      countingRef.current = true;
      setPhase(5);
    }, delayMs);

    return () => window.clearTimeout(id);
  }, [cameraError, streamReady, phase, photos]);

  useEffect(() => {
    let cancelled = false;
    let videoEl: HTMLVideoElement | null = null;
    let onMeta: (() => void) | undefined;

    function markReady(el: HTMLVideoElement) {
      if (el.videoWidth > 0) setStreamReady(true);
    }

    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        const el = videoRef.current;
        if (el) {
          videoEl = el;
          el.srcObject = s;
          onMeta = () => {
            if (!cancelled) markReady(el);
          };
          el.addEventListener("loadedmetadata", onMeta);
          await el.play().catch(() => {});
          markReady(el);
          setCameraError(null);
        } else {
          s.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      } catch {
        if (!cancelled) {
          setCameraError("카메라를 사용할 수 없어요. 권한을 허용해 주세요.");
        }
      }
    }

    void startCamera();

    return () => {
      cancelled = true;
      setStreamReady(false);
      if (videoEl && onMeta)
        videoEl.removeEventListener("loadedmetadata", onMeta);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (videoEl) videoEl.srcObject = null;
    };
  }, []);

  if (!config) {
    return null; // Or some error state
  }

  return (
    <main className={styles.root}>
      <p className={styles.shootingStatus}>{statusLabel}</p>

      {phase !== null ? (
        <div className={styles.countdownCluster} aria-live="polite">
          <div className={styles.countdownPng} aria-hidden />
          <img
            src={COUNT_NUM_SRC[phase]}
            alt=""
            className={styles.countdownNumImg}
            draggable={false}
          />
        </div>
      ) : null}

      <div className={styles.photoBooth} aria-label="포토부스 미리보기">
        <video
          ref={videoRef}
          className={styles.photoBoothVideo}
          playsInline
          muted
          autoPlay
        />
        <img
          src={currentFrameSrc}
          alt=""
          className={styles.photoFrame}
          draggable={false}
        />
        {cameraError ? (
          <p className={styles.cameraErrorOverlay} role="status">
            {cameraError}
          </p>
        ) : null}
      </div>
    </main>
  );
}
