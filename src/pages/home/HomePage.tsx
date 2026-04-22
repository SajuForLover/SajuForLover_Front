import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import mainImg from "../../assets/images/MainCover.png"; // 실제 배경 이미지 경로로 확인해 주세요

export function HomePage() {
  const navigate = useNavigate();
  const isNavigating = useRef(false); // 이동 중인지 체크하는 깃발
  const [isLeaving, setIsLeaving] = useState(false); // 화면을 떠나는 중인지 상태

  // 마우스가 움직이면 실행되는 함수
  const handleMouseMove = () => {
    if (isNavigating.current || isLeaving) return; // 이미 이동 중이면 무시
    
    setIsLeaving(true); // 페이드 아웃 애니메이션 시작

    setTimeout(() => {
      isNavigating.current = true;
      // 라우터 설정에 맞는 경로인지 꼭 확인하세요!
      navigate("/user-form");
    }, 800); // 0.8초 뒤에 페이지 이동 (애니메이션 시간과 맞춤)
  };

  return (
    <div className={`${styles.root} ${isLeaving ? styles.leaving : ""}`} onMouseMove={handleMouseMove}>
      <img src={mainImg} alt="홈페이지 메인" />
    </div>
  );
}