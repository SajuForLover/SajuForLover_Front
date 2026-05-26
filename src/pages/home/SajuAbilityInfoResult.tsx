import { useState } from "react";
import styles from "./SajuAbilityInfoResult.module.css";

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function polyPoints(cx: number, cy: number, r: number, n = 5, startDeg = -90): string {
  return Array.from({ length: n }, (_, i) => {
    const a = toRad(startDeg + (360 / n) * i);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}
function statPoints(stats: number[], cx: number, cy: number, maxR: number): string {
  return stats.map((s, i) => {
    const a = toRad(-90 + (360 / 5) * i);
    const r = (s / 100) * maxR;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const CX = 365;
const CY = 463;
const MAX_R = 184;
const STATS = [95, 90, 20, 40, 85];
const RINGS = [184, 150.5, 114.5, 75.5, 46.5];

const LABELS = [
  { text: "인내심", x: 333, y: 219 },
  { text: "실행력", x: 567, y: 385 },
  { text: "창의력", x: 463, y: 634 },
  { text: "사회성", x: 207, y: 634 },
  { text: "재물운", x: 95,  y: 387 },
];

const DOTS: [number, number][] = [
  [366, 272],
  [543, 405],
  [474, 616],
  [257, 616],
  [189, 406],
];

const TABLE_ROWS = [
  { item: "인내심", score: "95", status: "MAX (최상급 맷집)" },
  { item: "실행력", score: "90", status: "Hight (한번 정하면 끝까지 함)" },
  { item: "재물운", score: "85", status: "Hight (돈을 모으는 힘)" },
  { item: "사회성", score: "40", status: "Average (선택적 인싸)" },
  { item: "창의력", score: "20", status: "Low (현실주의적 성향)" },
];

const ROW_YS = [337, 415, 493, 571, 649];

interface Props { hideBg?: boolean; }

export function SajuAbilityInfoResult({ hideBg = false }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.root} style={hideBg ? { backgroundColor: 'transparent' } : undefined}>
      {!hideBg && <div className={styles.bgImage} />}
      {!hideBg && <div className={styles.midSection} />}
      {!hideBg && <div className={styles.rightDivider} />}

      {/* 페이지 타이틀 */}
      <p className={styles.pageTitle}>능력치</p>

      {/* 돋보기 아이콘 */}
      <div className={styles.searchIcon} onClick={() => setShowModal(true)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* SVG: 레이더 차트 + 테이블 */}
      <svg className={styles.chartSvg} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">

        {/* 레이더 오각형 링 — 점선 */}
        {RINGS.map((r, i) => (
          <polygon key={i} points={polyPoints(CX, CY, r)}
            fill={i === 0 ? "white" : "none"}
            stroke="rgba(200,160,175,0.7)" strokeWidth={1}
            strokeDasharray="4 4" />
        ))}

        {/* 축선 — 점선 */}
        {[0,1,2,3,4].map(i => {
          const a = toRad(-90 + 72 * i);
          return (
            <line key={i}
              x1={CX} y1={CY}
              x2={CX + MAX_R * Math.cos(a)}
              y2={CY + MAX_R * Math.sin(a)}
              stroke="rgba(200,160,175,0.5)" strokeWidth={1}
              strokeDasharray="4 4" />
          );
        })}

        {/* 능력치 채워진 다각형 */}
        <polygon points={statPoints(STATS, CX, CY, MAX_R)}
          fill="rgba(255,120,166,0.35)" stroke="#FF78A6" strokeWidth={2} />

        {/* 도트 마커 */}
        {DOTS.map(([dx, dy], i) => (
          <ellipse key={i} cx={dx} cy={dy} rx={8} ry={8} fill="#FF8DAE" />
        ))}

        {/* 레이블 */}
        <text x={365} y={242} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>인내심</text>
        <text x={578} y={406} textAnchor="start"  dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>실행력</text>
        <text x={473} y={652} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>창의력</text>
        <text x={257} y={652} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>사회성</text>
        <text x={152} y={406} textAnchor="end"    dominantBaseline="central" fontSize={25} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={500}>재물운</text>


        {/* 테이블 배경 */}
        <rect x={690} y={219} width={1142} height={469} fill="rgba(255,255,255,0.82)" rx={25} stroke="#000" strokeWidth={1} />
        <path d="M715,219 L1807,219 Q1832,219 1832,244 L1832,298 L690,298 L690,244 Q690,219 715,219 Z" fill="#FFD5E1" stroke="#000" strokeWidth={1} />
        {/* 수직 구분선 */}
        <line x1={914} y1={219} x2={914} y2={688} stroke="#000" strokeWidth={1} />
        <line x1={1131} y1={219} x2={1131} y2={688} stroke="#000" strokeWidth={1} />
        {/* 수평 구분선 */}
        {[376, 454, 532, 610].map((y, i) => (
          <line key={i} x1={690} y1={y} x2={1832} y2={y} stroke="#000" strokeWidth={1} />
        ))}
        {/* 헤더 */}
        <text x={741} y={258} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600} dominantBaseline="central">능력치 항목</text>
        <text x={963} y={258} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600} dominantBaseline="central">점수 0/100</text>
        <text x={1178} y={258} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600} dominantBaseline="central">상태</text>
        {/* 데이터 행 */}
        {TABLE_ROWS.map((row, i) => (
          <g key={i}>
            <text x={744} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600} dominantBaseline="central">{row.item}</text>
            <text x={966} y={ROW_YS[i]} fontFamily="Paperlogy,sans-serif" dominantBaseline="central">
              <tspan fontSize={21} fill="#5E3535" fontWeight={600}>{row.score} </tspan>
              <tspan fontSize={18} fill="#848484" fontWeight={500}>/ 100</tspan>
            </text>
            <text x={1175} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600} dominantBaseline="central">{row.status}</text>
          </g>
        ))}
      </svg>

      {/* 나의 일잘러 성향 리포트 텍스트 */}
      <p className={styles.reportLink}>나의 일잘러 성향 리포트</p>
      <div className={styles.searchIcon} style={{ left: "535px", top: "780px" }} onClick={() => setShowModal(true)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 추천 직업 바 */}
      <div className={styles.footerBar}>
        <span className={styles.footerLabel}>추천 직업</span>
        <div className={styles.footerDivider} />
        <span className={styles.footerValue}>부동산 자산운용가, 플랫폼 운영 기획자, 전통장인</span>
      </div>

      {/* 화이트 딤 오버레이 + 모달 */}
      {showModal && (
        <>
          <div className={styles.dimOverlay} onClick={() => setShowModal(false)} />
          <div className={styles.modal}>
            <div className={styles.modalInner}>
              <h2 className={styles.modalTitle}>능력치란?</h2>
              <p className={styles.modalSubtitle}>
                {'사주 분석을 통해 도출된 타고난 기질과 역량을 5가지 다각형 차트로 시각화한 수치입니다. \n각 항목은 개인의 행동 패턴과 사회적 성향을 나타냅니다.'}
              </p>
              <p className={styles.modalBody}>
                {'인내심 : 어려운 상황이나 스트레스를 묵묵히 견뎌내는 끈기와 최고 수준의 맷집을 의미합니다.\n실행력 : 목표를 정하면 주저하지 않고 끝까지 밀어붙여 결과를 만들어내는 추진력입니다.\n재물운 : 자산을 안정적으로 모으고 관리하며, 현실적인 이익을 감지하는 힘을 뜻합니다.\n사회성 : 필요에 따라 관계를 맺는 선택적 성향으로, 독립성과 대인관계의 균형을 보여줍니다.\n창의력 : 이상적인 아이디어보다는 현실적이고 실용적인 가치를 우선시하는 성향을 나타냅니다.'}
              </p>
              <div className={styles.modalButton}>
                <span className={styles.modalButtonText}>내 사주 능력치 분석 보러가기</span>
              </div>
            </div>
            <div className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</div>
          </div>
        </>
      )}
    </div>
  );
}
