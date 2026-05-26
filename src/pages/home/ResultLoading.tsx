import React, { useState, useEffect } from "react";
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
        // 로딩 완료 후 결과 페이지로 이동
        navigate("/results", {
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
