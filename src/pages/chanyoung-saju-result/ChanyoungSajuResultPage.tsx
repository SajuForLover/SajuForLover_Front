import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChanyoungSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "성찬영님과 당신은 처음에는 거리감이 느껴질 수 있지만, 가까워질수록 강하게 끌리는 궁합입니다. 찬영님의 까칠하고 무심한 분위기는 쉽게 다가가기 어렵게 보일 수 있지만, 그 안에 숨겨진 다정함과 반전 매력이 관계를 더욱 특별하게 만들어줍니다. 서로를 알아갈수록 점점 더 깊이 빠져드는 흐름을 가진 인연입니다. 함께할수록 서로에게만 보이는 특별한 모습이 많아지는 관계입니다. 처음보다 시간이 지날수록 더욱 강한 애정과 유대감을 느끼게 되는 궁합입니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "찬영님은 낯선 사람에게는 선을 두는 편이지만, 가까워진 사람에게는 누구보다 편안하고 장난기 많은 모습을 보여주는 타입입니다. 특히 애인에게만 드러나는 애교와 다정함은 관계의 만족도를 크게 높여주는 요소가 됩니다. 평소에는 티격태격해도 서로의 감정을 빠르게 이해하며, 은근한 배려가 끊이지 않는 관계를 만들어갑니다. 둘만 있을 때 더욱 솔직하고 편안한 분위기가 형성됩니다. 서로에게만 보여주는 특별한 다정함이 관계를 더욱 깊고 단단하게 만들어줍니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "찬영님은 강한 개성과 카리스마를 가진 ‘금(金)’의 기운이 강한 성향입니다. 이는 당신의 에너지와 만나 서로의 부족한 부분을 보완해주는 균형 잡힌 흐름을 형성하게 됩니다. 특히 감정적인 부분에서는 서로에게 새로운 시각과 자극을 주며, 함께할수록 관계의 깊이가 더욱 단단해지는 상생형 궁합입니다. 서로의 다른 매력이 강한 시너지를 만들어내는 관계입니다. 함께 있을수록 서로의 장점이 더욱 뚜렷하게 드러나는 흐름을 가지게 됩니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람은 시끄럽고 화려한 데이트보다 둘만의 분위기를 즐기는 연애 스타일에 가깝습니다. 찬영님은 좋아하는 사람에게만 특별한 모습을 보여주는 타입이라, 관계가 깊어질수록 애정 표현과 스킨십이 자연스럽게 늘어나는 흐름을 가지게 됩니다. 처음보다 시간이 지날수록 더 달달해지는 ‘반전형 연애’를 즐기게 되는 궁합입니다. 함께하는 시간이 많아질수록 서로에 대한 애정이 더 커지게 됩니다. 사소한 순간에도 서로에게 설렘을 느끼며 오래도록 애정을 유지하게 되는 관계입니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "찬영님과 가까워질수록 당신은 감정 표현이 더욱 솔직해지고, 관계 속에서 안정감을 느끼게 되는 변화를 경험하게 됩니다. 평소에는 무심해 보여도 중요한 순간마다 확실하게 챙겨주는 모습 덕분에 신뢰가 깊어지며, 서로에게 가장 편안한 사람이 되어가게 됩니다. 함께할수록 서로의 숨겨진 매력을 끌어내주는 특별한 관계입니다. 서로가 서로에게 가장 큰 설렘과 안정감을 동시에 주는 존재가 됩니다. 시간이 흐를수록 서로를 향한 애정과 신뢰가 더욱 깊어지는 흐름을 보여줍니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "무심한 듯하지만 애인에게는 애교와 다정함을 보여주는 반전형입니다." },
  { label: "사주 궁합", score: 70, description: "겉과 속의 균형이 잘 맞아 서로의 새로운 매력을 느끼게 되는 궁합입니다." },
  { label: "취향 및 성격", score: 90, description: "함께하는 시간을 모두 중요하게 생각하며 깊은 관계를 만들어갑니다." },
];

export function ChanyoungSajuResultPage() {
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
          <div className={styles.sajuResultChanyoung} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>성찬영</span>
            <span className={styles.ageText}>19세</span>
            <span className={styles.birthText}>2008년 3월 12일, 오후 12시 30분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#츤데레</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#까칠한</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#반전매력</span>
            </div>
          </div>
          <p className={styles.descText}>
            쉽게 다가가기 어려운 분위기를 가진 타입이다. 낯선 사람에게는 선을 확실히 두는 편이다.{"\n"}
            겉으로는 무심하고 까칠해 보인다는 말을 자주 듣는다. 하지만 가까워질수록 장난기 많고{"\n"}
            편안한 모습을 보여준다. 은근히 사람을 잘 챙겨 알수록 반전 매력이 큰 스타일이다.
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
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/chanyoung-photo-shoot")}>
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
