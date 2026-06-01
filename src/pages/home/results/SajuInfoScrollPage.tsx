import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pinkEffect from "@/assets/images/pinkEffect.png";
import { ResponsiveLayout } from "@/components/results/ResponsiveLayout";
import {
  SajuOhaengInfoResult,
  SajuAbilityInfoResult,
  SajuCareerDetailResult,
  SajuBoosterDetailResult,
} from "./SajuDetailResults";
import { fetchSajuAnalysis } from "@/api/saju";
import type { UserSajuData } from "@/types/api";
import styles from "./SajuInfoScrollPage.module.css";

export function SajuInfoScrollPage() {
  const location = useLocation();
  const [sajuData, setSajuData] = useState<UserSajuData | null>(location.state?.sajuData || null);
  const [loading, setLoading] = useState(!sajuData);

  useEffect(() => {
    async function loadData() {
      if (sajuData) return;
      try {
        const userId = localStorage.getItem("saju_user_id");
        if (!userId) return;
        const { saju } = await fetchSajuAnalysis(userId);
        setSajuData(saju);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [sajuData]);

  if (loading || !sajuData) return null;

  return (
    <ResponsiveLayout designWidth={1920} designHeight={1080}>
      <div className={styles.wrapper}>
        <div className={styles.fixedBg} />
        <div className={styles.fixedGradient} />
        <img src={pinkEffect} alt="" className={styles.fixedPink} />

        <div className={styles.scroller}>
          <SajuOhaengInfoResult data={sajuData.five_elements} profile={sajuData.profile} />
          <SajuAbilityInfoResult stats={sajuData.stats} />
          <SajuCareerDetailResult career={sajuData.career} fortune={sajuData.fortune} />
          <SajuBoosterDetailResult fortune={sajuData.fortune} />

          <div className={styles.buttonWrapper}>
            <button
              onClick={() => window.location.href = '/coronal-result'}
              className={styles.navButton}
            >
              관상 결과 보러가기
            </button>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
