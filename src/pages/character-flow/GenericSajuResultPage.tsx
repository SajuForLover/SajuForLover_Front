import { useLayoutEffect, useState, type CSSProperties, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { type CharacterId, CHARACTERS } from "@/constants/characters";
import { useCompatibility } from "@/hooks/useCompatibility";
import type { CompatibilityData } from "@/types/api";
import styles from "./GenericSajuResultPage.module.css";

const DESIGN_W = 1920;

export function GenericSajuResultPage() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("saju_user_id");
  
  // 이전 페이지(CoronalResults)에서 데이터를 넘겨줬는지 확인
  const stateData = location.state?.compatibilityData as CompatibilityData | undefined;
  
  // 데이터가 있으면 훅 실행 안함 (userId를 null로 전달)
  const { data: fetchedData, loading } = useCompatibility(!stateData ? userId : null);

  const compatibilityData = stateData || fetchedData;
  const charId = (compatibilityData?.characterId || characterId) as CharacterId;
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

  // characterId가 다르면 URL 업데이트
  useEffect(() => {
    if (compatibilityData && compatibilityData.characterId !== characterId) {
      navigate(`/character/${compatibilityData.characterId}`, { 
        replace: true,
        state: location.state // 상태 유지
      });
    }
  }, [compatibilityData, characterId, navigate, location.state]);

  if (!config || (loading && !compatibilityData)) {
    return (
      <div className={styles.viewport}>
        <div className={styles.loadingContainer}>
          <p>궁합을 분석하고 있어요...</p>
        </div>
      </div>
    );
  }

  const cssVars = { "--scale": scale } as CSSProperties;

  // 백엔드 데이터가 있으면 덮어쓰고, 없으면 기본값(config) 사용
  const scoreItems = compatibilityData?.scores || config.scoreItems;
  const detailSections = compatibilityData?.details || config.detailSections;

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
            {scoreItems.map(({ label, score, description }) => (
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
            {detailSections.map(({ title, body }) => (
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
