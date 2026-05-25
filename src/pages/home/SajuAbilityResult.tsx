import styles from "./SajuAbilityResult.module.css";

interface StatData {
  실행력: number; // 0–100
  재물운: number;
  인싸력: number;
  맷집: number;
  논리력: number;
}

interface Props {
  stats?: StatData;
}

const DEFAULT_STATS: StatData = {
  실행력: 40,
  재물운: 80,
  인싸력: 65,
  맷집: 65,
  논리력: 80,
};

// 차트 중심 & 최대 반지름 (피그마 기준 절대 좌표)
const CX = 946;
const CY = 619;
const MAX_R = 284;

// 5각형 테두리 반지름 레벨 (피그마 Star 1~5 크기 기반)
const LEVELS = [284, 231, 176, 116, 72];

// 라디안 변환
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

// n각형 꼭짓점 좌표 문자열 반환
function polyPoints(cx: number, cy: number, r: number, n = 5, startDeg = -90): string {
  return Array.from({ length: n }, (_, i) => {
    const a = toRad(startDeg + (360 / n) * i);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// 스탯 값으로 채워진 폴리곤 좌표 반환
function statPoints(stats: StatData, cx: number, cy: number, maxR: number): string {
  const values = [stats.실행력, stats.재물운, stats.인싸력, stats.맷집, stats.논리력];
  return values
    .map((v, i) => {
      const a = toRad(-90 + 72 * i);
      const r = (v / 100) * maxR;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(" ");
}

// 라벨 정보 (피그마 절대 좌표 기준)
const LABELS = [
  { text: "실행력", x: 946, y: 274, anchor: "middle" as const },
  { text: "재물운", x: 1275, y: 534, anchor: "start" as const },
  { text: "인싸력", x: 1093, y: 934, anchor: "start" as const },
  { text: "맷집",   x: 732,  y: 934, anchor: "start" as const },
  { text: "논리력", x: 536,  y: 534, anchor: "start" as const },
];

export function SajuAbilityResult({ stats = DEFAULT_STATS }: Props) {
  const statValues = [stats.실행력, stats.재물운, stats.인싸력, stats.맷집, stats.논리력];

  return (
    <div className={styles.root}>
      {/* 배경 이미지 */}
      <div className={styles.bgImage} />

      {/* 하단 핑크 그라데이션 */}
      <div className={styles.bottomGradient} />

      {/* 로고 */}
      <div className={styles.logo}>애인사주오!</div>

      {/* 탭 네비게이션 */}
      <nav className={styles.tabNav}>
        <button className={styles.tab}>캐릭터</button>
        <button className={`${styles.tab} ${styles.tabActive}`}>능력치</button>
        <button className={styles.tab}>라이프</button>
        <button className={styles.tab}>부스터</button>
        <button className={styles.tab}>운의 흐름</button>
      </nav>

      {/* 레이더 차트 SVG */}
      <svg
        className={styles.chartSvg}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 배경 흰 오각형 (가장 큰 것부터 채움) */}
        <polygon points={polyPoints(CX, CY, LEVELS[0])} fill="white" />

        {/* 오각형 격자 테두리 (5단계) */}
        {LEVELS.map((r, i) => (
          <polygon
            key={i}
            points={polyPoints(CX, CY, r)}
            fill="none"
            stroke="rgba(230, 160, 180, 0.4)"
            strokeWidth="1"
          />
        ))}

        {/* 중심에서 각 꼭짓점으로 뻗는 축선 */}
        {Array.from({ length: 5 }, (_, i) => {
          const a = toRad(-90 + 72 * i);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={CX + MAX_R * Math.cos(a)}
              y2={CY + MAX_R * Math.sin(a)}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* 스탯 폴리곤 (핑크 60% 불투명도) */}
        <polygon
          points={statPoints(stats, CX, CY, MAX_R)}
          fill="rgba(250, 140, 174, 0.6)"
          stroke="none"
        />

        {/* 각 꼭짓점 핑크 도트 */}
        {statValues.map((v, i) => {
          const a = toRad(-90 + 72 * i);
          const r = (v / 100) * MAX_R;
          return (
            <ellipse
              key={i}
              cx={CX + r * Math.cos(a)}
              cy={CY + r * Math.sin(a)}
              rx={11}
              ry={11.5}
              fill="#FF8DAE"
            />
          );
        })}

        {/* 축 이름 라벨 */}
        {LABELS.map((lb, i) => (
          <text
            key={i}
            x={lb.x}
            y={lb.y}
            textAnchor={lb.anchor}
            fontSize="32"
            fontWeight="600"
            fontFamily="Paperlogy, sans-serif"
            fill="#5E3535"
          >
            {lb.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
