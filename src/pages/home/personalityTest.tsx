import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PersonalityTest.module.css";

export function PersonalityTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.capturedImage; // FilmingCompleted에서 전달받은 이미지

  const handleChoice = (type: "T" | "F") => {
    console.log("선택된 성향:", type);
    // 다음 질문(2/3)으로 이동하는 로직 (라우터 설정에 따라 변경 가능)
    navigate("/results", { state: { capturedImage: capturedImage } }); // CoronalResults 페이지로 이동하며 이미지 전달
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>성격 테스트 1/3</h1>
        <p className={styles.notice}>*솔직하게 답변할수록 정확한 결과가 나옵니다</p>
      </div>

      <div className={styles.content}>
        <div className={styles.scenarioBox}>
          <p className={styles.scenarioText}>
            새벽 2시, 핸드폰이 울린다.<br />
            좋아하는 사람이 보낸 메세지<br />
            <span className={styles.message}>"갑자기 네 생각나서 연락했어."</span>
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.optionBtn} onClick={() => handleChoice("T")}>
            <span className={styles.optionText}>
              이 시간에 연락하면 내가 좋아할 줄 알았어?
            </span>
          </button>
          <button className={styles.optionBtn} onClick={() => handleChoice("F")}>
            <span className={styles.optionText}>
              나도 방금 네 생각하고 있었는데
            </span>
          </button>
        </div>
      </div>

      {/* 배경 장식 요소 */}
      <div className={styles.star1} />
      <div className={styles.star2} />
    </div>
  );
}