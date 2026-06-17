import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/Camera.module.css";

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
          video: {
            facingMode: "user",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          }, // 전면 카메라 사용
          audio: false,
        });
        // setStream(mediaStream);
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
        // setCapturedImage(imageData); // 캡처된 이미지 데이터 저장 (현재는 사용되지 않음)
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
              <div className={styles.faceGuideOval}>
                <svg
                  viewBox="0 0 100 100"
                  className={styles.faceGuideLines}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Triangulation mesh lines */}
                  <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.45" fill="none">
                    {/* Outer face contour */}
                    <polyline points="50,5 35,9 22,22 17,44 20,58 26,72 41,88 50,92 59,88 74,72 80,58 83,44 78,22 65,9 50,5" />
                    {/* Forehead web */}
                    <line x1="50" y1="5" x2="38" y2="17" />
                    <line x1="50" y1="5" x2="62" y2="17" />
                    <line x1="35" y1="9" x2="38" y2="17" />
                    <line x1="65" y1="9" x2="62" y2="17" />
                    <line x1="38" y1="17" x2="62" y2="17" />
                    <line x1="38" y1="17" x2="22" y2="22" />
                    <line x1="62" y1="17" x2="78" y2="22" />
                    <line x1="38" y1="17" x2="29" y2="33" />
                    <line x1="62" y1="17" x2="71" y2="33" />
                    <line x1="22" y1="22" x2="29" y2="33" />
                    <line x1="78" y1="22" x2="71" y2="33" />
                    {/* Brow area */}
                    <line x1="29" y1="33" x2="33" y2="41" />
                    <line x1="71" y1="33" x2="67" y2="41" />
                    <line x1="29" y1="33" x2="17" y2="44" />
                    <line x1="71" y1="33" x2="83" y2="44" />
                    <line x1="33" y1="41" x2="17" y2="44" />
                    <line x1="67" y1="41" x2="83" y2="44" />
                    {/* Nose bridge and eye connections */}
                    <line x1="38" y1="17" x2="50" y2="37" />
                    <line x1="62" y1="17" x2="50" y2="37" />
                    <line x1="33" y1="41" x2="50" y2="37" />
                    <line x1="67" y1="41" x2="50" y2="37" />
                    <line x1="29" y1="33" x2="50" y2="37" />
                    <line x1="71" y1="33" x2="50" y2="37" />
                    {/* Inner cheek */}
                    <line x1="33" y1="41" x2="27" y2="52" />
                    <line x1="67" y1="41" x2="73" y2="52" />
                    <line x1="17" y1="44" x2="27" y2="52" />
                    <line x1="83" y1="44" x2="73" y2="52" />
                    <line x1="20" y1="58" x2="27" y2="52" />
                    <line x1="80" y1="58" x2="73" y2="52" />
                    {/* Nose */}
                    <line x1="50" y1="37" x2="44" y2="57" />
                    <line x1="50" y1="37" x2="56" y2="57" />
                    <line x1="44" y1="57" x2="50" y2="60" />
                    <line x1="56" y1="57" x2="50" y2="60" />
                    <line x1="27" y1="52" x2="44" y2="57" />
                    <line x1="73" y1="52" x2="56" y2="57" />
                    {/* Mouth area edges */}
                    <line x1="27" y1="52" x2="38" y2="65" />
                    <line x1="73" y1="52" x2="62" y2="65" />
                    <line x1="44" y1="57" x2="38" y2="65" />
                    <line x1="56" y1="57" x2="62" y2="65" />
                    <line x1="50" y1="60" x2="38" y2="65" />
                    <line x1="50" y1="60" x2="62" y2="65" />
                    {/* Jaw */}
                    <line x1="27" y1="52" x2="26" y2="72" />
                    <line x1="73" y1="52" x2="74" y2="72" />
                    <line x1="20" y1="58" x2="26" y2="72" />
                    <line x1="80" y1="58" x2="74" y2="72" />
                    <line x1="38" y1="65" x2="26" y2="72" />
                    <line x1="62" y1="65" x2="74" y2="72" />
                    <line x1="50" y1="71" x2="26" y2="72" />
                    <line x1="50" y1="71" x2="74" y2="72" />
                    <line x1="38" y1="65" x2="36" y2="80" />
                    <line x1="62" y1="65" x2="64" y2="80" />
                    <line x1="50" y1="71" x2="36" y2="80" />
                    <line x1="50" y1="71" x2="64" y2="80" />
                    <line x1="26" y1="72" x2="36" y2="80" />
                    <line x1="74" y1="72" x2="64" y2="80" />
                    <line x1="36" y1="80" x2="41" y2="88" />
                    <line x1="64" y1="80" x2="59" y2="88" />
                    <line x1="36" y1="80" x2="50" y2="81" />
                    <line x1="64" y1="80" x2="50" y2="81" />
                    <line x1="50" y1="71" x2="50" y2="81" />
                    <line x1="50" y1="81" x2="41" y2="88" />
                    <line x1="50" y1="81" x2="59" y2="88" />
                    <line x1="50" y1="81" x2="50" y2="92" />
                  </g>

                  {/* Vertex dots */}
                  <g fill="rgba(255,255,255,0.75)">
                    <circle cx="50" cy="5" r="1.2" />
                    <circle cx="35" cy="9" r="1.1" />
                    <circle cx="65" cy="9" r="1.1" />
                    <circle cx="22" cy="22" r="1.1" />
                    <circle cx="78" cy="22" r="1.1" />
                    <circle cx="17" cy="44" r="1.1" />
                    <circle cx="83" cy="44" r="1.1" />
                    <circle cx="20" cy="58" r="1.1" />
                    <circle cx="80" cy="58" r="1.1" />
                    <circle cx="26" cy="72" r="1.1" />
                    <circle cx="74" cy="72" r="1.1" />
                    <circle cx="41" cy="88" r="1.1" />
                    <circle cx="59" cy="88" r="1.1" />
                    <circle cx="50" cy="92" r="1.2" />
                    <circle cx="38" cy="17" r="1" />
                    <circle cx="62" cy="17" r="1" />
                    <circle cx="29" cy="33" r="1" />
                    <circle cx="71" cy="33" r="1" />
                    <circle cx="27" cy="52" r="1" />
                    <circle cx="73" cy="52" r="1" />
                    <circle cx="44" cy="57" r="1" />
                    <circle cx="56" cy="57" r="1" />
                    <circle cx="50" cy="60" r="1" />
                    <circle cx="38" cy="65" r="1" />
                    <circle cx="62" cy="65" r="1" />
                    <circle cx="50" cy="71" r="1" />
                    <circle cx="36" cy="80" r="1" />
                    <circle cx="64" cy="80" r="1" />
                    <circle cx="50" cy="81" r="1" />
                    {/* Larger dots for key feature points */}
                    <circle cx="33" cy="41" r="1.5" fill="rgba(255,255,255,0.9)" />
                    <circle cx="67" cy="41" r="1.5" fill="rgba(255,255,255,0.9)" />
                    <circle cx="50" cy="37" r="1.2" fill="rgba(255,255,255,0.85)" />
                  </g>

                  {/* Cross (+) markers at eyes and nose area */}
                  <g stroke="rgba(255,255,255,0.9)" strokeWidth="0.9" fill="none">
                    <line x1="30" y1="41" x2="36" y2="41" />
                    <line x1="33" y1="38" x2="33" y2="44" />
                    <line x1="64" y1="41" x2="70" y2="41" />
                    <line x1="67" y1="38" x2="67" y2="44" />
                    <line x1="41" y1="53" x2="47" y2="53" />
                    <line x1="44" y1="50" x2="44" y2="56" />
                    <line x1="53" y1="53" x2="59" y2="53" />
                    <line x1="56" y1="50" x2="56" y2="56" />
                  </g>

                  {/* Mouth pixel-art blocks */}
                  <g fill="rgba(255,255,255,0.5)">
                    <rect x="38.5" y="64" width="2.3" height="1.7" />
                    <rect x="41.8" y="64" width="2.3" height="1.7" />
                    <rect x="45.1" y="64" width="2.3" height="1.7" />
                    <rect x="48.4" y="64" width="2.3" height="1.7" />
                    <rect x="51.7" y="64" width="2.3" height="1.7" />
                    <rect x="55" y="64" width="2.3" height="1.7" />
                    <rect x="38.5" y="66.5" width="2.3" height="1.7" />
                    <rect x="41.8" y="66.5" width="2.3" height="1.7" />
                    <rect x="45.1" y="66.5" width="2.3" height="1.7" />
                    <rect x="48.4" y="66.5" width="2.3" height="1.7" />
                    <rect x="51.7" y="66.5" width="2.3" height="1.7" />
                    <rect x="55" y="66.5" width="2.3" height="1.7" />
                    <rect x="38.5" y="69" width="2.3" height="1.7" />
                    <rect x="41.8" y="69" width="2.3" height="1.7" />
                    <rect x="45.1" y="69" width="2.3" height="1.7" />
                    <rect x="48.4" y="69" width="2.3" height="1.7" />
                    <rect x="51.7" y="69" width="2.3" height="1.7" />
                    <rect x="55" y="69" width="2.3" height="1.7" />
                  </g>
                </svg>
              </div>
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
      <div className={styles.star1} />
      <div className={styles.star2} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}