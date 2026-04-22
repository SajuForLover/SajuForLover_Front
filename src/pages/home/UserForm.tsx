import { useState } from "react";
import styles from "../../styles/UserForm.module.css";
import pinkEffect from "../../assets/images/pinkEffect.png"; // 경로 확인해주세요!
import inputComplete from "../../assets/images/InputComplete.png";
import downIcon from "../../assets/icons/down.svg";
import searchIcon from "../../assets/icons/search.svg";
import star1 from "../../assets/images/star1.png";
import star2 from "../../assets/images/star2.png";

export function UserForm() {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isCityActive, setIsCityActive] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"female" | "male" | null>(null);

  return (
    <div className={styles.root}>
      {/* 1. 상단 고정 영역: 배경 투명하게 유지 */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>사주 정보를 입력해 주세요</h1>
        <p className={styles.notice}>*정보는 저장되지 않습니다</p>
      </div>

      {/* ✅ 2. 배경 장식 요소: 스크롤해도 고정됨 */}
      <img src={pinkEffect} className={styles.fixedPinkEffect} alt="" />
      <div className={styles.star1} />
      <div className={styles.star2} />

      {/* 3. 기존 폼 내용 (그대로 유지) */}
      <form id="user-info-form" className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <input type="text" placeholder="이름을 입력해 주세요" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
          <div className={styles.genderContainer}>
            <button 
              type="button" 
              className={`${styles.genderBtn} ${selectedGender === "female" ? styles.active : ""}`}
              onClick={() => setSelectedGender("female")}
            >
              여자
            </button>
            <button 
              type="button" 
              className={`${styles.genderBtn} ${selectedGender === "male" ? styles.active : ""}`}
              onClick={() => setSelectedGender("male")}
            >
              남자
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>생년월일</label>
          <input 
            type="text" 
            placeholder="생년월일 8자리를 입력해 주세요 (예: 20080731)" 
            className={`${styles.input} ${styles.birthInput}`} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>태어난 시간</label>
          <div className={styles.inputWrapper}>
            <select 
              className={styles.select}
              onFocus={() => setIsSelectActive(true)}
              onBlur={() => setIsSelectActive(false)}
            >
              <option value="">시간 모름 (선택 안 함)</option>
              <option value="unknown">모름</option>
              <option value="jin">진시 (07:30 ~ 09:29)</option>
              <option value="sa">사시 (09:30 ~ 11:29)</option>
              <option value="o">오시 (11:30 ~ 13:29)</option>
              <option value="mi">미시 (13:30 ~ 15:29)</option>
              <option value="shin">신시 (15:30 ~ 17:29)</option>
              <option value="yu">유시 (17:30 ~ 19:29)</option>
              <option value="sul">술시 (19:30 ~ 21:29)</option>
              <option value="hae">해시 (21:30 ~ 23:29)</option>
              <option value="ja">자시 (23:30 ~ 01:29)</option>
              <option value="chuk">축시 (01:30 ~ 03:29)</option>
              <option value="in">인시 (03:30 ~ 05:29)</option>
              <option value="myo">묘시 (05:30 ~ 07:29)</option>
            </select>
            <img 
              src={downIcon} 
              className={`${styles.selectIcon} ${isSelectActive ? styles.rotated : ""}`} 
              alt="" 
            />
          </div>
        </div>

        {/* 태어난 도시 */}
<div className={styles.inputGroup}>
  <label className={styles.label}>태어난 도시</label>
  <div className={styles.inputWrapper}>
    <input 
      type="text" 
      placeholder="도시명을 입력해주세요" 
      className={styles.input} 
      onFocus={() => setIsCityActive(true)}
      onBlur={() => setIsCityActive(false)}
    />
    <img src={searchIcon} className={styles.searchIcon} alt="검색" />
    
    {/* ✅ 추가: 도시 검색 결과/가이드 박스 (입력창 포커스 시에만 표시) */}
    {isCityActive && (
      <div className={styles.cityDropdown}>
        <div className={styles.cityGuide}>
          시군위 단위로 검색
        </div>
        <div className={styles.innerDivider} />
        <div className={styles.cityNotice}>
          태어난 도시를 모르시는 경우<br/>
          '서울특별시' 혹은 태어난 국가의 수도를 입력해 주세요
        </div>
      </div>
    )}
  </div>
</div>
      </form>

      <div className={styles.fixedButtonContainer}>
  <button type="submit" form="user-info-form" className={styles.submitBtn}>
    입력완료
  </button>
</div>
    </div>
  );
}