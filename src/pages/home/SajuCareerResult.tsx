import styles from "./SajuCareerResult.module.css";

export function SajuCareerResult() {
  return (
    <div className={styles.root}>
      <div className={styles.bgImage} />
      <div className={styles.midSection} />
      <div className={styles.bottomOverlay} />
      <div className={styles.rightDivider} />

      {/* 섹션 타이틀 */}
      <p className={styles.sectionTitle}>나의 일잘러 성향 리포트</p>

      {/* 추천 직업 바 */}
      <div className={`${styles.infoBar} ${styles.bar1}`}>
        <span className={styles.infoLabel}>추천 직업</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>부동산 자산운용가, 플랫폼 운영 기획자, 전통장인</span>
      </div>

      {/* 업무 스타일 바 */}
      <div className={`${styles.infoBar} ${styles.bar2}`}>
        <span className={styles.infoLabel}>업무 스타일</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>혼자서 묵묵히 목표를 달성하는 '고독한 사냥꾼' 스타일</span>
      </div>

      {/* 주의할 점 바 */}
      <div className={`${styles.infoBar} ${styles.bar3}`}>
        <span className={styles.infoLabel}>주의할 점</span>
        <div className={styles.barDivider} />
        <span className={styles.infoValue}>고집이 너무 세서 팀원들이 숨막혀 할 수 있음!</span>
      </div>

      {/* 최고의 파트너 */}
      <div className={`${styles.partnerBox} ${styles.partnerLeft}`}>
        <h3 className={styles.partnerTitle}>최고의 파트너</h3>
        <div className={styles.partnerCard}>
          <div className={styles.partnerImg} />
          <p className={styles.partnerDesc}>{'따뜻한 햇살 같은 캐릭터\n(화 기운)'}</p>
        </div>
      </div>

      {/* 조심할 파트너 */}
      <div className={`${styles.partnerBox} ${styles.partnerRight}`}>
        <h3 className={styles.partnerTitle}>조심할 파트너</h3>
        <div className={styles.partnerCard}>
          <div className={styles.partnerImg} />
          <p className={styles.partnerDesc}>{'나를 자꾸 베어내려는 예리한 캐릭터\n(금 기운)'}</p>
        </div>
      </div>
    </div>
  );
}
