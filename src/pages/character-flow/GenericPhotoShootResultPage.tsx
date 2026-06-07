import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Fragment, type CSSProperties, useState } from "react";
import resultLogo from "@/assets/images/result_logo.png";
import resultLogo2 from "@/assets/images/result_logo2.png";
import resultLogo3 from "@/assets/images/result_logo3.png";
import resultLogo4 from "@/assets/images/result_logo4.png";
import { type CharacterId, CHARACTERS } from "@/constants/characters";
import { loadPhotos, createFourCutComposite } from "./photoShootUtils";
import styles from "./GenericPhotoShootResultPage.module.css";

export function GenericPhotoShootResultPage() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const charId = characterId as CharacterId;
  const config = CHARACTERS[charId];

  const photos = loadPhotos(charId);
  const [frameAccentColor, setFrameAccentColor] = useState("#fff");
  const [isProcessing, setIsProcessing] = useState(false);

  const completedPhotos = photos.filter(
    (photo): photo is string => photo !== null
  );

  const handleNext = async () => {
    if (completedPhotos.length < 4) return;

    setIsProcessing(true);
    try {
      // 1. 네컷 합성 이미지 생성
      const compositePhoto = await createFourCutComposite(completedPhotos, frameAccentColor);
      
      // 2. localStorage에 최종 이미지 저장 (이메일 전송용)
      localStorage.setItem("final_four_cut_photo", compositePhoto);
      
      // 3. 다음 단계로 이동
      navigate("/email-input");
    } catch (err) {
      console.error("합성 이미지 생성 실패:", err);
      alert("이미지 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resultLogoSrc =
    frameAccentColor === "#ff85b8"
      ? resultLogo4
      : frameAccentColor === "#e78eb3"
      ? resultLogo3
      : frameAccentColor === "#ff5ca0"
      ? resultLogo2
      : resultLogo;

  const rootStyle = {
    "--frame-accent-color": frameAccentColor,
  } as CSSProperties;

  const frameColorOptions = [
    { className: styles.frameColorCircle, color: "#fff", label: "화이트" },
    { className: styles.frameColorCircleDark, color: "#000", label: "블랙" },
    {
      className: styles.frameColorCirclePinkLight,
      color: "#ffdbea",
      label: "연핑크",
    },
    { className: styles.frameColorCirclePink, color: "#ffbfda", label: "핑크" },
    {
      className: styles.frameColorCircleRoseLight,
      color: "#f6afc3",
      label: "로즈 라이트",
    },
    { className: styles.frameColorCircleRose, color: "#e78eb3", label: "로즈" },
    {
      className: styles.frameColorCircleHotPink,
      color: "#ff85b8",
      label: "핫핑크",
    },
    {
      className: styles.frameColorCircleDeepPink,
      color: "#ff5ca0",
      label: "딥핑크",
    },
  ];

  if (!config) {
    return <Navigate to="/" replace />;
  }

  if (completedPhotos.length < 4) {
    return <Navigate to={`/photo-shoot/${charId}`} replace />;
  }

  return (
    <main className={styles.root} style={rootStyle}>
      <div className={styles.whiteBar} aria-hidden />
      <div className={`${styles.sideBar} ${styles.sideBarLeft}`} aria-hidden />
      <div className={`${styles.sideBar} ${styles.sideBarRight}`} aria-hidden />
      <p className={styles.frameColorLabel}>프레임 색상</p>
      {frameColorOptions.map((option) => (
        <button
          key={option.color}
          type="button"
          aria-label={`${option.label} 프레임 색상`}
          aria-pressed={frameAccentColor === option.color}
          className={`${styles.colorSwatch} ${option.className}`}
          onClick={() => setFrameAccentColor(option.color)}
        />
      ))}
      <div className={styles.photoStack} aria-label="촬영 결과">
        {completedPhotos.map((photo, index) => (
          <Fragment key={`${index + 1}-${photo.slice(0, 24)}`}>
            <div className={styles.photoSlot}>
              <img
                src={photo}
                alt={`${index + 1}번째 촬영 사진`}
                className={styles.photo}
                draggable={false}
              />
            </div>
            {index < completedPhotos.length - 1 ? (
              <div className={styles.photoGapFill} aria-hidden />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div
        className={styles.nextButtonBox}
        role="button"
        onClick={handleNext}
        style={{ cursor: isProcessing ? "wait" : "pointer", opacity: isProcessing ? 0.7 : 1 }}
      >
        <span className={styles.nextButtonText}>{isProcessing ? "처리 중..." : "다음"}</span>
      </div>
      <div className={styles.bottomWhiteBox}>
        <img
          src={resultLogoSrc}
          alt=""
          className={styles.bottomLogo}
          draggable={false}
        />
      </div>
    </main>
  );
}
