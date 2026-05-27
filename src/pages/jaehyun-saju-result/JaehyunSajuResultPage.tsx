import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JaehyunSajuResultPage.module.css";

const DESIGN_W = 1920;

const DETAIL_SECTIONS = [
  {
    title: "운명적 인연 및 종합 합치도",
    body: "김재현님과 당신은 잔잔하지만 오래도록 깊어지는 관계를 만들어가는 궁합입니다. 재현님의 차분하고 성실한 분위기는 당신에게 안정감을 주며, 함께 있을 때 마음이 편안해지는 흐름을 형성하게 됩니다. 화려하게 표현하지 않아도 서로의 존재만으로 충분한 만족감을 느낄 수 있는 관계입니다. 시간이 지날수록 서로에게 더 깊이 스며드는 인연입니다. 서로의 일상 속에 자연스럽게 자리 잡으며 오래도록 편안한 관계를 이어가게 됩니다. 함께할수록 서로에게 없어서는 안 될 존재로 자리하게 되는 특별한 궁합입니다.",
  },
  {
    title: "성격 및 소통 시너지",
    body: "재현님은 말수는 적지만 상대를 세심하게 배려하는 타입입니다. 대화를 많이 하지 않아도 상대의 감정을 잘 살피며, 필요한 순간에는 묵묵하게 곁을 지켜주는 안정적인 매력을 가지고 있습니다. 특히 차분한 태도와 신뢰감 있는 분위기 덕분에 함께 있을 때 자연스럽게 마음이 편안해지는 소통이 가능합니다. 서로에게 부담 없이 기대며 안정감을 느끼게 되는 관계입니다. 말보다 행동으로 서로의 진심을 확인하게 되는 깊은 소통의 흐름을 보여줍니다. 함께 있을수록 서로를 더 잘 이해하게 되는 편안한 관계로 발전합니다.",
  },
  {
    title: "사주 오행 및 에너지 보완",
    body: "재현님은 안정적이고 단단한 ‘토(土)’의 기운이 강한 성향으로, 흔들림 없는 에너지를 가지고 있습니다. 이는 당신의 감정을 부드럽게 잡아주며, 함께 있을 때 서로의 균형을 맞춰주는 흐름을 형성하게 됩니다. 특히 장기적으로 좋은 영향을 주고받을 가능성이 높은 상생형 궁합입니다. 함께할수록 서로에게 든든한 버팀목 같은 존재가 되어갑니다. 서로의 차분한 에너지가 만나 안정적이고 편안한 관계를 만들어가게 됩니다. 두 사람은 함께할수록 감정적으로 더욱 안정된 흐름을 유지하게 됩니다.",
  },
  {
    title: "연애 스타일 및 데이트 궁합",
    body: "두 사람은 시끄럽고 화려한 데이트보다 편안한 시간을 더 소중하게 여기는 궁합입니다. 조용한 카페나 산책처럼 서로에게 집중할 수 있는 공간에서 더욱 깊은 친밀감을 느끼게 됩니다. 재현님은 표현은 적어도 행동으로 마음을 보여주는 스타일이라, 오래 함께할수록 더 큰 다정함을 느끼게 됩니다. 편안함과 설렘이 자연스럽게 공존하는 관계를 만들어갑니다. 특별한 이벤트보다 함께 보내는 평범한 시간이 더 소중하게 기억되는 궁합입니다. 서로의 일상 속 작은 순간들까지 특별한 추억으로 남게 되는 관계입니다.",
  },
  {
    title: "관계 성장 및 특별 버프",
    body: "재현님과 가까워질수록 당신은 감정적으로 더욱 안정되고 차분해지는 변화를 경험하게 됩니다. 그의 성실하고 묵직한 태도는 당신에게 신뢰감을 주며, 힘든 순간에도 쉽게 흔들리지 않도록 중심을 잡아주는 역할을 하게 됩니다. 함께할수록 서로에게 의지할 수 있는 관계로 성장하게 됩니다. 서로가 서로의 가장 편안한 안식처가 되어가는 흐름입니다. 함께하는 시간이 길어질수록 더욱 단단하고 깊은 신뢰를 쌓아가게 됩니다. 서로가 서로에게 가장 든든한 힘과 위로가 되어주는 특별한 관계입니다.",
  },
];

const SCORE_ITEMS = [
  { label: "총 궁합점수", score: 80 },
  { label: "연애스타일", score: 80, description: "서로의 속도를 존중하며 부담 없이 편안한 관계를 만들어갑니다." },
  { label: "사주 궁합", score: 70, description: "차분한 성향으로 서로를 안정시켜주며 균형 잡힌 관계를 유지합니다." },
  { label: "취향 및 성격", score: 90, description: "조용한 시간을 함께 즐기며 편안하고 잔잔한 케미를 보여줌" },
];

export function JaehyunSajuResultPage() {
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
          <div className={styles.sajuResultJaehyun} />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>김재현</span>
            <span className={styles.ageText}>18세</span>
            <span className={styles.birthText}>2009년 5월 8일, 오전 11시 10분</span>
          </div>
          <div className={styles.tagRow}>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#차분함</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#모범생</span>
            </div>
            <div className={styles.tagBox}>
              <span className={styles.tagText}>#에겐남</span>
            </div>
          </div>
          <p className={styles.descText}>
            말수가 적고 차분한 분위기의 모범생 타입이다. 수업에 집중하고 맡은 일은 끝까지 해내는 {"\n"}
            성실함이 있다. 평소에는 조용하지만 할 말은 확실하게 하는 편이다. 안정감 있는 분위기와 {"\n"}
            똑부러진 모습으로 존재감을 드러낸다. 학교에서도 은근히 인기 많고 신뢰를 받는 스타일이다.
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
          <button type="button" className={styles.photoShootButton} onClick={() => navigate("/jaehyun-photo-shoot")}>
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
