import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/CoronalResults.module.css";

const MOCK_RESULTS = [
  {
    analysis_id: "result_01",
    physiognomy_result: [
      { part: "이마", desc: "이마가 넓고 매끈한 편이며\n지혜롭고 사고가 깊은 타입" },
      { part: "코", desc: "코가 오똑하고 콧대가 번듯하여\n자존심이 강하고 목표 지향적" },
      { part: "눈", desc: "눈이 맑고 검은자가 뚜렷하여\n집중력이 좋고 감정조절을 잘하는 편" },
      { part: "입", desc: "입술이 도톰하고 입꼬리가 약간 올라가\n긍정적이고 표현력이 풍부한 성향" },
    ],
  },
  {
    analysis_id: "result_02",
    physiognomy_result: [
      { part: "이마", desc: "이마의 선이 부드러워 주변 사람들의\n도움을 많이 받으며 명예를 중시합니다." },
      { part: "코", desc: "코 끝이 둥글고 풍성하여 재물이 마르지 않고\n중년 이후의 삶이 평안합니다." },
      { part: "눈", desc: "눈매가 깊어 통찰력이 뛰어나며\n예술적인 감각이 남다른 관상입니다." },
      { part: "입", desc: "입술의 대칭이 완벽하여 배우자와의 합이 좋고\n가정이 화목할 운명입니다." },
    ],
  },
];

// 피그마 기준 절대 좌표 (1920x1115 프레임)
const FACE_LABELS = [
  { label: "타고난 성격", x: 591, y: 428, w: 163 },
  { label: "명운",       x: 932, y: 378, w: 117 },
  { label: "사업운",     x: 1107, y: 371, w: 117 },
  { label: "결혼운",     x: 1166, y: 461, w: 117 },
  { label: "재물운",     x: 1012, y: 613, w: 117 },
  { label: "대인운",     x: 1076, y: 725, w: 117 },
  { label: "이성운",     x: 991,  y: 852, w: 117 },
  { label: "말년운",     x: 668,  y: 870, w: 117 },
  { label: "건강운",     x: 707,  y: 692, w: 117 },
];

const ANALYSIS_DOTS = [
  { num: "1", x: 921, y: 426 },
  { num: "2", x: 919, y: 653 },
  { num: "3", x: 1077, y: 561 },
  { num: "4", x: 917, y: 763 },
];

const GUIDE_SECTIONS = [
  { label: "상정 上程", top: 318 },
  { label: "중정 中正", top: 508 },
  { label: "하정 下程", top: 699 },
];

const RIGHT_SECTIONS = [304, 465, 632, 802];
const DIVIDER_Y     = [327, 487, 657, 827];

export function CoronalResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result] = useState(
    MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]
  );

  const capturedImage = location.state?.capturedImage;

  useEffect(() => {
    if (!capturedImage) {
      navigate("/camera");
    }
  }, [capturedImage, navigate]);

  return (
    <div className={styles.root}>
      {/* 하단 핑크 그라데이션 오버레이 */}
      <div className={styles.bottomGradient} />

      {/* 타이틀 */}
      <h1 className={styles.resultTitle}>관상 결과지</h1>

      {/* 왼쪽 상중하정 섹션 */}
      {GUIDE_SECTIONS.map((section, i) => (
        <div key={i} className={styles.guideSection} style={{ top: section.top }}>
          <div className={styles.guideBg} />
          <div className={styles.guideTopLine} />
          <span className={styles.guideText}>{section.label}</span>
          <div className={styles.guideBottomLine} />
        </div>
      ))}

      {/* 중앙 얼굴 이미지 */}
      <div className={styles.imageContainer}>
        <img src={capturedImage} alt="분석 이미지" className={styles.capturedImg} />
      </div>

      {/* 얼굴 라벨 버블 */}
      {FACE_LABELS.map((item, i) => (
        <div
          key={i}
          className={styles.faceLabel}
          style={{ left: item.x, top: item.y, width: item.w }}
        >
          {item.label}
        </div>
      ))}

      {/* 분석 번호 도트 */}
      {ANALYSIS_DOTS.map((dot, i) => (
        <div key={i} className={styles.dotGroup} style={{ left: dot.x, top: dot.y }}>
          <div className={styles.dotCircle} />
          <span className={styles.dotNum}>{dot.num}</span>
        </div>
      ))}

      {/* 오른쪽 분석 패널 */}
      {RIGHT_SECTIONS.map((sectionTop, i) => (
        <React.Fragment key={i}>
          <div className={styles.rightDivider} style={{ top: DIVIDER_Y[i] }} />
          <div className={styles.rightBullet} style={{ top: DIVIDER_Y[i] - 5 }} />
          <div className={styles.rightSection} style={{ top: sectionTop }}>
            <p className={styles.rightTitle}>{`${i + 1}. ${result?.physiognomy_result[i].part}`}</p>
            <p className={styles.rightDesc}>{result?.physiognomy_result[i].desc}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
