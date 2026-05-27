import { useNavigate, useLocation } from "react-router-dom";
import styles from "./FilmingCompleted.module.css";

export function FilmingCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Filming.tsx에서 보낸 이미지 데이터 가져오기
  const capturedImage = location.state?.capturedImage;

  const handleRetry = () => {
    navigate("/camera");
  };

  const handleNext = () => {
    // 이미지 데이터를 다음 페이지인 성격 테스트로 전달해야 합니다.
    navigate("/personality", { state: { capturedImage } });
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
        <div className={styles.faceGuide} />
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleRetry} className={styles.captureBtn}>
          <span className={styles.captureText}>다시 찍기</span>
        </button>
        <button onClick={handleNext} className={styles.captureBtn} disabled={!capturedImage}>
          <span className={styles.captureText}>다음</span>
        </button>
      </div>
      <div className={styles.star1} />
      <div className={styles.star2} />
      <div className={styles.star3} />
      <div className={styles.star4} />
    </div>
  );
}