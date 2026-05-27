import { useState } from "react";
import styles from "./SajuOhaengInfoResult.module.css";

const ELEMENTS = [
  { label: "흙",      sub: "50.0%", cx: 350, cy: 579 },
  { label: "금(식상)", sub: "25.0%", cx: 510, cy: 697 },
  { label: "수(재성)", sub: "25.0%", cx: 450, cy: 886 },
  { label: "목(관성)", sub: "0.0%",  cx: 250, cy: 886 },
  { label: "화(인성)", sub: "0.0%",  cx: 188, cy: 697 },
];

// 생(生) 화살표 — 피그마 absoluteTransform 실좌표, 파랑
const SHENG_ARROWS = [
  { x1: 488, y1: 776, x2: 473, y2: 811 },
  { x1: 368, y1: 887, x2: 329, y2: 887 },
  { x1: 221, y1: 812, x2: 211, y2: 771 },
  { x1: 253, y1: 651, x2: 285, y2: 626 },
  { x1: 419, y1: 620, x2: 453, y2: 642 },
];

// 극(剋) 화살표 — 피그마 absoluteTransform 실좌표, 빨강
const KE_ARROWS = [
  { x1: 268, y1: 720, x2: 427, y2: 720 },
  { x1: 355, y1: 661, x2: 401, y2: 816 },
  { x1: 429, y1: 729, x2: 303, y2: 822 },
  { x1: 397, y1: 819, x2: 268, y2: 726 },
  { x1: 297, y1: 819, x2: 346, y2: 666 },
];

const TABLE_ROWS = [
  { el: "흙",   pct: "66.7 %", trait: "압도적인 자존감과 고집, 듬직함" },
  { el: "물",   pct: "33.3 %", trait: "재물에 대한 감각과 목표 의식" },
  { el: "불",   pct: "0 %",    trait: "열정과 에너지 보충 필요" },
  { el: "나무", pct: "0 %",    trait: "자기 통제 및 규율 보완 필요" },
  { el: "쇠",   pct: "0 %",    trait: "표현력과 유연함 보완 필요" },
];

const ROW_YS = [646, 718, 790, 862, 934];

interface Props { hideBg?: boolean; }

