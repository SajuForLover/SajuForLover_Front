import { Navigate, useNavigate } from "react-router-dom";
import { Fragment, type CSSProperties, useState } from "react";
import resultLogo from "@/assets/images/result_logo.png";
import resultLogo2 from "@/assets/images/result_logo2.png";
import resultLogo3 from "@/assets/images/result_logo3.png";
import resultLogo4 from "@/assets/images/result_logo4.png";
import { loadPhotos } from "@/pages/soohoo-photo-shoot/photoShootData";
import styles from "../yoon-sea-photo-shoot-result/YoonSeaPhotoShootResultPage.module.css";

export function SoohooPhotoShootResultPage() {
  const navigate = useNavigate();
  const photos = loadPhotos();
  const [frameAccentColor, setFrameAccentColor] = useState("#fff");
  const completedPhotos = photos.filter(
    (photo): photo is string => photo !== null
  );
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

  if (completedPhotos.length < 4) {
    return <Navigate to="/soohoo-photo-shoot" replace />;
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
      <div className={styles.nextButtonBox} role="button" onClick={() => navigate("/email-input")} style={{ cursor: "pointer" }}>
        <span className={styles.nextButtonText}>다음</span>
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
