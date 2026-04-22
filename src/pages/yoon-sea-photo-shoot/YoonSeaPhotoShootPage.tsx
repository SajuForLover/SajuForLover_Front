import { useCallback, useEffect, useRef, useState } from "react";
import countNum1 from "@/assets/images/count_1.png";
import countNum2 from "@/assets/images/count_2.png";
import countNum3 from "@/assets/images/count_3.png";
import countNum4 from "@/assets/images/count_4.png";
import countNum5 from "@/assets/images/count_5.png";
import yoonSeaFrame from "@/assets/images/YoonSea_1.png";
import styles from "./YoonSeaPhotoShootPage.module.css";

const STORAGE_KEY = "yoonSeaPhotoShoot.photos.v1";

const COUNT_NUM_SRC: Record<5 | 4 | 3 | 2 | 1, string> = {
  5: countNum5,
  4: countNum4,
  3: countNum3,
  2: countNum2,
  1: countNum1,
};

function loadPhotos(): (string | null)[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [null, null, null, null];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [null, null, null, null];
    const arr = parsed.map((x) => (typeof x === "string" ? x : null));
    while (arr.length < 4) arr.push(null);
    return arr.slice(0, 4) as (string | null)[];
  } catch {
    return [null, null, null, null];
  }
}

function savePhotos(photos: (string | null)[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

function nextEmptySlot(photos: (string | null)[]) {
  const i = photos.findIndex((p) => !p);
  return i === -1 ? 4 : i;
}

export function YoonSeaPhotoShootPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [streamReady, setStreamReady] = useState(false);
  const [photos, setPhotos] = useState<(string | null)[]>(() => loadPhotos());
  const [phase, setPhase] = useState<5 | 4 | 3 | 2 | 1 | null>(null);
  const pendingRef = useRef<number | null>(null);
  const countingRef = useRef(false);
  const photosRef = useRef(photos);
  const phaseRef = useRef(phase);
  photosRef.current = photos;
  phaseRef.current = phase;

  const nextSlot = nextEmptySlot(photos);
  const statusLabel =
    nextSlot >= 4
      ? "촬영 완료 (4/4)"
      : `촬영 중이예요 ${nextSlot + 1}/4`;

  const captureFrame = useCallback((slotIndex: number) => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    setPhotos((prev) => {
      const next = [...prev];
      next[slotIndex] = dataUrl;
      savePhotos(next);
      return next;
    });
  }, []);

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

  /** 첫 컷은 카메라 준비 후 짧게, 이후 컷은 5초 간격으로 자동 카운트다운 */
  useEffect(() => {
    if (cameraError || !streamReady) return;
    if (phase !== null) return;
    const slot = nextEmptySlot(photos);
    if (slot >= 4) return;

    const hasAnyPhoto = photos.some((p) => p != null);
    const delayMs = hasAnyPhoto ? 5000 : 600;

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
    let stream: MediaStream | null = null;
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
        stream = s;
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
          stream = null;
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
      if (videoEl && onMeta) videoEl.removeEventListener("loadedmetadata", onMeta);
      stream?.getTracks().forEach((t) => t.stop());
      if (videoEl) videoEl.srcObject = null;
    };
  }, []);

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
          src={yoonSeaFrame}
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
