import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NayeonSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "곽나연님과 당신은 시간이 지날수록 서로의 진짜 매력을 알아가게 되는 깊은 인연입니다. 처음에는 차분하고 도도한 분위기 때문에 거리감이 느껴질 수 있지만, 가까워질수록 누구보다 편안하고 안정적인 관계를 만들어가게 됩니다. 특히 나연님의 우아하고 침착한 기운은 당신의 감정을 자연스럽게 정리해주며, 함께 있을 때 마음이 편안해지는 특별한 흐름을 형성합니다. 서로 쉽게 질리지 않고 오래도록 서로에게 끌리게 되는 궁합입니다. 서로의 존재만으로도 안정감을 느끼게 되는 관계로 발전할 가능성이 높습니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "나연님은 감정을 크게 드러내지 않는 타입이지만, 가까운 사람에게는 은근히 다정하고 세심한 모습을 보여줍니다. 당신 역시 그녀의 무심한 듯한 배려 속에서 특별함을 느끼게 되며, 둘만의 조용하고 깊은 대화가 자연스럽게 이어지게 됩니다. 화려한 표현은 적어도 서로의 기분을 빠르게 눈치채는 편이라, 말하지 않아도 편안함을 느끼는 안정적인 소통이 가능합니다. 서로에게 부담 없이 기댈 수 있는 관계를 만들어가는 궁합입니다. 함께 있을수록 서로만 아는 특별한 분위기와 유대감이 깊어지게 됩니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "나연님은 차분하고 안정적인 ‘수(水)’의 기운이 강한 성향으로, 상대의 감정을 부드럽게 감싸주는 힘을 가지고 있습니다. 이는 당신의 에너지와 만나 서로 부족한 부분을 자연스럽게 보완해주는 흐름을 형성하게 됩니다. 특히 감정 기복이 심한 순간에도 나연님의 침착함이 중심을 잡아주며, 함께 있을수록 서로의 마음이 안정되는 긍정적인 시너지를 만들어냅니다. 두 사람은 오래 함께할수록 더 단단해지는 상생형 궁합입니다. 서로의 에너지가 부드럽게 순환하며 좋은 운의 흐름을 이어가게 됩니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람은 시끄럽고 화려한 장소보다 분위기 있는 공간에서 더 큰 행복을 느끼는 연애 스타일입니다. 조용한 카페나 한적한 산책처럼 서로에게 집중할 수 있는 데이트에서 친밀도가 더욱 깊어지게 됩니다. 나연님은 좋아하는 사람에게 쉽게 마음을 열지는 않지만, 한 번 가까워지면 누구보다 오래 깊게 관계를 이어가는 타입입니다. 천천히 스며들 듯 가까워지는 ‘잔잔한 설렘형 연애’를 즐기게 되는 궁합입니다. 사소한 순간 하나까지 오래 기억에 남는 특별한 추억으로 쌓이게 됩니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "나연님과 가까워질수록 당신은 감정적으로 더 안정되고 여유로운 사람이 되어가는 흐름을 경험하게 됩니다. 그녀의 차분한 말투와 침착한 태도는 당신의 긴장감을 자연스럽게 풀어주며, 복잡했던 생각도 편안하게 정리할 수 있도록 도와줍니다. 또한 나연님 특유의 은근한 다정함은 당신에게 큰 위로와 안정감을 주어, 함께 있을 때 가장 편안한 자신을 보여줄 수 있게 만들어줍니다. 서로가 서로에게 가장 믿을 수 있는 안식처 같은 존재가 되어가는 관계입니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "표현은 적지만 한번 마음을 주면 깊고 진중하게 관계를 이어갑니다." },
  { label: "사주 궁합", score: 70, description: "차분하고 안정적인 성향으로 서로에게 편안함을 주는 궁합입니다." },
  { label: "취향 및 성격", score: 90, description: "조용하고 분위기 있는 시간을 즐기며 깊이 있는 관계를 만들어갑니다." },
];

export function NayeonSajuResultPage() {
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
          <div className={styles.sajuResultNayeon} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>곽나연</span>
            <span className={styles.ageText}>19세</span>
            <span className={styles.birthText}>2008년 1월 30일, 오전 6시 00분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#도도한</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#우아함</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#은근다정</span>
            </div>
          </div>
          <p className={styles.descText}>
            차분하고 도도한 분위기를 가진 타입이다. 혼자 있는 시간을 즐기며 자신만의 취향이{"\n"}
            확실한 편이다. 사람들 앞에서 쉽게 감정을 드러내지는 않는다. 무심한 듯 보이지만 주변의 {"\n"}
            작은 변화도 잘 알아차린다. 은근한 카리스마로 자연스럽게 존재감을 드러내는 스타일이다.
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
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/nayeon-photo-shoot")}>
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
