import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/CoronalResults.module.css";

// 1. Mock 데이터 정의 (명세서 기반)
const MOCK_RESULTS = [
  {
    analysis_id: "result_01",
    physiognomy_result: [
      { part: "이마", label: "명운", desc: "이마가 넓고 매끈한 편이며 지혜롭고 사고가 깊은 타입입니다. 초년운이 강합니다.", top: "25%", left: "50%" },
      { part: "눈", label: "사회운", desc: "눈이 맑고 검은자가 뚜렷하여 집중력이 좋고 감정조절을 잘하는 편입니다.", top: "42%", left: "35%" },
      { part: "코", label: "재물운", desc: "코가 오뚝하고 콧대가 번듯하여 자존심이 강하고 목표 지향적인 성향을 가집니다.", top: "55%", left: "50%" },
      { part: "입", label: "자식운", desc: "입술이 도톰하고 입꼬리가 올라가 긍정적이고 표현력이 풍부한 성향입니다.", top: "75%", left: "50%" }
    ],
    description: "전체적으로 균형이 잡혀 있어 대인관계가 원만하고 말년운이 훌륭한 관상입니다.",
    saju_result: {
      description: "태어난 일시에 잠재된 기운이 강해 스스로 결정을 내릴 때 가장 빛나는 유형입니다."
    }
  },
  {
    analysis_id: "result_02",
    physiognomy_result: [
      { part: "이마", label: "관운", desc: "이마의 선이 부드러워 주변 사람들의 도움을 많이 받으며 명예를 중시합니다.", top: "25%", left: "50%" },
      { part: "눈", label: "지혜", desc: "눈매가 깊어 통찰력이 뛰어나며 예술적인 감각이 남다른 관상입니다.", top: "42%", left: "65%" },
      { part: "코", label: "사업운", desc: "코 끝이 둥글고 풍성하여 재물이 마르지 않고 중년 이후의 삶이 평안합니다.", top: "55%", left: "50%" },
      { part: "입", label: "애정운", desc: "입술의 대칭이 완벽하여 배우자와의 합이 좋고 가정이 화목할 운명입니다.", top: "75%", left: "50%" }
    ],
    description: "섬세한 감각과 강한 직관력을 가지고 있어 전문 분야에서 성공할 가능성이 높은 관상입니다.",
    saju_result: {
      description: "부드러움 속에 강인함을 감추고 있는 외유내강형 사주를 가지고 태어났습니다."
    }
  }
];

export function CoronalResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<typeof MOCK_RESULTS[0] | null>(null);
  const [loadingText, setLoadingText] = useState("AI가 얼굴 윤곽을 분석 중입니다...");

  // Camera.tsx에서 전달받은 이미지 데이터 (없을 경우를 대비해 예외처리)
  const capturedImage = location.state?.capturedImage;

  useEffect(() => {
    // 1. 이미지 데이터가 없으면 뒤로가기 처리
    if (!capturedImage) {
      alert("분석할 이미지가 없습니다.");
      navigate("/camera");
      return;
    }

    // 2. 가짜 로딩 프로세스
    const loadingInterval = setInterval(() => {
      const texts = [
        "AI가 얼굴 윤곽을 분석 중입니다...",
        "사주 오행 데이터를 결합하고 있습니다...",
        "관상 포인트를 추출하는 중입니다...",
        "분석 결과지를 생성하고 있습니다..."
      ];
      setLoadingText(prev => {
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 800);

    const timer = setTimeout(() => {
      clearInterval(loadingInterval);
      // 랜덤 결과 선택
      const randomIndex = Math.floor(Math.random() * MOCK_RESULTS.length);
      setResult(MOCK_RESULTS[randomIndex]);
      setIsLoading(false);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(loadingInterval);
    };
  }, [capturedImage, navigate]);

  if (isLoading) {
    return (
      <div className={styles.loadingRoot}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>{loadingText}</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.resultTitle}>관성 결과지</h1>
      <div className={styles.titleLine} />
      <div className={styles.titleLine} />
      <div className={styles.titleLine} />
      <div className={styles.titleLine} />

      <div className={styles.mainContent}>
        {/* 왼쪽: 얼굴 부위 구분 가이드 */}
        <div className={styles.leftGuide}>
          <div className={styles.guideItem}><span>상정 上程</span><div className={styles.line} /></div>
          <div className={styles.guideItem}><span>중정 中正</span><div className={styles.line} /></div>
          <div className={styles.guideItem}><span>하정 下程</span><div className={styles.line} /></div>
        </div>

        {/* 중앙: 이미지 및 포인트 오버레이 */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img src={capturedImage} alt="분석 이미지" className={styles.capturedImg} />
            {result?.physiognomy_result.map((item, idx) => (
              <div 
                key={idx} 
                className={styles.point} 
                style={{ top: item.top, left: item.left }}
              >
                <div className={styles.pointMarker}>{idx + 1}</div>
                <div className={styles.pointLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 상세 분석 결과 카드 */}
        <div className={styles.resultDetails}>
          {result?.physiognomy_result.map((item, idx) => (
            <div key={idx} className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIndex}>{idx + 1}</span>
                <span className={styles.cardTitle}>{item.part} ({item.label})</span>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 하단: 사주 총평 섹션 */}
      <div className={styles.summarySection}>
        <div className={styles.summaryBox}>
          <h3>종합 분석 및 사주 총평</h3>
          <p className={styles.totalDesc}>{result?.description}</p>
          <div className={styles.divider} />
          <p className={styles.sajuDesc}>{result?.saju_result.description}</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.retryBtn} onClick={() => navigate("/camera")}>
          다시 촬영하기
        </button>
        <button className={styles.nextBtn} onClick={() => navigate("/")}>
          홈으로 이동
        </button>
      </div>
    </div>
  );
}