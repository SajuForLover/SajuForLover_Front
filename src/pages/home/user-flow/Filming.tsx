import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/Camera.module.css";
import star2 from "@/assets/images/star2.png";


export function Filming() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [_stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();

  // 카운트다운 로직 (10에서 1까지)
  useEffect(() => {
    if (countdown > 1) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 1) {
      // 1초가 되면 잠시 후 캡처 실행
      const finalTimer = setTimeout(() => {
        handleCapture();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [countdown]);

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
          video: {
            facingMode: "user",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          }, // 전면 카메라 사용
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
        
        // sessionStorage에 저장하여 다른 페이지에서도 접근 가능하게 함
        sessionStorage.setItem("capturedImage", imageData);

        // 촬영된 이미지를 들고 결과 페이지로 이동
        navigate("/filming-completed", { state: { capturedImage: imageData } });
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>촬영 중이예요</h1>
        <p className={styles.notice}>*사진은 저장되지 않습니다</p>
      </div>

      <div className={styles.filmingContainer}>
        {error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline className={styles.video} />
            <div className={styles.faceGuideOverlay}>
              <div className={styles.faceGuideOval} />
              <p className={styles.faceGuideText}>얼굴을 원 안에 맞춰주세요</p>
            </div>
            <div className={styles.countdown}>{countdown}</div>
            <img src={star2} className={styles.countdownStar} alt="" />
          </>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
  );
}