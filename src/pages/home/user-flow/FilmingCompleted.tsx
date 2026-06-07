import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { analyzePhysiognomy } from "@/api/saju";
import styles from "./FilmingCompleted.module.css";
import cameraStyles from "@/styles/Camera.module.css";

// dataURL을 Blob으로 변환하는 헬퍼 함수
function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function FilmingCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filming.tsx에서 보낸 이미지 데이터 가져오기 (없으면 sessionStorage에서 가져옴)
  const capturedImage = location.state?.capturedImage || sessionStorage.getItem("capturedImage");

  const handleRetry = () => {
    navigate("/camera");
  };

  const handleNext = async () => {
    if (!capturedImage) return;

    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem("saju_user_id");
      if (!userId) {
        alert("사용자 정보가 없습니다. 처음부터 다시 시도해주세요.");
        navigate("/");
        return;
      }

      // 1. base64 이미지를 Blob으로 변환
      const imageBlob = dataURLtoBlob(capturedImage);

      // 2. 서버에 관상 분석 요청
      await analyzePhysiognomy(userId, imageBlob);

      // 3. 성공 시 다음 단계(성격 테스트)로 이동
      navigate("/personality", { state: { capturedImage } });
    } catch (error) {
      console.error("관상 분석 요청 실패:", error);
      alert("분석 요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>촬영이 완료 되었어요</h1>
        <p className={styles.notice}>*사진은 저장되지 않습니다</p>
      </div>

      <div className={styles.cameraContainer}>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className={styles.video} />
        ) : (
          <div className={styles.errorMessage}>이미지를 불러올 수 없습니다.</div>
        )}
        <div className={cameraStyles.faceGuideOverlay}>
          <div className={cameraStyles.faceGuideOval} />
          <p className={cameraStyles.faceGuideText}>얼굴을 원 안에 맞춰주세요</p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleRetry} className={styles.captureBtn} disabled={isSubmitting}>
          <span className={styles.captureText}>다시 찍기</span>
        </button>
        <button onClick={handleNext} className={styles.captureBtn} disabled={!capturedImage || isSubmitting}>
          <span className={styles.captureText}>{isSubmitting ? "분석 중..." : "다음"}</span>
        </button>
      </div>
      <div className={styles.star1} />
      <div className={styles.star2} />
      <div className={styles.star3} />
      <div className={styles.star4} />
    </div>
  );
}