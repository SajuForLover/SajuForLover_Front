import { useState } from "react";
import styles from "./SajuOhaengResult.module.css";

// 오행 5개 원 (절대 좌표, r=72)
const ELEMENTS = [
  { label: "흙",     sub: "50.0%", cx: 350, cy: 579, color: "#D4AA70", textColor: "#fff" },
  { label: "금(식상)", sub: "25.0%", cx: 510, cy: 697, color: "#C0C0C0", textColor: "#5E3535" },
  { label: "수(재성)", sub: "25.0%", cx: 450, cy: 886, color: "#7BAEC7", textColor: "#fff" },
  { label: "목(관성)", sub: "0.0%",  cx: 250, cy: 886, color: "#8BBF8B", textColor: "#fff" },
  { label: "화(인성)", sub: "0.0%",  cx: 188, cy: 697, color: "#E09090", textColor: "#fff" },
];

// 생(生) 사이클: 흙→금→수→목→화→흙
const SHENG_IDX: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]];
// 극(剋) 사이클: 흙→수, 수→화, 화→금, 금→목, 목→흙
const KE_IDX: [number, number][] = [[0,2],[2,4],[4,1],[1,3],[3,0]];

function arrowPoints(from: typeof ELEMENTS[0], to: typeof ELEMENTS[0], r = 74) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return {
    x1: from.cx + (dx / dist) * r,
    y1: from.cy + (dy / dist) * r,
    x2: to.cx - (dx / dist) * r,
    y2: to.cy - (dy / dist) * r,
  };
}

const TABLE_ROWS = [
  { el: "흙",   pct: "66.7 %", trait: "압도적인 자존감과 고집, 듬직함" },
  { el: "물",   pct: "33.3 %", trait: "재물에 대한 감각과 목표 의식" },
  { el: "불",   pct: "0 %",    trait: "열정과 에너지 보충 필요" },
  { el: "나무", pct: "0 %",    trait: "자기 통제 및 규율 보완 필요" },
  { el: "쇠",   pct: "0 %",    trait: "표현력과 유연함 보완 필요" },
];

const ROW_YS = [629, 699, 773, 843, 913];

export function SajuOhaengResult() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.midSection} />
      <div className={styles.bottomOverlay} />
      <div className={styles.rightDivider} />

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

      {/* 오행 분석 타이틀 */}
      <p className={styles.sectionTitle}>오행 분석</p>

      {/* 돋보기 아이콘 */}
      <div className={styles.searchIcon} onClick={() => setShowModal(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="3"/>
          <path d="M20 20L17 17" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* SVG: 오행 오각형 다이어그램 + 표 */}
      <svg className={styles.chartSvg} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-sheng" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="rgba(94,53,53,0.55)" />
          </marker>
          <marker id="arrow-ke" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="rgba(94,53,53,0.35)" />
          </marker>
        </defs>

        {/* 표 배경 */}
        <rect x={696} y={537} width={1114} height={433} fill="rgba(255,255,255,0.82)" rx={12} />
        <rect x={696} y={537} width={1114} height={73} fill="rgba(255,200,215,0.55)" rx={0} />
        {/* 표 수직 구분선 */}
        <line x1={903} y1={537} x2={903} y2={970} stroke="rgba(200,160,175,0.5)" strokeWidth={1} />
        <line x1={1103} y1={537} x2={1103} y2={970} stroke="rgba(200,160,175,0.5)" strokeWidth={1} />
        {/* 표 수평 구분선 */}
        {[682, 754, 826, 898].map((y, i) => (
          <line key={i} x1={696} y1={y} x2={1810} y2={y} stroke="rgba(200,160,175,0.35)" strokeWidth={1} />
        ))}
        {/* 표 헤더 */}
        <text x={746} y={581} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>오행 요소</text>
        <text x={949} y={581} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>비율</text>
        <text x={1126} y={581} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>특징</text>
        {/* 표 데이터 */}
        {TABLE_ROWS.map((row, i) => (
          <g key={i}>
            <text x={746} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.el}</text>
            <text x={953} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.pct}</text>
            <text x={1134} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.trait}</text>
          </g>
        ))}

        {/* 극(剋) 화살표 - 점선 */}
        {KE_IDX.map(([f, t], i) => {
          const { x1, y1, x2, y2 } = arrowPoints(ELEMENTS[f], ELEMENTS[t]);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(94,53,53,0.35)" strokeWidth={2}
              strokeDasharray="8 5" markerEnd="url(#arrow-ke)" />
          );
        })}

        {/* 생(生) 화살표 - 실선 */}
        {SHENG_IDX.map(([f, t], i) => {
          const { x1, y1, x2, y2 } = arrowPoints(ELEMENTS[f], ELEMENTS[t]);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(94,53,53,0.55)" strokeWidth={2.5}
              markerEnd="url(#arrow-sheng)" />
          );
        })}

        {/* 오행 원 */}
        {ELEMENTS.map((el, i) => (
          <g key={i}>
            <circle cx={el.cx} cy={el.cy} r={72} fill={el.color} stroke="rgba(255,255,255,0.7)" strokeWidth={4} />
            <text x={el.cx} y={el.cy - 8} textAnchor="middle" fontSize={22} fontFamily="Paperlogy,sans-serif"
              fill={el.textColor} fontWeight={700}>{el.label}</text>
            <text x={el.cx} y={el.cy + 20} textAnchor="middle" fontSize={20} fontFamily="Paperlogy,sans-serif"
              fill={el.textColor} opacity={0.9}>{el.sub}</text>
          </g>
        ))}

        {/* 범례 */}
        <line x1={1689} y1={460} x2={1734} y2={460} stroke="rgba(94,53,53,0.55)" strokeWidth={2.5} markerEnd="url(#arrow-sheng)" />
        <text x={1748} y={466} fontSize={24} fontFamily="Paperlogy,sans-serif" fill="#5E3535">생</text>
        <line x1={1689} y1={497} x2={1734} y2={497} stroke="rgba(94,53,53,0.35)" strokeWidth={2} strokeDasharray="8 5" markerEnd="url(#arrow-ke)" />
        <text x={1748} y={503} fontSize={24} fontFamily="Paperlogy,sans-serif" fill="#5E3535">극</text>
      </svg>

      {/* 갈색 모달 창 (돋보기 클릭 시) */}
      {showModal && (
        <>
          <div className={styles.dimOverlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalInner}>
              <p className={styles.modalTitle}>오행 분석이란?</p>
              <p className={styles.modalSubtitle}>
                나를 상징하는 기운과 주변 기운의{"\n"}
                조화를 분석한 결과입니다.
              </p>
              <p className={styles.modalBody}>
                사주팔자는 나무(木), 불(火), 흙(土), 쇠(金), 물(水)의{"\n"}
                다섯 가지 요소로 이루어져 있습니다.{"\n"}
                각 요소의 비율을 통해 타고난 기질과 보완하면 좋은 기운을 알 수 있습니다.
              </p>
              <div className={styles.modalButton} onClick={() => setShowModal(false)}>
                <span className={styles.modalButtonText}>확인</span>
              </div>
              <div className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
