import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HaramSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "최하람님과 당신은 함께 있을 때 가장 밝은 에너지를 만들어내는 특별한 인연입니다. 하람님의 활발하고 긍정적인 기운은 당신의 일상에 새로운 활력을 불어넣으며, 지쳐 있는 순간에도 자연스럽게 웃게 만드는 힘을 가지고 있습니다. 서로 다른 성향을 가지고 있더라도 빠르게 균형을 맞춰가며, 함께할수록 더 편안하고 익숙한 관계로 발전하게 됩니다. 특히 서로의 감정을 자연스럽게 끌어올려 주는 흐름이 강해, 함께 있을 때 행복감과 만족도가 크게 높아지는 궁합입니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "하람님은 특유의 밝은 리액션과 친화력으로 사람들과 쉽게 가까워지는 타입입니다. 당신이 조용하거나 감정을 잘 표현하지 않는 성격이어도 먼저 다가와 분위기를 편안하게 만들어주며, 작은 변화도 빠르게 눈치채고 세심하게 챙겨주는 모습을 보여줍니다. 또한 장난기 많은 성격 덕분에 두 사람 사이에 어색한 분위기가 오래가지 않으며, 사소한 대화만으로도 웃음이 끊이지 않는 관계를 만들어갑니다. 서로 함께 있을 때 가장 자연스럽고 솔직한 모습을 드러낼 수 있는 궁합입니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "하람님은 따뜻하고 생기 넘치는 ‘화(火)’의 기운이 강한 성향으로, 주변 분위기를 밝게 만드는 힘을 가지고 있습니다. 이는 당신의 안정적이고 차분한 에너지와 만나 서로 부족한 부분을 자연스럽게 채워주는 상생 구조를 형성하게 됩니다. 특히 당신이 쉽게 지치거나 무기력해질 때 하람님의 긍정적인 기운이 좋은 자극이 되어주며, 반대로 하람님 역시 당신에게서 안정감과 신뢰를 얻게 됩니다. 두 사람은 함께할수록 서로의 장점을 더욱 크게 끌어올리는 좋은 흐름을 가지고 있습니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람은 평범한 하루도 특별한 추억처럼 만드는 밝은 연애 스타일을 가지고 있습니다. 맛집 탐방이나 즉흥적인 외출처럼 활동적인 데이트를 즐기며, 함께 있는 것만으로도 자연스럽게 웃음이 많아지는 관계를 만들어갑니다. 특히 하람님은 좋아하는 사람과의 시간을 누구보다 소중하게 생각하는 타입이라, 작은 순간 하나까지 특별하게 기억하려는 성향이 강합니다. 설렘과 편안함이 오래 유지되는 ‘비타민형 연애’ 궁합이라고 볼 수 있습니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "하람님과 가까워질수록 당신은 사람들과의 관계에서 더욱 자신감을 얻고 표현력이 좋아지는 변화를 경험하게 됩니다. 하람님의 밝은 에너지와 긍정적인 응원은 당신의 긴장감을 자연스럽게 풀어주며, 새로운 도전에도 겁내지 않도록 좋은 영향을 주게 됩니다. 또한 사소한 일에도 리액션과 칭찬을 아끼지 않는 성격 덕분에, 함께할수록 자존감과 행복감이 꾸준히 상승하는 흐름을 가지게 됩니다. 하람님은 당신의 일상을 더 즐겁고 활기차게 만들어주는 특별한 존재가 되어줄 가능성이 높습니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "망설임 없이 감정을 표현하는 솔직한 직진형입니다." },
  { label: "사주 궁합", score: 70, description: "서로의 열정을 북돋워 주는 밝은 기운이 가득합니다." },
  { label: "취향 및 성격", score: 90, description: "함께 있으면 모든 일이 즐거워지는 환상의 티키타카를 자랑합니다." },
];

export function HaramSajuResultPage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_W);

  useLayoutEffect(() => {
    function update() {
      setScale(window.innerWidth / DESIGN_W);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navigate = useNavigate();
  const cssVars = { "--scale": scale } as CSSProperties;

  return (
    <div className={styles.viewport}>
      <div className={styles.scrollTrack} style={cssVars}>
        <div className={styles.canvas} style={cssVars}>
          <div className={styles.sajuResultHaram} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>최하람</span>
            <span className={styles.ageText}>18세</span>
            <span className={styles.birthText}>2009년 9월 8일, 오후 3시 20분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#활발한</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#비타민에너지</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#분위기메이커</span>
            </div>
          </div>
          <p className={styles.descText}>
            매우 활발하고 에너지가 넘쳐 학교의 분위기 메이커 역할을 한다. 낯가림 없이 누구와도 금방{"\n"}
            친해지는 성격이다. 장난기 많고 리액션이 좋아 주변을 자주 웃게 만든다. 밝고 긍정적인 에너지로{"\n"}
            사람들에게 좋은 인상을 남긴다. 주변에 항상 사람이 끊이지 않을 만큼 인기가 많은 타입이다.
          </p>
          <div className={styles.scoreGroup}>
            {SCORE_ITEMS.map(({ label, score, description }) => (
              <div key={label} className={styles.scoreRow}>
                <div className={styles.scoreButton}>
                  <span className={styles.scoreButtonText}>{label}</span>
                </div>
                <span className={styles.scoreValue}>{score}</span>
                {description && (
                  <div className={styles.descBox}>
                    <span className={styles.descBoxText}>{description}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/haram-photo-shoot")}>
            <span className={styles.photoShootButtonText}>네컷사진 찍기</span>
          </button>
          <div className={styles.sectionGroup}>
            {DETAIL_SECTIONS.map(({ title, body }) => (
              <div key={title} className={styles.section}>
                <div className={styles.fateBox}>
                  <span className={styles.fateBoxText}>{title}</span>
                </div>
                <div className={styles.fateDescBox}>
                  <p className={styles.fateDescText}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
