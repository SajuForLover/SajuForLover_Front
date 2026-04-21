import styles from "../../styles/UserForm.module.css";

export function UserForm() {
  return (
    <div className={styles.root}>
      {/* 1. 상단 고정 영역: 제목과 공지 */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>사주 정보를 입력해 주세요</h1>
        <p className={styles.notice}>*정보는 저장되지 않습니다</p>
      </div>

      {/* 2. 스크롤되는 폼 영역 (id 부여) */}
      <form id="user-info-form" className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <input type="text" placeholder="이름을 입력해 주세요" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.genderContainer}>
            <button type="button" className={`${styles.genderBtn} ${styles.active}`}>여자</button>
            <button type="button" className={styles.genderBtn}>남자</button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>생년월일</label>
          <input type="date" className={styles.input} defaultValue="2008-07-31" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>태어난 시간</label>
          <select className={styles.select}>
            <option>태어난 시간을 선택해주세요</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>태어난 도시</label>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="도시명을 입력해주세요" className={styles.input} />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        </div>
      </form>

      {/* 3. 하단 고정 영역: 입력 완료 버튼 */}
      <div className={styles.fixedButtonContainer}>
        <button type="submit" form="user-info-form" className={styles.submitBtn}>
          입력완료
        </button>
      </div>
    </div>
  );
}