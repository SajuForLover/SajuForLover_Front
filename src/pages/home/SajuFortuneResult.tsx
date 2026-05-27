import logoImg from "../../assets/images/Group 88.png";
import pinkEffect from "../../assets/images/pinkEffect.png";
import styles from "./SajuFortuneResult.module.css";
import type { ResultTab } from "./ResultLayout";

// 바 데이터 (피그마 절대 좌표 기준)
const BARS = [
  { x: 227, y: 536, h: 351, year: "2026" },
  { x: 410, y: 676, h: 209, year: "2027" },
  { x: 591, y: 588, h: 297, year: "2028" },
  { x: 771, y: 498, h: 387, year: "2029" },
  { x: 953, y: 537, h: 347, year: "2030" },
  { x: 1135, y: 716, h: 168, year: "2031" },
  { x: 1318, y: 742, h: 141, year: "2032" },
  { x: 1500, y: 582, h: 300, year: "2033" },
  { x: 1683, y: 727, h: 154, year: "2034" },
];

// 수평 격자선 y 위치
const GRID_YS = [512, 610, 706, 803, 887];

// 도트 중심 좌표 (바 상단)
const DOT_CENTERS: [number, number][] = BARS.map((b) => [b.x + 35, b.y]);

// 상단 반원 막대 path (border-radius: 53px 53px 0 0 → 유효 r=35)
function barPath(x: number, y: number, h: number): string {
  const r = 35; // 70px 너비에서 53+53>70이므로 35로 클램핑
  return `M ${x},${y + h} L ${x},${y + r} A ${r},${r} 0 0 1 ${x + 70},${y + r} L ${x + 70},${y + h} Z`;
}


interface Props {
  onTabClick?: (tab: ResultTab) => void;
}

export function SajuFortuneResult({ onTabClick }: Props) {
  return (
    <div className={styles.root}>
      {/* 배경 이미지 */}
      <div className={styles.bgImage} />

      {/* 하단 핑크 그라데이션 */}
      <div className={styles.bottomGradient} />

      {/* 로고 */}
      <img src={logoImg} alt="애인사주오!" className={styles.logo} />

      {/* 탭 네비게이션 */}
      <nav className={styles.tabNav}>
        <button className={styles.tab} onClick={() => onTabClick?.("캐릭터")}>캐릭터</button>
        <button className={styles.tab} onClick={() => onTabClick?.("능력치")}>능력치</button>
        <button className={styles.tab} onClick={() => onTabClick?.("라이프")}>라이프</button>
        <button className={styles.tab} onClick={() => onTabClick?.("부스터")}>부스터</button>
        <button className={`${styles.tab} ${styles.tabActive}`}>운의 흐름</button>
      </nav>

      {/* 섹션 타이틀 */}
      <h2 className={styles.sectionTitle}>운의 에너지 그래프</h2>

      {/* 차트 SVG (전체 캔버스 덮음) */}
      <svg
        className={styles.chartSvg}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 카드 배경 */}
        <rect
          x={115} y={350} width={1728} height={649}
          fill="rgba(255,255,255,0.80)" rx={40}
          stroke="#E78EB3" strokeWidth={2}
        />

        {/* 수평 격자선 */}
        {GRID_YS.map((y, i) => (
          <line
            key={i}
            x1={178} y1={y} x2={1733} y2={y}
            stroke="#FFAEC1"
            strokeWidth={1}
          />
        ))}

        {/* 그라데이션 면적 (막대 뒤) */}
        <defs>
          <linearGradient id="areaGradient" x1="712.734" y1="435.728" x2="712.734" y2="-1.56974" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="#FFB3C5" stopOpacity="0.66" />
          </linearGradient>
        </defs>
        <g transform="translate(273, 447.164)">
          <path
            d="M350.5 107.836C186.359 235.795 57.2587 169.477 0 86.792V435.727H1480V319.228C1421 86.3358 1185.97 -44.3916 1084 284.228C1060.69 359.336 992.901 333.66 929.226 247.545C637 -147.664 450.412 29.9491 350.5 107.836Z"
            fill="url(#areaGradient)"
          />
        </g>

        {/* 바 (상단 반원, border-radius: 53px 53px 0 0) */}
        {BARS.map((bar, i) => (
          <path
            key={i}
            d={barPath(bar.x, bar.y, bar.h)}
            fill="#FF7998"
          />
        ))}

        {/* 도트 마커 (24x24 원형) */}
        {DOT_CENTERS.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={12}
            fill="#FEC0CE"
            stroke="#FF7998"
            strokeWidth={3}
          />
        ))}

        {/* 연도 라벨 */}
        {BARS.map((bar, i) => (
          <text
            key={i}
            x={bar.x + 35} y={950}
            textAnchor="middle"
            fontSize={28}
            fontFamily="Paperlogy, sans-serif"
            fill="#5E3535"
          >
            {bar.year}
          </text>
        ))}
      </svg>

      {/* 말풍선 1 — 질러야 할 때! (2029 피크) */}
      <div className={`${styles.bubble} ${styles.bubble1}`}>
        <span className={styles.bubbleText}>질러야 할 때!</span>
      </div>

      {/* 말풍선 2 — 존버해야 할 때! (2032 저점) */}
      <div className={`${styles.bubble} ${styles.bubble2}`}>
        <span className={styles.bubbleText}>존버해야 할 때!</span>
      </div>
      <img src={pinkEffect} alt="" className={styles.pinkEffect} />
    </div>
  );
}
