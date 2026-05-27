import pinkEffect from "../../assets/images/pinkEffect.png";
import { SajuOhaengInfoResult } from "./SajuOhaengInfoResult";
import { SajuAbilityInfoResult } from "./SajuAbilityInfoResult";
import { SajuCareerDetailResult } from "./SajuCareerDetailResult";
import { SajuCharacterResult } from "./SajuCharacterResult";
import styles from "./SajuInfoScrollPage.module.css";

export function SajuInfoScrollPage() {
  return (
    <div className={styles.wrapper}>
      {/* 배경: 스파클 + 그라데이션 + 핑크이펙트 — 모두 고정 */}
      <div className={styles.fixedBg} />
      <div className={styles.fixedGradient} />
      <img src={pinkEffect} alt="" className={styles.fixedPink} />

      {/* 내용만 스크롤 */}
      <div className={styles.scroller}>
        <SajuOhaengInfoResult hideBg />
        <SajuAbilityInfoResult hideBg />
        <SajuCareerDetailResult hideBg />
        <SajuCharacterResult />
      </div>
    </div>
  );
}
