import { ResultLayout, type ResultTab } from "./ResultLayout";
import star1 from "../../assets/images/star1.png";
import star2 from "../../assets/images/star2.png";
import styles from "./SajuAbilityResult.module.css";

interface StatData {
  실행력: number;
  재물운: number;
  인싸력: number;
  맷집: number;
  논리력: number;
}

interface Props {
  stats?: StatData;
  onTabClick?: (tab: ResultTab) => void;
}

const DEFAULT_STATS: StatData = {
  실행력: 40,
  재물운: 80,
  인싸력: 65,
  맷집: 65,
  논리력: 80,
};

const CX = 946;
const CY = 619;
const MAX_R = 284;
const LEVELS = [284, 231, 176, 116, 72];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polyPoints(cx: number, cy: number, r: number, n = 5, startDeg = -90): string {
  return Array.from({ length: n }, (_, i) => {
    const a = toRad(startDeg + (360 / n) * i);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

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

const LABELS = [
  { text: "실행력", x: 946,  y: 274, anchor: "middle" as const },
  { text: "재물운", x: 1275, y: 534, anchor: "start"  as const },
  { text: "인싸력", x: 1093, y: 934, anchor: "start"  as const },
  { text: "맷집",   x: 732,  y: 934, anchor: "start"  as const },
  { text: "논리력", x: 536,  y: 534, anchor: "start"  as const },
];

export function SajuAbilityResult({ stats = DEFAULT_STATS, onTabClick }: Props) {

  return (
    <ResultLayout activeTab="능력치" bg="bg4" onTabClick={onTabClick}>
      <div className={styles.bottomGradient} />

      {/* 반짝이 */}
      <img src={star1} alt="" className={styles.spark1} />
      <img src={star2} alt="" className={styles.spark2} />
      <img src={star1} alt="" className={styles.spark3} />

      <svg className={styles.chartSvg} viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <polygon points={polyPoints(CX, CY, LEVELS[0])} fill="white" />

        {LEVELS.map((r, i) => (
          <polygon
            key={i}
            points={polyPoints(CX, CY, r)}
            fill="none"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {Array.from({ length: 5 }, (_, i) => {
          const a = toRad(-90 + 72 * i);
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={CX + MAX_R * Math.cos(a)}
              y2={CY + MAX_R * Math.sin(a)}
              stroke="rgba(0,0,0,0.35)" strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        <polygon
          points={statPoints(stats, CX, CY, MAX_R)}
          fill="rgba(250, 140, 174, 0.6)"
          stroke="#FF78A6"
          strokeWidth="2"
        />

        {/* 오각형 꼭짓점 원 */}
        {Array.from({ length: 5 }, (_, i) => {
          const a = toRad(-90 + 72 * i);
          return (
            <ellipse
              key={i}
              cx={CX + MAX_R * Math.cos(a)}
              cy={CY + MAX_R * Math.sin(a)}
              rx={11.5} ry={11.5}
              fill="#FF8DB0"
              stroke="#5E3535"
              strokeWidth="1"
            />
          );
        })}


        {LABELS.map((lb, i) => (
          <text
            key={i}
            x={lb.x} y={lb.y}
            textAnchor={lb.anchor}
            fontSize="32" fontWeight="600"
            fontFamily="Paperlogy, sans-serif"
            fill="#5E3535"
          >
            {lb.text}
          </text>
        ))}
      </svg>
    </ResultLayout>
  );
}
