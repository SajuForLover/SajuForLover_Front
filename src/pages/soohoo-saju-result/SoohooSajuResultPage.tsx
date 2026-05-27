import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SoohooSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "안수호님과 당신은 함께 있을 때 가장 자연스럽고 편안한 에너지를 만들어내는 궁합입니다. 수호님의 밝고 활동적인 성격은 당신의 일상에 활력을 더해주며, 함께 있는 것만으로도 분위기가 한층 가벼워지는 흐름을 가지고 있습니다. 특히 서로의 텐션이 잘 맞아 오래 함께해도 쉽게 지루해지지 않는 관계로 발전하게 됩니다. 밝은 에너지 속에서도 안정감을 느낄 수 있는 좋은 인연입니다. 함께할수록 서로에게 익숙해지고 의지하게 되는 관계입니다. 서로가 가진 긍정적인 기운이 만나 더욱 즐겁고 활기찬 흐름을 만들어가게 됩니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "수호님은 누구와도 쉽게 친해질 만큼 사교성이 뛰어난 타입입니다. 장난기 많고 리액션이 좋아 함께 있을 때 어색한 분위기가 오래가지 않으며, 상대방의 기분까지 자연스럽게 끌어올려 주는 매력을 가지고 있습니다. 특히 당신이 힘들어 보일 때 먼저 눈치채고 분위기를 풀어주려는 다정함도 가지고 있어, 편안한 소통이 가능한 관계를 만들어갑니다. 함께 있을 때 가장 솔직하고 편안한 모습을 보여줄 수 있습니다. 서로 장난을 주고받는 순간에도 자연스럽게 애정과 친밀감이 깊어지는 흐름입니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "수호님은 밝고 생동감 있는 ‘화(火)’의 기운이 강한 성향으로, 주변 분위기를 활기차게 만드는 힘을 가지고 있습니다. 이는 당신의 에너지와 만나 서로 부족한 부분을 자연스럽게 채워주는 흐름을 형성하게 됩니다. 특히 지쳐 있는 순간에도 서로에게 긍정적인 영향을 주며, 함께할수록 좋은 기운이 강해지는 상생형 궁합입니다. 서로의 에너지가 균형을 이루며 긍정적인 흐름을 이어가게 됩니다. 두 사람은 함께할수록 서로의 장점을 더욱 크게 끌어올려 주는 관계입니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람은 활동적인 데이트에서 가장 큰 즐거움을 느끼는 궁합입니다. 맛집 탐방이나 운동, 즉흥적인 외출처럼 몸을 움직이며 함께 시간을 보내는 순간에 친밀도가 더욱 깊어지게 됩니다. 수호님은 좋아하는 사람에게 감정을 솔직하게 표현하는 편이라, 연애 초반부터 설렘이 빠르게 커지는 타입입니다. 함께하는 모든 순간을 즐거운 추억처럼 만들어가는 관계입니다. 평범한 하루조차 특별한 데이트처럼 느껴질 만큼 즐거운 시간을 보내게 됩니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "수호님과 가까워질수록 당신은 사람들과의 관계에서 더욱 밝고 자신감 있는 모습을 보여주게 됩니다. 특유의 긍정적인 에너지와 응원은 당신의 긴장감을 자연스럽게 풀어주며, 힘든 순간에도 금방 다시 웃을 수 있도록 도와줍니다. 또한 함께하는 시간이 많아질수록 일상 자체가 더 활기차고 즐겁게 느껴지는 흐름을 가지게 됩니다. 서로가 서로에게 좋은 자극과 행복을 주는 존재가 되어갑니다. 함께할수록 서로의 삶에 긍정적인 변화와 활력을 더해주는 특별한 관계입니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "좋아하면 솔직하게 표현하는 직진형으로 즐겁게 만들어줍니다." },
  { label: "사주 궁합", score: 70, description: "밝은 에너지로 긍정적인 영향을 주며 좋은 흐름을 이어갑니다." },
  { label: "취향 및 성격", score: 90, description: "활동적인 취미를 함께 즐기며 지루할 틈 없는 케미를 보여줍니다." },
];

export function SoohooSajuResultPage() {
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
          <div className={styles.sajuResultSoohoo} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>안수호</span>
            <span className={styles.ageText}>17세</span>
            <span className={styles.birthText}>2010년 7월 17일, 오후 9시 52분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#호감형</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#외향적</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#테토남</span>
            </div>
          </div>
          <p className={styles.descText}>
            활발하고 에너지가 넘치며 축구를 좋아한다. 몸 쓰는 활동을 즐겨 항상 움직이는 걸 좋아하는{"\n"}
            편이다. 승부욕이 강해 한 번 시작한 일은 끝까지 해내려고 한다. 밝고 시원시원한 성격으로{"\n"}
            주변 분위기를 자연스럽게 띄운다. 누구에게나 호감 가는 성격으로 주변에서 두루 사랑받는 편이다.
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
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/soohoo-photo-shoot")}>
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
