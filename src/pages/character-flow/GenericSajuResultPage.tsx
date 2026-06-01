import { useLayoutEffect, useState, type CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type CharacterId, CHARACTERS } from "@/constants/characters";
import styles from "./GenericSajuResultPage.module.css";

const DESIGN_W = 1920;

export function GenericSajuResultPage() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const charId = characterId as CharacterId;
  const config = CHARACTERS[charId];

  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_W);

  useLayoutEffect(() => {
    function update() {
      setScale(window.innerWidth / DESIGN_W);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!config) {
    return null; // Or some error state
  }

  const cssVars = { "--scale": scale } as CSSProperties;

  return (
    <div className={styles.viewport}>
      <div className={styles.scrollTrack} style={cssVars}>
        <div className={styles.canvas} style={cssVars}>
          <div
            className={styles.characterImgBox}
            style={{ backgroundImage: `url(${config.sajuResultImg})` }}
          />
          <div className={styles.textGroup}>
            <span className={styles.nameText}>{config.name}</span>
            <span className={styles.ageText}>{config.age}</span>
            <span className={styles.birthText}>{config.birth}</span>
          </div>
          <div className={styles.tagRow}>
            {config.tags.map((tag) => (
              <div key={tag} className={styles.tagBox}>
                <span className={styles.tagText}>{tag}</span>
              </div>
            ))}
          </div>
          <p className={styles.descText}>{config.description}</p>
          <div className={styles.scoreGroup}>
            {config.scoreItems.map(({ label, score, description }) => (
              <div key={label} className={styles.scoreRow}>
                <div className={styles.scoreButton}>
                  <span className={styles.scoreButtonText}>{label}</span>
                </div>
                <span className={styles.scoreValue}>{score}</span>
                {description && (
                  <div className={styles.descBox}>
                    <span className={styles.descBoxText}>{description}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.photoShootButton}
            onClick={() => navigate(`/photo-shoot/${charId}`)}
          >
            <span className={styles.photoShootButtonText}>네컷사진 찍기</span>
          </button>
          <div className={styles.sectionGroup}>
            {config.detailSections.map(({ title, body }) => (
              <div key={title} className={styles.section}>
                <div className={styles.fateBox}>
                  <span className={styles.fateBoxText}>{title}</span>
                </div>
                <div className={styles.fateDescBox}>
                  <p className={styles.fateDescText}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
