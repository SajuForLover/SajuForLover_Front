import logoImg from "../../assets/images/Group 88.png";
import styles from "./SajuBoosterResult.module.css";

interface ColorSwatch {
  name: string;
  bg: string;
  textColor: string;
}

interface LuckyFood {
  name: string;
  reason: string;
  image?: string;
}

interface Props {
  luckyColors?: ColorSwatch[];
  luckyNumbers?: string;
  luckyFood?: LuckyFood;
}

const DEFAULT_COLORS: ColorSwatch[] = [
  { name: "Red",   bg: "rgba(255, 71, 74, 0.77)", textColor: "#ffffff" },
  { name: "White", bg: "#ffffff",                  textColor: "#5E3535" },
];

const DEFAULT_FOOD: LuckyFood = {
  name: "매콤한 낙지볶음",
  reason: "(부족한 화 기운 보강)",
};

export function SajuBoosterResult({
  luckyColors = DEFAULT_COLORS,
  luckyNumbers = "2, 7",
  luckyFood = DEFAULT_FOOD,
}: Props) {
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
        <button className={`${styles.tab} ${styles.tabActive}`}>부스터</button>
        <button className={styles.tab}>운의 흐름</button>
      </nav>

      {/* ── 행운의 색상 컬럼 ── */}
      <div className={`${styles.column} ${styles.columnLeft}`}>
        <div className={styles.titleBadge}>
          <span className={styles.titleText}>행운의 색상</span>
        </div>
        <div className={styles.arrow}>▼</div>
        <div className={styles.card}>
          <div className={styles.swatchGroup}>
            {luckyColors.map((swatch, i) => (
              <div
                key={i}
                className={styles.swatch}
                style={{ background: swatch.bg }}
              >
                <span
                  className={styles.swatchLabel}
                  style={{ color: swatch.textColor }}
                >
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 행운의 숫자 컬럼 ── */}
      <div className={`${styles.column} ${styles.columnMiddle}`}>
        <div className={styles.titleBadge}>
          <span className={styles.titleText}>행운의 숫자</span>
        </div>
        <div className={styles.arrow}>▼</div>
        <div className={styles.card}>
          <p className={styles.luckyNumber}>{luckyNumbers}</p>
        </div>
      </div>

      {/* ── 행운의 음식 컬럼 ── */}
      <div className={`${styles.column} ${styles.columnRight}`}>
        <div className={styles.titleBadge}>
          <span className={styles.titleText}>행운의 음식</span>
        </div>
        <div className={styles.arrow}>▼</div>
        <div className={styles.card}>
          {luckyFood.image ? (
            <img
              src={luckyFood.image}
              alt={luckyFood.name}
              className={styles.foodImage}
            />
          ) : (
            <div className={styles.foodImagePlaceholder} />
          )}
          <p className={styles.foodName}>{luckyFood.name}</p>
          <p className={styles.foodReason}>{luckyFood.reason}</p>
        </div>
      </div>
    </div>
  );
}
