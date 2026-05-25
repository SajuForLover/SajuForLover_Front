import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedTime, setSelectedTime] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const navigate = useNavigate();

  // 드롭다운 외부 클릭 시 닫기 위한 Ref
  const timeRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsSelectActive(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cityList = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도 수원시", "경기도 성남시", "경기도 고양시", "강원도 춘천시", "충청북도 청주시", "충청남도 천안시", "전라북도 전주시", "전라남도 목포시", "경상북도 포항시", "경상남도 창원시", "제주특별자치도 제주시"];

  const timeOptions = [
    { label: "시간 모름 (선택 안 함)", value: "unknown" },
    { label: "진시 (07:30 ~ 09:29)", value: "jin" },
    { label: "사시 (09:30 ~ 11:29)", value: "sa" },
    { label: "오시 (11:30 ~ 13:29)", value: "o" },
    { label: "미시 (13:30 ~ 15:29)", value: "mi" },
    { label: "신시 (15:30 ~ 17:29)", value: "shin" },
    { label: "유시 (17:30 ~ 19:29)", value: "yu" },
    { label: "술시 (19:30 ~ 21:29)", value: "sul" },
    { label: "해시 (21:30 ~ 23:29)", value: "hae" },
    { label: "자시 (23:30 ~ 01:29)", value: "ja" },
    { label: "축시 (01:30 ~ 03:29)", value: "chuk" },
    { label: "인시 (03:30 ~ 05:29)", value: "in" },
    { label: "묘시 (05:30 ~ 07:29)", value: "myo" },
  ];

  const handleTimeSelect = (label: string) => {
    setSelectedTime(label);
    setIsSelectActive(false);
  };

  const handleCitySelect = (city: string) => {
    setCitySearch(city);
    setIsCityActive(false);
  };

  const filteredCities = cityList.filter(city => 
    city.includes(citySearch) && citySearch !== ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력값 검증 (예시)
    if (!userName || !selectedGender || !birthDate || !selectedTime || !citySearch) {
      alert("모든 사주 정보를 입력해 주세요.");
      return;
    }

    navigate("/camera");
  };

  return (
    <div className={styles.root}>
      {/* 우측 구분선 */}
      <div className={styles.rightDivider} />

      {/* 1. 상단 고정 영역: 배경 투명하게 유지 */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>사주 정보를 입력해 주세요</h1>
        <p className={styles.notice}>*정보는 저장되지 않습니다</p>
      </div>

      {/* 배경 장식 요소: 스크롤해도 고정됨 */}
      <img src={pinkEffect} className={styles.fixedPinkEffect} alt="" />
      <img src={star1} className={styles.star1} alt="" />
      <img src={star2} className={styles.star2} alt="" />

      {/* 3. 기존 폼 내용 (그대로 유지) */}
      <form id="user-info-form" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>이름</label>
          <input 
            type="text" 
            placeholder="이름을 입력해 주세요" 
            className={styles.input} 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>태어난 시간</label>
          <div ref={timeRef} className={`${styles.inputWrapper} ${isSelectActive ? styles.activeWrapper : ""}`}>
            <div 
              className={`${styles.selectTrigger} ${selectedTime ? styles.hasValue : ""}`}
              onClick={() => setIsSelectActive(!isSelectActive)}
            >
              {selectedTime || "태어난 시간을 선택해주세요"}
            </div>
            <img 
              src={downIcon} 
              className={`${styles.selectIcon} ${isSelectActive ? styles.rotated : ""}`} 
              alt="" 
            />

            {isSelectActive && (
              <div className={styles.floatingListbox}>
                {timeOptions.map((option, index) => (
                  <React.Fragment key={option.value}>
                    <div 
                      className={styles.listItem}
                      onClick={() => handleTimeSelect(option.label)}
                    >
                      {option.label}
                    </div>
                    {index < timeOptions.length - 1 && (
                      <div className={styles.itemDivider} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 태어난 도시 */}
<div className={styles.inputGroup}>
  <label className={styles.label}>태어난 도시</label>
  <div ref={cityRef} className={`${styles.inputWrapper} ${isCityActive ? styles.activeWrapper : ""}`}>
    <input 
      type="text" 
      placeholder="도시명을 입력해주세요" 
      className={styles.input} 
      value={citySearch}
      onChange={(e) => {
        setCitySearch(e.target.value);
        setIsCityActive(true);
      }}
      onFocus={() => setIsCityActive(true)}
      onClick={() => setIsCityActive(true)}
    />
    <img src={searchIcon} className={styles.searchIcon} alt="검색" />
    
    {/* ✅ 추가: 도시 검색 결과/가이드 박스 (입력창 포커스 시에만 표시) */}
    {isCityActive && (
      <div 
        className={styles.cityDropdown}
        onMouseDown={(e) => e.preventDefault()} // 클릭 시 input blur 방지
      >
        {citySearch === "" ? (
          <>
            <div className={styles.cityGuide}>
              시군위 단위로 검색
            </div>
            <div className={styles.innerDivider} />
            <div className={styles.cityNotice}>
              태어난 도시를 모르시는 경우<br/>
              '서울특별시' 혹은 태어난 국가의 수도를 입력해 주세요
            </div>
          </>
        ) : (
          <div className={styles.cityResultList}>
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <div 
                  key={idx} 
                  className={styles.cityResultItem}
                  onClick={() => handleCitySelect(city)}
                >
                  <span className={styles.cityResultText}>{city}</span>, 대한민국
                </div>
              ))
            ) : (
              <div className={styles.cityNotice} style={{ top: '33px' }}>검색 결과가 없습니다.</div>
            )}
          </div>
        )}
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