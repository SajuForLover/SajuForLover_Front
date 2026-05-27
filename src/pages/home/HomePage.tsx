import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import mainImg from "../../assets/images/MainCover.png"; // 실제 배경 이미지 경로로 확인해 주세요

export function HomePage() {
  const navigate = useNavigate();
  const isNavigating = useRef(false); // 이동 중인지 체크하는 깃발
  const [isLeaving, setIsLeaving] = useState(false); // 화면을 떠나는 중인지 상태
  const [canMove, setCanMove] = useState(false); // 마우스 감지 활성화 여부

  // 접속 직후 아주 짧은 시간만 대기 (즉시 실행 에러 방지)
  useEffect(() => {
    const timer = setTimeout(() => setCanMove(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // 마우스가 움직이면 실행되는 함수
  const handleMouseMove = () => {
    if (!canMove || isNavigating.current || isLeaving) return; 
    
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