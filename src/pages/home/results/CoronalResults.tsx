import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/results/ResponsiveLayout";
import { fetchCoronalAnalysis } from "@/api/saju";
import type { CoronalData } from "@/types/api";
import styles from "@/styles/CoronalResults.module.css";

const FACE_LABELS = [
  { label: "타고난 성격", x: 591,  y: 428, w: 163 },
  { label: "명운",        x: 932,  y: 378, w: 117 },
  { label: "사업운",      x: 1107, y: 371, w: 117 },
  { label: "결혼운",      x: 1166, y: 461, w: 117, alt: true },
  { label: "재물운",      x: 1012, y: 613, w: 117 },
  { label: "대인운",      x: 1076, y: 725, w: 117 },
  { label: "이성운",      x: 991,  y: 852, w: 117 },
  { label: "말년운",      x: 668,  y: 870, w: 117 },
  { label: "건강운",      x: 707,  y: 692, w: 117 },
];

const FACE_ARROWS_SVG = [
  { x1: 736,  y1: 458, x2: 796,  y2: 508 },
  { x1: 993,  y1: 400, x2: 933,  y2: 489 },
  { x1: 1135, y1: 379, x2: 1049, y2: 478 },
  { x1: 1201, y1: 483, x2: 1094, y2: 546 },
  { x1: 1026, y1: 628, x2: 923,  y2: 628 },
  { x1: 805,  y1: 714, x2: 901,  y2: 732 },
  { x1: 1129, y1: 736, x2: 1002, y2: 763 },
  { x1: 1027, y1: 869, x2: 943,  y2: 806 },
  { x1: 716,  y1: 886, x2: 816,  y2: 827 },
];

const FACE_DOTS = [
  { x: 796,  y: 508 }, { x: 933,  y: 489 }, { x: 1049, y: 478 },
  { x: 1094, y: 546 }, { x: 923,  y: 628 }, { x: 901,  y: 732 },
  { x: 1002, y: 763 }, { x: 943,  y: 806 }, { x: 816,  y: 827 },
];

const ANALYSIS_DOTS = [
  { num: "1", x: 921, y: 426 },
  { num: "2", x: 919, y: 653 },
  { num: "3", x: 1077, y: 561 },
  { num: "4", x: 917, y: 763 },
];

const GUIDE_SECTIONS = [
  { label: "상정 上程", top: 318 },
  { label: "중정 中正", top: 508 },
  { label: "하정 下程", top: 699 },
];

const RIGHT_SECTIONS = [304, 465, 632, 802];
const DIVIDER_Y     = [327, 487, 657, 827];

const ITEM_NAME = ['forehead', 'eyes', 'nose', 'mouth'] as const;

interface CoronalResultsProps {
  inlineMode?: boolean;
}

export function CoronalResults({ inlineMode = false }: CoronalResultsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<CoronalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const userId = localStorage.getItem("saju_user_id");
        if (!userId) {
          if (!inlineMode) navigate("/camera");
          return;
        }
        const data = await fetchCoronalAnalysis(userId);
        setResult(data);
      } catch (err) {
        console.error("관상 분석 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [navigate, inlineMode]);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }
    progressTimer.current = setInterval(() => {
      setProgress(p => Math.min(p + 4, 90));
    }, 2000);
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [loading]);

  const capturedImage =
    location.state?.capturedImage ||
    sessionStorage.getItem("capturedImage") ||
    result?.image_url;

  if (loading) return (
    <div className={styles.loadingRoot}>
      <h1 className={styles.loadingTitle}>분석하고 있어요</h1>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
  if (!result) return null;

  return (
    <ResponsiveLayout designWidth={1920} designHeight={1115}>
      <div className={styles.root}>
        <div className={styles.bottomGradient} />
        <h1 className={styles.resultTitle}>관상 결과지</h1>

        {GUIDE_SECTIONS.map((section, i) => (
          <div key={i} className={styles.guideSection} style={{ top: section.top }}>
            <div className={styles.guideBg} />
            <div className={styles.guideTopLine} />
            <span className={styles.guideText}>{section.label}</span>
            <div className={styles.guideBottomLine} />
          </div>
        ))}

        <div className={styles.imageContainer}>
          {capturedImage && <img src={capturedImage} alt="분석 이미지" className={styles.capturedImg} />}
        </div>

        <svg className={styles.arrowSvg} viewBox="0 0 1920 1115">
          {FACE_ARROWS_SVG.map((line, i) => (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#FF7998" strokeWidth="3" strokeLinecap="round" />
          ))}
          {FACE_DOTS.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={5} fill="#FF4B74" />
          ))}
        </svg>

        {FACE_LABELS.map((item, i) => (
          <div key={i} className={`${styles.faceLabel} ${item.alt ? styles.faceLabelAlt : ''}`} style={{ left: item.x, top: item.y, width: item.w }}>
            {item.label}
          </div>
        ))}

        {ANALYSIS_DOTS.map((dot, i) => (
          <div key={i} className={styles.dotGroup} style={{ left: dot.x, top: dot.y }}>
            <span className={styles.dotNum}>{dot.num}</span>
          </div>
        ))}

        {RIGHT_SECTIONS.map((sectionTop, i) => (
          <React.Fragment key={i}>
            <div className={styles.rightDivider} style={{ top: DIVIDER_Y[i] }} />
            <div className={styles.rightBullet} style={{ top: DIVIDER_Y[i] - 5 }} />
            <div className={styles.rightSection} style={{ top: sectionTop }}>
              <p className={styles.rightTitle}>{`${i + 1}. ${result.facial_features[ITEM_NAME[i]].shape ?? '정보 없음'}`}</p>
              <p className={styles.rightDesc}>{result.facial_features[ITEM_NAME[i]].meaning ?? ''}</p>
            </div>
          </React.Fragment>
        ))}
        
        <div className={styles.buttonWrapper}>
          <button 
            onClick={() => {
              // 즉시 페이지 이동하여 GenericSajuResultPage의 로딩 화면을 보여줌
              // 실제 분석은 이동한 페이지에서 진행됨
              navigate('/character/choiharam'); 
            }}
            className={styles.navButton}
          >
            캐릭터 궁합 보러가기
          </button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
