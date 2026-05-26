import logoImg from "../../assets/images/Group 88.png";
import styles from "./SajuFortuneResult.module.css";

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

// SVG 스무스 커브 path 생성
function smoothPath(pts: [number, number][]): string {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const cpx = (px + cx) / 2;
    d += ` C ${cpx},${py} ${cpx},${cy} ${cx},${cy}`;
  }
  return d;
}

export function SajuFortuneResult() {
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
        <button className={styles.tab}>캐릭터</button>
        <button className={styles.tab}>능력치</button>
        <button className={styles.tab}>라이프</button>
        <button className={styles.tab}>부스터</button>
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
          fill="rgba(255,255,255,0.8)" rx={50}
        />

        {/* 수평 격자선 */}
        {GRID_YS.map((y, i) => (
          <line
            key={i}
            x1={178} y1={y} x2={1733} y2={y}
            stroke="rgba(200,160,175,0.35)"
            strokeWidth={1}
            strokeDasharray={i < GRID_YS.length - 1 ? "5 5" : undefined}
          />
        ))}

        {/* 바 */}
        {BARS.map((bar, i) => (
          <rect
            key={i}
            x={bar.x} y={bar.y} width={70} height={bar.h}
            fill="rgba(255, 150, 180, 0.75)"
            rx={8}
          />
        ))}

        {/* 꺾은선 그래프 */}
        <path
          d={smoothPath(DOT_CENTERS)}
          fill="none"
          stroke="#FF78A6"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* 도트 마커 (24x24 사각형) */}
        {DOT_CENTERS.map(([cx, cy], i) => (
          <rect
            key={i}
            x={cx - 12} y={cy - 12} width={24} height={24}
            fill="#FF78A6"
            rx={4}
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
    </div>
  );
}
