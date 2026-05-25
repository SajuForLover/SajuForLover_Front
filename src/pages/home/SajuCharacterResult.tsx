import React from "react";
import styles from "./SajuCharacterResult.module.css";

interface Props {
  characterName?: string;
  characterImage?: string;
  tags?: string[];
  soulColor?: string;
}

export function SajuCharacterResult({
  characterName = "이름",
  characterImage,
  tags = ["#내향적", "#차분함", "#에겐녀"],
  soulColor = "황금빛 흙",
}: Props) {
  return (
    <div className={styles.root}>
      {/* 배경 이미지 (48% 불투명도) */}
      <div className={styles.bgImage} />

      {/* 하단 핑크 그라데이션 오버레이 */}
      <div className={styles.bottomGradient} />

      {/* 로고 */}
      <div className={styles.logo}>애인사주오!</div>

      {/* 탭 네비게이션 */}
      <nav className={styles.tabNav}>
        <button className={`${styles.tab} ${styles.tabActive}`}>캐릭터</button>
        <button className={styles.tab}>능력치</button>
        <button className={styles.tab}>라이프</button>
        <button className={styles.tab}>부스터</button>
        <button className={styles.tab}>운의 흐름</button>
      </nav>

      {/* 캐릭터 섹션 (이미지 + 이름) */}
      <div className={styles.characterSection}>
        <div className={styles.characterCircle}>
          {characterImage ? (
            <img src={characterImage} alt="캐릭터" className={styles.characterImg} />
          ) : (
            <div className={styles.characterPlaceholder} />
          )}
        </div>
        <p className={styles.characterName}>{characterName}</p>
      </div>

      {/* 해시태그 */}
      <div className={styles.tagGroup}>
        {tags.map((tag, i) => (
          <span key={i} className={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* 말풍선 */}
      <div className={styles.speechBubble}>
        <p className={styles.speechText}>{`"당신의 소울 컬러는 ${soulColor}입니다"`}</p>
      </div>
    </div>
  );
}
