import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ResultLoading.module.css";

export function ResultLoading() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  // 이전 페이지(PersonalityTest)에서 전달받은 데이터
  const capturedImage = location.state?.capturedImage;
  const answers = location.state?.answers;

  useEffect(() => {
    const DURATION = 3000; // 3초 동안 로딩
    const INTERVAL = 50;   // 50ms마다 업데이트
    const STEPS = DURATION / INTERVAL;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = (step / STEPS) * 100;
      setProgress(nextProgress);

      if (step >= STEPS) {
        clearInterval(timer);
        // capturedImage를 sessionStorage에 저장해두면 스크롤 최하단 관상 결과에서 재사용
        if (capturedImage) {
          sessionStorage.setItem("capturedImage", capturedImage);
        }
        navigate("/yoon-sea-saju-result", {
          state: { capturedImage, answers },
        });
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>결과를 생성 중이예요</h1>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
