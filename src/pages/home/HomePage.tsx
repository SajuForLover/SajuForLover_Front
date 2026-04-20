import styles from "./HomePage.module.css";

/**
 * 첫 화면(랜딩). 섹션·카드는 `components/home` 또는 `features/home`로 쪼개면 됩니다.
 */
export function HomePage() {
  return (
    <main className={styles.root}>
      <p className={styles.placeholder}>Home — 여기부터 화면을 채우면 됩니다.</p>
    </main>
  );
}
