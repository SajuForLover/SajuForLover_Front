import styles from "./SajuAbilityDetailResult.module.css";

// 오각형 유틸
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
// 축 순서: 인내심(top), 실행력(upper-right), 창의력(lower-right), 사회성(lower-left), 재물운(left)
const STATS = [95, 90, 20, 40, 85];
const RINGS = [184, 150.5, 114.5, 75.5, 46.5];

// 레이블 위치 (Figma 기준)
const LABELS = [
  { text: "인내심", x: 333, y: 219 },
  { text: "실행력", x: 567, y: 385 },
  { text: "창의력", x: 463, y: 647 },
  { text: "사회성", x: 207, y: 647 },
  { text: "재물운", x: 82,  y: 387 },
];

// 도트 센터 (Figma 절대 좌표 기준)
const DOTS: [number, number][] = [
  [366, 272],  // 인내심
  [543, 405],  // 실행력
  [474, 616],  // 창의력
  [257, 616],  // 사회성
  [189, 406],  // 재물운
];

// 능력치 테이블 데이터
const TABLE_ROWS = [
  { item: "인내심", score: "95 / 100", status: "MAX (최상급 맷집)" },
  { item: "실행력", score: "90 / 100", status: "Hight (한번 정하면 끝까지 함)" },
  { item: "재물운", score: "85 / 100", status: "Hight (돈을 모으는 힘)" },
  { item: "사회성", score: "40 / 100", status: "Average (선택적 인싸)" },
  { item: "창의력", score: "20 / 100", status: "Low (현실주의적 성향)" },
];

const ROW_YS = [319, 394, 475, 550, 626];

export function SajuAbilityDetailResult() {
  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.bottomSection} />
      <div className={styles.bottomOverlay} />
      <div className={styles.rightDivider} />

      {/* 페이지 타이틀 */}
      <p className={styles.pageTitle}>능력치</p>

      {/* SVG: 레이더 차트 + 테이블 */}
      <svg className={styles.chartSvg} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">

        {/* 레이더 오각형 링 */}
        {RINGS.map((r, i) => (
          <polygon key={i} points={polyPoints(CX, CY, r)}
            fill={i === 0 ? "rgba(255,200,215,0.12)" : "none"}
            stroke="rgba(200,160,175,0.5)" strokeWidth={1} />
        ))}

        {/* 축선 (중심→꼭짓점) */}
        {[0,1,2,3,4].map(i => {
          const a = toRad(-90 + 72 * i);
          return (
            <line key={i}
              x1={CX} y1={CY}
              x2={CX + MAX_R * Math.cos(a)}
              y2={CY + MAX_R * Math.sin(a)}
              stroke="rgba(200,160,175,0.4)" strokeWidth={1} />
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
        {LABELS.map((lb, i) => (
          <text key={i} x={lb.x} y={lb.y + 28}
            fontSize={32} fontFamily="Paperlogy,sans-serif"
            fill="#5E3535" fontWeight={500}>{lb.text}</text>
        ))}

        {/* 테이블 배경 */}
        <rect x={690} y={219} width={1142} height={469} fill="rgba(255,255,255,0.82)" rx={12} />
        <rect x={690} y={219} width={1142} height={79}  fill="rgba(255,200,215,0.55)" rx={0} />
        {/* 테이블 수직 구분선 */}
        <line x1={914} y1={219} x2={914} y2={688} stroke="rgba(200,160,175,0.5)" strokeWidth={1} />
        <line x1={1131} y1={219} x2={1131} y2={688} stroke="rgba(200,160,175,0.5)" strokeWidth={1} />
        {/* 테이블 수평 구분선 */}
        {[376, 454, 532, 610].map((y, i) => (
          <line key={i} x1={690} y1={y} x2={1832} y2={y} stroke="rgba(200,160,175,0.35)" strokeWidth={1} />
        ))}
        {/* 헤더 */}
        <text x={741} y={266} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>능력치 항목</text>
        <text x={963} y={266} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>점수 0/100</text>
        <text x={1178} y={266} fontSize={28} fontFamily="Paperlogy,sans-serif" fill="#5E3535" fontWeight={600}>상태</text>
        {/* 데이터 행 */}
        {TABLE_ROWS.map((row, i) => (
          <g key={i}>
            <text x={744} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.item}</text>
            <text x={966} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.score}</text>
            <text x={1175} y={ROW_YS[i] + 8} fontSize={26} fontFamily="Paperlogy,sans-serif" fill="#5E3535">{row.status}</text>
          </g>
        ))}
      </svg>

      {/* 나의 일잘러 성향 리포트 링크 */}
      <div className={styles.reportLink}>
        <span className={styles.reportLinkText}>나의 일잘러 성향 리포트</span>
      </div>

      {/* 추천 직업 바 */}
      <div className={styles.footerBar}>
        <span className={styles.footerLabel}>추천 직업</span>
        <div className={styles.footerDivider} />
        <span className={styles.footerValue}>부동산 자산운용가, 플랫폼 운영 기획자, 전통장인</span>
      </div>
    </div>
  );
}