export function SajuOhaengInfoResult({ hideBg = false }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.root} style={hideBg ? { backgroundColor: 'transparent' } : undefined}>
      {!hideBg && <div className={styles.bgImage} />}
      {!hideBg && <div className={styles.midSection} />}
      {!hideBg && <div className={styles.bottomOverlay} />}
      {!hideBg && <div className={styles.rightDivider} />}

      {/* 캐릭터 아바타 */}
      <div className={styles.characterCircle} />

      {/* 캐릭터 정보 */}
      <p className={styles.charName}>듬직한바위산_무토</p>
      <p className={styles.charSub}>흔들리지 않는 대지</p>
      <p className={styles.charDesc}>어떤 시련에도 묵묵히 자리를 지키는 듬직한 리더 타입</p>

      {/* MBTI */}
      <p className={styles.mbtiLabel}>매칭 MBTI</p>
      <div className={styles.mbtiBadges}>
        <div className={styles.mbtiBadge}>ISTJ</div>
        <div className={styles.mbtiBadge}>ESTJ</div>
      </div>

      {/* 오행 분석 타이틀 + 돋보기 아이콘 */}
      <p className={styles.sectionTitle}>오행 분석</p>
      <div className={styles.searchIcon} onClick={() => setShowModal(true)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* SVG: 오행 다이어그램 + 표 */}
      <svg className={styles.chartSvg} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* markerUnits="userSpaceOnUse" → 픽셀 단위 고정, strokeWidth 배율 없음 */}
          <marker id="arrow-sheng" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L14,5 L0,10 Z" fill="rgb(0,95,255)" />
          </marker>
          <marker id="arrow-ke" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L14,5 L0,10 Z" fill="rgb(255,84,73)" />
          </marker>
        </defs>

        {/* 표 배경 */}
        <rect x={696} y={537} width={1114} height={433} fill="rgba(253,253,253,1)" rx={25} stroke="#000" strokeWidth={1} />
        {/* 표 헤더 배경 — 상단 모서리만 rx=25 */}
        <path d="M721,537 Q696,537 696,562 L696,610 L1810,610 L1810,562 Q1810,537 1785,537 Z" fill="#FFD5E1" stroke="#000" strokeWidth={1} />
        {/* 표 수직 구분선 */}
        <line x1={903}  y1={537} x2={903}  y2={970} stroke="#000" strokeWidth={1} />
        <line x1={1103} y1={537} x2={1103} y2={970} stroke="#000" strokeWidth={1} />
        {/* 표 수평 구분선 */}
        {[682, 754, 826, 898].map((y, i) => (
          <line key={i} x1={696} y1={y} x2={1810} y2={y} stroke="#000" strokeWidth={1} />
        ))}
        {/* 표 헤더 */}
        <text x={746}  y={578} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>오행 요소</text>
        <text x={949}  y={578} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>비율</text>
        <text x={1126} y={578} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>특징</text>
        {/* 표 데이터 */}
        {TABLE_ROWS.map((row, i) => (
          <g key={i}>
            <text x={746}  y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500} dominantBaseline="central">{row.el}</text>
            <text x={953}  y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500} dominantBaseline="central">{row.pct}</text>
            <text x={1134} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500} dominantBaseline="central">{row.trait}</text>
          </g>
        ))}

        {/* 극(剋) 화살표 — 빨강 실선 */}
        {KE_ARROWS.map((a, i) => (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="rgb(255,84,73)" strokeWidth={4}
            markerEnd="url(#arrow-ke)" />
        ))}

        {/* 생(生) 화살표 — 파랑 실선 */}
        {SHENG_ARROWS.map((a, i) => (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="rgb(0,95,255)" strokeWidth={4}
            markerEnd="url(#arrow-sheng)" />
        ))}

        {/* 오행 원 — 흰색 배경, 핑크 테두리 */}
        {ELEMENTS.map((el, i) => (
          <g key={i}>
            <circle cx={el.cx} cy={el.cy} r={72} fill="#fff" stroke="rgb(255,31,124)" strokeWidth={2} />
            <text x={el.cx} y={el.cy - 14} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif"
              fill="#5E3535" fontWeight={600}>{el.label}</text>
            <text x={el.cx} y={el.cy + 14} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif"
              fill="#5E3535" fontWeight={600}>{el.sub}</text>
          </g>
        ))}

        {/* 범례 */}
        <line x1={1689} y1={460} x2={1720} y2={460}
          stroke="rgb(0,95,255)" strokeWidth={3} markerEnd="url(#arrow-sheng)" />
        <text x={1748} y={467} fontSize={24} fontFamily="Paperlogy,sans-serif" fill="rgba(31,69,60,1)" fontWeight={600}>생</text>
        <line x1={1689} y1={497} x2={1720} y2={497}
          stroke="rgb(255,84,73)" strokeWidth={3} markerEnd="url(#arrow-ke)" />
        <text x={1748} y={504} fontSize={24} fontFamily="Paperlogy,sans-serif" fill="rgba(31,69,60,1)" fontWeight={600}>극</text>
      </svg>

      {/* 화이트 딤 오버레이 + 모달 */}
      {showModal && (
        <>
          <div className={styles.dimOverlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalInner}>
              <h2 className={styles.modalTitle}>오행이란?</h2>
              <p className={styles.modalSubtitle}>
                오행은 목,화,토,금,수 다섯 가지로 이루어져 있으며 비율과 조합에 따라 다양한 성향과 성격을 나타냅니다.
              </p>
              <p className={styles.modalBody}>
  {'• 목  : 성장력, 추친력, 포부, 목표지향적, 낙천성\n• 화 : 열정, 소유욕, 모성애\n• 토 : 포용력, 이해심, 계산적, 실리주의\n• 금 : 결단력, 절제력, 이상적, 분석적\n• 수 : 유연함, 처세술, 임기응변, 수용적'}
              </p>
              <div className={styles.modalButton}>
                <span className={styles.modalButtonText}>내 사주 오행 분석 보러가기</span>
              </div>
            </div>
            <div className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</div>
          </div>
        </>
      )}
    </div>
  );
}
