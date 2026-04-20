import styles from "./HomePage.module.css";
// 파일 경로를 실제 폴더에 있는 이름인 'MainCover.png'로 맞췄어요.
import mainCover from "../../assets/images/MainCover.png";

export function HomePage() {
  return (
    <main className={styles.root}>
      {/* 이미지를 화면에 그리는 태그입니다 */}
     <img src={mainCover} alt="메인 커버" className={styles.coverImage} />
    </main>
  );
}