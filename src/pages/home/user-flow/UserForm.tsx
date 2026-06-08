import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/UserForm.module.css";
import pinkEffect from "@/assets/images/pinkEffect.png"; // 경로 확인해주세요!
import _inputComplete from "@/assets/images/InputComplete.png";
import downIcon from "@/assets/icons/down.svg";
import searchIcon from "@/assets/icons/search.svg";
import star1 from "@/assets/images/star1.png";
import star2 from "@/assets/images/star2.png";
import { analyzeSaju } from "@/api/saju";

export function UserForm() {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isCityActive, setIsCityActive] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"female" | "male" | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);

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

  const cityList: { name: string; country: string; aliases: string[] }[] = [
    // ── 특별/광역시 ──
    { name: "서울특별시", country: "대한민국", aliases: ["서울", "seoul"] },
    { name: "부산광역시", country: "대한민국", aliases: ["부산", "busan"] },
    { name: "대구광역시", country: "대한민국", aliases: ["대구", "daegu"] },
    { name: "인천광역시", country: "대한민국", aliases: ["인천", "incheon"] },
    { name: "광주광역시", country: "대한민국", aliases: ["광주", "gwangju"] },
    { name: "대전광역시", country: "대한민국", aliases: ["대전", "daejeon"] },
    { name: "울산광역시", country: "대한민국", aliases: ["울산", "ulsan"] },
    { name: "세종특별자치시", country: "대한민국", aliases: ["세종", "sejong"] },
    // ── 경기도 ──
    { name: "경기도 수원시", country: "대한민국", aliases: ["수원", "suwon"] },
    { name: "경기도 성남시", country: "대한민국", aliases: ["성남", "seongnam"] },
    { name: "경기도 고양시", country: "대한민국", aliases: ["고양", "goyang"] },
    { name: "경기도 용인시", country: "대한민국", aliases: ["용인", "yongin"] },
    { name: "경기도 부천시", country: "대한민국", aliases: ["부천", "bucheon"] },
    { name: "경기도 안산시", country: "대한민국", aliases: ["안산", "ansan"] },
    { name: "경기도 안양시", country: "대한민국", aliases: ["안양", "anyang"] },
    { name: "경기도 남양주시", country: "대한민국", aliases: ["남양주", "namyangju"] },
    { name: "경기도 화성시", country: "대한민국", aliases: ["화성", "hwaseong"] },
    { name: "경기도 평택시", country: "대한민국", aliases: ["평택", "pyeongtaek"] },
    { name: "경기도 의정부시", country: "대한민국", aliases: ["의정부", "uijeongbu"] },
    { name: "경기도 시흥시", country: "대한민국", aliases: ["시흥", "siheung"] },
    { name: "경기도 파주시", country: "대한민국", aliases: ["파주", "paju"] },
    { name: "경기도 광명시", country: "대한민국", aliases: ["광명", "gwangmyeong"] },
    { name: "경기도 김포시", country: "대한민국", aliases: ["김포", "gimpo"] },
    { name: "경기도 군포시", country: "대한민국", aliases: ["군포", "gunpo"] },
    { name: "경기도 광주시", country: "대한민국", aliases: ["경기광주", "gyeonggi gwangju"] },
    { name: "경기도 이천시", country: "대한민국", aliases: ["이천", "icheon"] },
    { name: "경기도 오산시", country: "대한민국", aliases: ["오산", "osan"] },
    { name: "경기도 안성시", country: "대한민국", aliases: ["안성", "anseong"] },
    { name: "경기도 의왕시", country: "대한민국", aliases: ["의왕", "uiwang"] },
    { name: "경기도 하남시", country: "대한민국", aliases: ["하남", "hanam"] },
    { name: "경기도 여주시", country: "대한민국", aliases: ["여주", "yeoju"] },
    { name: "경기도 양주시", country: "대한민국", aliases: ["양주", "yangju"] },
    { name: "경기도 구리시", country: "대한민국", aliases: ["구리", "guri"] },
    { name: "경기도 포천시", country: "대한민국", aliases: ["포천", "pocheon"] },
    { name: "경기도 동두천시", country: "대한민국", aliases: ["동두천", "dongducheon"] },
    { name: "경기도 과천시", country: "대한민국", aliases: ["과천", "gwacheon"] },
    // ── 강원도 ──
    { name: "강원도 춘천시", country: "대한민국", aliases: ["춘천", "chuncheon"] },
    { name: "강원도 원주시", country: "대한민국", aliases: ["원주", "wonju"] },
    { name: "강원도 강릉시", country: "대한민국", aliases: ["강릉", "gangneung"] },
    { name: "강원도 동해시", country: "대한민국", aliases: ["동해", "donghae"] },
    { name: "강원도 태백시", country: "대한민국", aliases: ["태백", "taebaek"] },
    { name: "강원도 속초시", country: "대한민국", aliases: ["속초", "sokcho"] },
    { name: "강원도 삼척시", country: "대한민국", aliases: ["삼척", "samcheok"] },
    // ── 충청북도 ──
    { name: "충청북도 청주시", country: "대한민국", aliases: ["청주", "cheongju"] },
    { name: "충청북도 충주시", country: "대한민국", aliases: ["충주", "chungju"] },
    { name: "충청북도 제천시", country: "대한민국", aliases: ["제천", "jecheon"] },
    // ── 충청남도 ──
    { name: "충청남도 천안시", country: "대한민국", aliases: ["천안", "cheonan"] },
    { name: "충청남도 공주시", country: "대한민국", aliases: ["공주", "gongju"] },
    { name: "충청남도 보령시", country: "대한민국", aliases: ["보령", "boryeong"] },
    { name: "충청남도 아산시", country: "대한민국", aliases: ["아산", "asan"] },
    { name: "충청남도 서산시", country: "대한민국", aliases: ["서산", "seosan"] },
    { name: "충청남도 논산시", country: "대한민국", aliases: ["논산", "nonsan"] },
    { name: "충청남도 계룡시", country: "대한민국", aliases: ["계룡", "gyeryong"] },
    { name: "충청남도 당진시", country: "대한민국", aliases: ["당진", "dangjin"] },
    // ── 전라북도 ──
    { name: "전라북도 전주시", country: "대한민국", aliases: ["전주", "jeonju"] },
    { name: "전라북도 군산시", country: "대한민국", aliases: ["군산", "gunsan"] },
    { name: "전라북도 익산시", country: "대한민국", aliases: ["익산", "iksan"] },
    { name: "전라북도 정읍시", country: "대한민국", aliases: ["정읍", "jeongeup"] },
    { name: "전라북도 남원시", country: "대한민국", aliases: ["남원", "namwon"] },
    { name: "전라북도 김제시", country: "대한민국", aliases: ["김제", "gimje"] },
    // ── 전라남도 ──
    { name: "전라남도 목포시", country: "대한민국", aliases: ["목포", "mokpo"] },
    { name: "전라남도 여수시", country: "대한민국", aliases: ["여수", "yeosu"] },
    { name: "전라남도 순천시", country: "대한민국", aliases: ["순천", "suncheon"] },
    { name: "전라남도 나주시", country: "대한민국", aliases: ["나주", "naju"] },
    { name: "전라남도 광양시", country: "대한민국", aliases: ["광양", "gwangyang"] },
    // ── 경상북도 ──
    { name: "경상북도 포항시", country: "대한민국", aliases: ["포항", "pohang"] },
    { name: "경상북도 경주시", country: "대한민국", aliases: ["경주", "gyeongju"] },
    { name: "경상북도 김천시", country: "대한민국", aliases: ["김천", "gimcheon"] },
    { name: "경상북도 안동시", country: "대한민국", aliases: ["안동", "andong"] },
    { name: "경상북도 구미시", country: "대한민국", aliases: ["구미", "gumi"] },
    { name: "경상북도 영주시", country: "대한민국", aliases: ["영주", "yeongju"] },
    { name: "경상북도 영천시", country: "대한민국", aliases: ["영천", "yeongcheon"] },
    { name: "경상북도 상주시", country: "대한민국", aliases: ["상주", "sangju"] },
    { name: "경상북도 문경시", country: "대한민국", aliases: ["문경", "mungyeong"] },
    { name: "경상북도 경산시", country: "대한민국", aliases: ["경산", "gyeongsan"] },
    // ── 경상남도 ──
    { name: "경상남도 창원시", country: "대한민국", aliases: ["창원", "changwon"] },
    { name: "경상남도 진주시", country: "대한민국", aliases: ["진주", "jinju"] },
    { name: "경상남도 통영시", country: "대한민국", aliases: ["통영", "tongyeong"] },
    { name: "경상남도 사천시", country: "대한민국", aliases: ["사천", "sacheon"] },
    { name: "경상남도 김해시", country: "대한민국", aliases: ["김해", "gimhae"] },
    { name: "경상남도 밀양시", country: "대한민국", aliases: ["밀양", "miryang"] },
    { name: "경상남도 거제시", country: "대한민국", aliases: ["거제", "geoje"] },
    { name: "경상남도 양산시", country: "대한민국", aliases: ["양산", "yangsan"] },
    // ── 제주 ──
    { name: "제주특별자치도 제주시", country: "대한민국", aliases: ["제주", "jeju"] },
    { name: "제주특별자치도 서귀포시", country: "대한민국", aliases: ["서귀포", "seogwipo"] },
    // ── 미국 ──
    { name: "New York", country: "미국", aliases: ["뉴욕", "ny", "new york city", "nyc"] },
    { name: "Los Angeles", country: "미국", aliases: ["로스앤젤레스", "로스앤젤레스시", "la", "엘에이"] },
    { name: "Chicago", country: "미국", aliases: ["시카고"] },
    { name: "Houston", country: "미국", aliases: ["휴스턴"] },
    { name: "San Francisco", country: "미국", aliases: ["샌프란시스코", "sf"] },
    { name: "Seattle", country: "미국", aliases: ["시애틀"] },
    { name: "Las Vegas", country: "미국", aliases: ["라스베가스", "라스베거스"] },
    { name: "Miami", country: "미국", aliases: ["마이애미"] },
    { name: "Boston", country: "미국", aliases: ["보스턴"] },
    { name: "Washington D.C.", country: "미국", aliases: ["워싱턴", "washington dc"] },
    { name: "Atlanta", country: "미국", aliases: ["애틀랜타"] },
    { name: "Dallas", country: "미국", aliases: ["달라스"] },
    { name: "San Diego", country: "미국", aliases: ["샌디에이고"] },
    { name: "Honolulu", country: "미국", aliases: ["호놀룰루", "하와이"] },
    // ── 일본 ──
    { name: "Tokyo", country: "일본", aliases: ["도쿄", "동경"] },
    { name: "Osaka", country: "일본", aliases: ["오사카", "대판"] },
    { name: "Kyoto", country: "일본", aliases: ["교토", "경도"] },
    { name: "Nagoya", country: "일본", aliases: ["나고야"] },
    { name: "Fukuoka", country: "일본", aliases: ["후쿠오카"] },
    { name: "Sapporo", country: "일본", aliases: ["삿포로"] },
    // ── 중국 ──
    { name: "Beijing", country: "중국", aliases: ["베이징", "북경"] },
    { name: "Shanghai", country: "중국", aliases: ["상하이", "상해"] },
    { name: "Shenzhen", country: "중국", aliases: ["선전", "심천"] },
    { name: "Guangzhou", country: "중국", aliases: ["광저우", "광주"] },
    { name: "Chengdu", country: "중국", aliases: ["청두", "성도"] },
    // ── 유럽 ──
    { name: "London", country: "영국", aliases: ["런던"] },
    { name: "Paris", country: "프랑스", aliases: ["파리"] },
    { name: "Berlin", country: "독일", aliases: ["베를린"] },
    { name: "Amsterdam", country: "네덜란드", aliases: ["암스테르담"] },
    { name: "Rome", country: "이탈리아", aliases: ["로마"] },
    { name: "Barcelona", country: "스페인", aliases: ["바르셀로나"] },
    { name: "Madrid", country: "스페인", aliases: ["마드리드"] },
    { name: "Vienna", country: "오스트리아", aliases: ["비엔나", "빈"] },
    { name: "Prague", country: "체코", aliases: ["프라하"] },
    { name: "Zurich", country: "스위스", aliases: ["취리히"] },
    { name: "Stockholm", country: "스웨덴", aliases: ["스톡홀름"] },
    // ── 오세아니아 ──
    { name: "Sydney", country: "호주", aliases: ["시드니"] },
    { name: "Melbourne", country: "호주", aliases: ["멜버른"] },
    { name: "Brisbane", country: "호주", aliases: ["브리즈번"] },
    // ── 캐나다 ──
    { name: "Toronto", country: "캐나다", aliases: ["토론토"] },
    { name: "Vancouver", country: "캐나다", aliases: ["밴쿠버"] },
    // ── 동남아 ──
    { name: "Singapore", country: "싱가포르", aliases: ["싱가포르"] },
    { name: "Bangkok", country: "태국", aliases: ["방콕"] },
    { name: "Taipei", country: "대만", aliases: ["타이베이", "대북"] },
    { name: "Ho Chi Minh City", country: "베트남", aliases: ["호치민", "사이공"] },
    { name: "Manila", country: "필리핀", aliases: ["마닐라"] },
    { name: "Jakarta", country: "인도네시아", aliases: ["자카르타"] },
    { name: "Kuala Lumpur", country: "말레이시아", aliases: ["쿠알라룸푸르", "kl"] },
    // ── 기타 아시아 ──
    { name: "Mumbai", country: "인도", aliases: ["뭄바이", "봄베이"] },
    { name: "New Delhi", country: "인도", aliases: ["뉴델리", "델리"] },
    { name: "Dubai", country: "아랍에미리트", aliases: ["두바이", "uae"] },
    { name: "Istanbul", country: "튀르키예", aliases: ["이스탄불"] },
  ];

  const timeOptions = [
    { label: "시간 모름 (선택 안 함)", value: "unknown" },
    { label: "진시 (07:30 ~ 09:29)", value: "jin" },
    { label: "사시 (09:30 ~ 11:29)", value: "sa" },
    { label: "오시 (11:30 ~ 13:29)", value: "o" },
    { label: "미시 (13:30 ~ 15:29)", value: "mi" },
    { label: "신시 (15:30 ~ 17:29)", value: "sin" },
    { label: "유시 (17:30 ~ 19:29)", value: "yu" },
    { label: "술시 (19:30 ~ 21:29)", value: "sul" },
    { label: "해시 (21:30 ~ 23:29)", value: "hae" },
    { label: "자시 (23:30 ~ 01:29)", value: "ja" },
    { label: "축시 (01:30 ~ 03:29)", value: "chuk" },
    { label: "인시 (03:30 ~ 05:29)", value: "in" },
    { label: "묘시 (05:30 ~ 07:29)", value: "myo" },
  ];

  const handleTimeSelect = (value: string, label: string) => {
    setSelectedTime(value);
    setSelectedTimeLabel(label);
    setIsSelectActive(false);
  };

  const handleCitySelect = (city: string) => {
    setCitySearch(city);
    setIsCityActive(false);
  };

  const filteredCities: typeof cityList = citySearch === "" ? [] : cityList.filter(city => {
    const q = citySearch.toLowerCase();
    return (
      city.name.toLowerCase().includes(q) ||
      city.aliases.some(a => a.toLowerCase().includes(q))
    );
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // 1. 입력값 검증
    if (!userName || !selectedGender || !birthDate || !selectedTime || !citySearch) {
      alert("모든 사주 정보를 입력해 주세요.");
      return;
    }
    
    if (!isPrivacyAgreed) {
      alert("개인정보 사용에 동의해 주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. 서버에 보낼 데이터 구성
      const requestData = {
        name: userName,
        gender: selectedGender,
        birthDate: birthDate,
        birthTime: selectedTime,
        location: citySearch,
        calendar: "solar", // 양력 고정 (추후 음력 지원 시 선택 가능하게 변경)
      };

      console.log("분석 요청 데이터:", requestData);

      // 3. API 요청 보내기
      const response = await analyzeSaju(requestData);
      
      // 4. 결과 처리
      console.log("분석 시작, 사용자 ID:", response.user_id);
      localStorage.setItem("saju_user_id", response.user_id);
      
      // 5. 다음 단계로 이동
      navigate("/camera");
    } catch (error) {
      console.error("분석 실패:", error);
      alert("분석 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
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
              {selectedTimeLabel || "태어난 시간을 선택해주세요"}
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
                      onClick={() => handleTimeSelect(option.value, option.label)}
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
                  onClick={() => handleCitySelect(city.name)}
                >
                  <span className={styles.cityResultText}>{city.name}</span>, {city.country}
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
        {/* 개인정보 동의 체크박스 */}
        <div className={styles.privacyCheckRow}>
          <input
            type="checkbox"
            id="privacy-agree"
            className={styles.privacyCheckbox}
            checked={isPrivacyAgreed}
            onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
          />
          <label htmlFor="privacy-agree" className={styles.privacyLabel}>
            개인정보 사용에 동의합니다.
          </label>
        </div>
      </form>

      <div className={styles.fixedButtonContainer}>
  <button type="submit" form="user-info-form" className={styles.submitBtn} disabled={isLoading}>
    {isLoading ? "분석 중..." : "입력완료"}
  </button>
</div>
    </div>
  );
}