import { useState, useEffect } from "react";
import { fetchSajuAnalysis, fetchCoronalAnalysis } from "@/api/saju";
import type { UserSajuData, CoronalData } from "@/types/api";

export function useSaju(userId: string | null) {
  const [sajuData, setSajuData] = useState<UserSajuData | null>(null);
  const [coronalData, setCoronalData] = useState<CoronalData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function loadData() {
      setLoading(true);
      try {
        const [sajuRes, coronal] = await Promise.all([
          fetchSajuAnalysis(userId!),
          fetchCoronalAnalysis(userId!),
        ]);
        setSajuData(sajuRes.saju);
        setCoronalData(coronal);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [userId]);

  return { sajuData, coronalData, loading, error };
}
