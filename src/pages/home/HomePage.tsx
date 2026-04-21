import { useNavigate } from "react-router-dom"; // 1. useNavigate 불러오기
import styles from "./HomePage.module.css";
import mainCover from "../../assets/images/MainCover.png";

export function HomePage() {
  const navigate = useNavigate(); // 2. 이동 함수 생성

  const handleNextPage = () => {
    navigate("/user-form"); // 3. 이동하고 싶은 경로 설정 (App.tsx에 정의된 path)
  };

  return (
    // 클릭 시 handleNextPage 실행
    <main className={styles.root} onClick={handleNextPage} style={{ cursor: 'pointer' }}>
      <img src={mainCover} alt="메인 커버" className={styles.coverImage} />
    </main>
  );
}