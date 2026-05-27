import { useState } from "react";
import pinkEffect from "../../assets/images/pinkEffect.png";
import { SajuOhaengInfoResult } from "./SajuOhaengInfoResult";
import { SajuAbilityInfoResult } from "./SajuAbilityInfoResult";
import { SajuCareerDetailResult } from "./SajuCareerDetailResult";
import { SajuCharacterResult } from "./SajuCharacterResult";
import { SajuAbilityResult } from "./SajuAbilityResult";
import { SajuLifeResult } from "./SajuLifeResult";
import { SajuBoosterResult } from "./SajuBoosterResult";
import { SajuFortuneResult } from "./SajuFortuneResult";
import { CoronalResults } from "./CoronalResults";
import type { ResultTab } from "./ResultLayout";
import styles from "./SajuInfoScrollPage.module.css";

export function SajuInfoScrollPage() {
  const [activeTab, setActiveTab] = useState<ResultTab>("캐릭터");

  return (
    <div className={styles.wrapper}>
      {/* 배경: 스파클 + 그라데이션 + 핑크이펙트 — 모두 고정 */}
      <div className={styles.fixedBg} />
      <div className={styles.fixedGradient} />
      <img src={pinkEffect} alt="" className={styles.fixedPink} />

      {/* 내용만 스크롤 */}
      <div className={styles.scroller}>
        {/* ── 기존 사주 결과 섹션 (상단) ── */}
        <SajuOhaengInfoResult hideBg />
        <SajuAbilityInfoResult hideBg />
        <SajuCareerDetailResult hideBg />

        {/* ── 새 탭 결과 섹션 (하단) ── */}
        {activeTab === "캐릭터" && <SajuCharacterResult onTabClick={setActiveTab} />}
        {activeTab === "능력치" && <SajuAbilityResult onTabClick={setActiveTab} />}
        {activeTab === "라이프" && <SajuLifeResult onTabClick={setActiveTab} />}
        {activeTab === "부스터" && <SajuBoosterResult onTabClick={setActiveTab} />}
        {activeTab === "운의 흐름" && <SajuFortuneResult onTabClick={setActiveTab} />}

        {/* 관상 결과 — 스크롤 최하단 */}
        <CoronalResults inlineMode />
      </div>
    </div>
  );
}
