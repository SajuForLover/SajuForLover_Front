import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSajuAnalysis } from "@/api/saju";
import styles from "../../../styles/ResultLoading.module.css";

export function ResultLoading() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const capturedImage = location.state?.capturedImage;
  const answers = location.state?.answers;

  useEffect(() => {
    let isMounted = true;
    const userId = localStorage.getItem("saju_user_id");

    async function pollSajuResult() {
      if (!userId) return;

      while (isMounted) {
        try {
          const { saju, isDone } = await fetchSajuAnalysis(userId);
          if (isDone) {
            if (capturedImage) {
              sessionStorage.setItem("capturedImage", capturedImage);
            }
            navigate("/saju-result", {
              state: { capturedImage, answers, sajuData: saju },
            });
            break;
          }
        } catch (err) {
          console.error("사주 분석 결과 조회 실패:", err);
        }
        // 3초마다 폴링
        await new Promise(resolve => setTimeout(resolve, 3000));
        setProgress(p => Math.min(p + 5, 95));
      }
    }

    pollSajuResult();

    return () => { isMounted = false; };
  }, [navigate, capturedImage, answers]);

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
