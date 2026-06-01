import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Camera.module.css";

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 카메라 시작
  useEffect(() => {
    async function startCamera() {
      // 브라우저가 카메라 API를 지원하는지 확인
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("이 브라우저나 환경에서는 카메라를 지원하지 않습니다. (HTTPS 환경인지 확인해주세요)");
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // 전면 카메라 사용
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("카메라 접근 에러:", err);
        // 사용자에게 에러 메시지 표시
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          setError("카메라 접근이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.");
        } else if (err instanceof DOMException && err.name === "NotFoundError") {
          setError("사용 가능한 카메라를 찾을 수 없습니다.");
        } else {
          setError("카메라를 활성화할 수 없습니다. 권한을 확인해 주세요.");
        }
      }
    }

    startCamera();

    // 컴포넌트 언마운트 시 스트림 정지
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // 비디오의 실제 해상도를 사용하여 캔버스 크기 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        // 좌우 반전 처리를 위해 context 변환 (셀카 모드 대응)
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData); // 캡처된 이미지 데이터 저장 (현재는 사용되지 않음)
        // 여기에서 imageData를 서버로 전송하거나 다른 처리를 할 수 있습니다.
        console.log("사진이 촬영되었지만 저장되지 않습니다.");

        // 촬영 후 분석(Filming) 페이지로 이동
        navigate("/filming");
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>얼굴 사진 촬영이 필요해요</h1>
        <p className={styles.notice}>*사진은 저장되지 않습니다</p>
      </div>

      <div className={styles.cameraContainer}>
        {error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline className={styles.video} />
            <div className={styles.faceGuideOverlay}>
              <div className={styles.faceGuideOval} />
              <p className={styles.faceGuideText}>얼굴을 원 안에 맞춰주세요</p>
            </div>
          </>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleCapture} className={styles.captureBtn} disabled={!!error}>
          <span className={styles.captureText}>촬영하기</span>
        </button>
      </div>
      <div className={styles.star1} /> {/* star1.png 배치 */}
      <div className={styles.star2} /> {/* star2.png 배치 */}
      <canvas ref={canvasRef} style={{ display: "none" }} /> {/* 캡처용 캔버스 (화면에 보이지 않음) */}
    </div>
  );
}