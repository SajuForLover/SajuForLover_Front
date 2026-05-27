import { ResultLayout, type ResultTab } from "./ResultLayout";
import styles from "./SajuCharacterResult.module.css";

interface Props {
  characterName?: string;
  characterImage?: string;
  tags?: string[];
  soulColor?: string;
  onTabClick?: (tab: ResultTab) => void;
}

export function SajuCharacterResult({
  characterName = "이름",
  characterImage,
  tags = ["#내향적", "#차분함", "#에겐녀"],
  soulColor = "황금빛 흙",
  onTabClick,
}: Props) {
  return (
    <ResultLayout activeTab="캐릭터" bg="bg4" onTabClick={onTabClick}>
      <div className={styles.bottomGradient} />

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

      <div className={styles.tagGroup}>
        {tags.map((tag, i) => (
          <span key={i} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.speechBubble}>
        <p className={styles.speechText}>{`"당신의 소울 컬러는 ${soulColor}입니다"`}</p>
      </div>
    </ResultLayout>
  );
}
