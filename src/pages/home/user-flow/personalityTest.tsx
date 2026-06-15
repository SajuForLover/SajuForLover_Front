import { useNavigate, useLocation } from "react-router-dom";
import styles from "@/styles/PersonalityTest.module.css";
import { useState } from "react";

export function PersonalityTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);

  // 이전 페이지에서 넘어온 촬영된 이미지 데이터를 가져옵니다.
  const capturedImage = location.state?.capturedImage;

  const handleChoice = (type: "T" | "F") => {
    console.log("선택된 성향:", type);
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // 2. 마지막 질문 답변 시 결과 생성 로딩 페이지로 이동
      navigate("/result-loading", {
        state: {
          capturedImage,
          answers: newAnswers,
        },
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>성격 테스트 {step}/3</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.scenarioBox}>
          {step === 1 && (
            <p className={styles.scenarioText}>
              새벽 2시, 핸드폰이 울린다.<br />
              좋아하는 사람이 보낸 메세지<br />
              <span className={styles.message}>"갑자기 네 생각나서 연락했어."</span>
            </p>
          )}
          {step === 2 && (
            <p className={styles.scenarioText}>
              좋아하는 사람이<br />
              <span className={styles.message}>"너 왜 이렇게 웃겨"</span>
              라고 했다.
            </p>
          )}
          {step === 3 && (
            <p className={styles.scenarioText}>
              애인이 대학 친구와 단체로<br />
              1박 2일 놀러 간다고 한다.<br />
              <span className={styles.message}>남녀의 비율은 반반이다.</span>
            </p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {step === 1 && (
            <>
              <button className={styles.optionBtn} onClick={() => handleChoice("T")}>
                <span className={styles.optionText}>
                  이 시간에 연락하면<br />내가 좋아할 줄 알았어?
                </span>
              </button>
              <button className={styles.optionBtn} onClick={() => handleChoice("F")}>
                <span className={styles.optionText}>
                  나도 방금<br />네 생각하고 있었는데
                </span>
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button className={styles.optionBtn} onClick={() => handleChoice("T")}>
                <span className={styles.optionText}>
                  웃기려고<br />태어났거든
                </span>
              </button>
              <button className={styles.optionBtn} onClick={() => handleChoice("F")}>
                <span className={styles.optionText}>
                  너 웃으라고<br />한거야
                </span>
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <button className={styles.optionBtn} onClick={() => handleChoice("F")}>
                <span className={styles.optionText}>
                  허락한다
                </span>
              </button>
              <button className={styles.optionBtn} onClick={() => handleChoice("T")}>
                <span className={styles.optionText}>
                  싫다고 한다
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.star1} />
      <div className={styles.star2} />
      <div className={styles.star3} />
      <div className={styles.star4} />
    </div>
  );
}