import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./YoonSeaSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "윤세아님과 당신은 '단단한 대지 위에 피어난 고고한 꽃'과 같은 형국으로, 시간이 흐를수록 서로의 진가를 알아보는 깊은 인연입니다. 17살의 풋풋함 속에 숨겨진 세아님의 성숙함이 당신의 듬직한 포용력과 만나 안정적인 감정의 토대를 형성하게 됩니다. 겉으로는 차분해 보이지만 속은 알찬 채영님의 기운이 당신의 삶에 활력을 불어넣으며, 서로가 서로를 완성해가는 완벽한 파트너십을 보여줍니다. 전체적인 합치도는 매우 높으며, 특히 정신적인 교감에서 오는 만족도가 압도적인 궁합입니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "내향적이고 차분한 세아님은 자신의 속마음을 쉽게 드러내지 않지만, 리더십 있는 당신 앞에서는 무장해제되어 숨겨진 '에겐(애교)'을 마음껏 발산하게 됩니다. 당신의 묵직한 경청 태도는 세아님이 학교에서 느꼈던 긴장감을 해소해 주는 유일한 안식처가 되어주며, 그녀는 당신에게만 특별한 다정함을 선사할 것입니다. 두 사람의 대화는 화려하지 않아도 깊이가 있으며, 말하지 않아도 눈빛만으로 서로의 기분을 파악하는 텔레파시 같은 소통이 가능합니다. 세아님의 섬세한 배려와 당신의 흔들림 없는 태도가 만나 오해 없는 건강한 관계를 유지할 수 있습니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "2008년 가을에 태어난 세아님은 강한 '금(金)'의 기운을 품고 있어, 당신의 '토(土)' 기운과 만나면 '토생금(土生金)'의 상생 구조를 이룹니다. 이는 당신의 에너지가 세아님을 빛나게 만들어주는 형상으로, 당신과 함께 있을 때 채영님의 매력이 가장 극대화된다는 것을 의미합니다. 특히 당신에게 부족할 수 있는 차가운 이성과 섬세한 감각을 세아님이 보완해주어, 함께 있을 때 비로소 완벽한 오행의 균형을 이루게 됩니다. 서로의 기운이 충돌 없이 부드럽게 순환하므로, 함께 있는 것만으로도 운대가 상승하는 긍정적인 시너지가 발생합니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람의 데이트는 시끄러운 장소보다는 둘만의 온기가 느껴지는 정적인 공간에서 가장 큰 행복을 느낄 수 있는 궁합입니다. 세아님의 내향적인 성향을 배려한 한적한 미술관 데이트나 조용한 심야 산책은 서로의 친밀도를 급격히 높여주는 최고의 선택이 될 것입니다. 학교에서 인기가 많아 주변의 시선이 많은 세아님에게, 당신과의 비밀스럽고 소중한 시간은 무엇과도 바꿀 수 없는 특별한 힐링 타임이 됩니다. 천천히 스며드는 연애 스타일을 지향하되, 한 번 마음을 열면 누구보다 뜨겁게 서로를 아끼는 '슬로우 번(Slow Burn)'형 연애를 즐기게 됩니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "세아님과의 관계가 깊어질수록 당신의 '정서적 안정감' 스탯이 폭발적으로 상승하며, 일상의 스트레스를 관리하는 능력이 탁월해집니다. 세아님은 당신에게 '행운의 여신' 역할을 하여, 그녀와 대화를 나눈 날에는 업무나 공부에서의 집중력이 평소보다 20% 이상 향상되는 효과를 얻을 수 있습니다. 또한 세아님의 차분한 기운은 당신의 고집을 부드럽게 완화해주어 대인관계 전반에서 더욱 유연한 사람으로 거듭나게 도와줍니다. 그녀를 위해 준비한 작은 선물이나 따뜻한 응원의 한마디는 당신의 '매력 지수'를 높여주는 강력한 촉매제가 될 것입니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "각자를 존중하는 연애 스타일이 매우 잘 맞습니다." },
  { label: "사주 궁합", score: 70, description: "서로의 부족한 부분을 채워주며 원만한 관계를 유지합니다." },
  { label: "취향 및 성격", score: 90, description: "서로가 내향적이지만 친하면 잘 대하는 것이 비슷하여 잘 맞습니다." },
];

export function YoonSeaSajuResultPage() {
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
          <div className={styles.sajuResultYoonSea} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>윤세아</span>
            <span className={styles.ageText}>17세</span>
            <span className={styles.birthText}>2010년 10월 25일, 오후 3시 57분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#차분함</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#내향적</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#에겐녀</span>
            </div>
          </div>
          <p className={styles.descText}>
            현재 고3으로 조금 내향적이지만 친해지면 매우 잘 대해준다. 처음에는 차가워 보인다는 말을{"\n"}
            자주 듣는 편이다. 하지만 가까워질수록 장난기 많고 편안한 모습을 보여준다. 센스 있고 분위기{"\n"}
            있는 스타일로 은근한 인기가 많다. 학교에서도 두루 잘 어울려 친구가 많은 편이다.
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
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/yoon-sea-photo-shoot")}>
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
