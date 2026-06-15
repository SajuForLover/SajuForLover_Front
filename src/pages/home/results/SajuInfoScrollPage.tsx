import { useState, useEffect, useRef } from "react";
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
import { initiateCompatibilityAnalysis } from "@/api/characters";
import type { UserSajuData } from "@/types/api";
import styles from "@/styles/SajuInfoScrollPage.module.css";

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

  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!sajuData || hasRequestedRef.current) return;

    const userId = localStorage.getItem("saju_user_id");
    console.log("SajuInfoScrollPage - Attempting to request compatibility. userId:", userId, "sajuData:", sajuData);
    if (!userId) return;

    async function requestCompatibility() {
      hasRequestedRef.current = true;
      try {
        console.log("SajuInfoScrollPage - Sending POST request to /api/character");
        // 무조건 분석 요청(POST)을 보냅니다.
        await initiateCompatibilityAnalysis(userId!);
        console.log("궁합 분석 요청 성공");
      } catch (err) {
        console.error("궁합 분석 요청 실패:", err);
      }
    }
    
    // 이 컴포넌트가 마운트되고 sajuData가 준비되면 딱 한 번 요청
    requestCompatibility();
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
