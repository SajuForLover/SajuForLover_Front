import { useState, useEffect } from "react";
import { initiateCompatibilityAnalysis, fetchExistingCompatibility } from "@/api/characters";
import type { CompatibilityData } from "@/types/api";

export function useCompatibility(userId: string | null) {
  const [data, setData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function pollData() {
      setLoading(true);
      try {
        // 1. 이미 존재하는지 먼저 확인
        let result = await fetchExistingCompatibility(userId!);
        
        // 2. 존재하지 않거나, 생성 요청 (이미 백그라운드에서 진행 중일 수도 있음)
        if (!result || result.characterId === 'pending') {
            void initiateCompatibilityAnalysis(userId!);
        } else {
            // 이미 완료된 결과가 있음
            if (isMounted) {
                setData(result);
                setLoading(false);
            }
            return;
        }

        // 3. 폴링 루프 (결과가 완료될 때까지)
        while (isMounted) {
          // 3초 대기
          await new Promise((resolve) => setTimeout(resolve, 3000));
          if (!isMounted) break;

          try {
            const res = await fetchExistingCompatibility(userId!);
            if (res && res.characterId !== 'pending') {
              if (isMounted) {
                setData(res);
                setLoading(false);
              }
              break;
            }
          } catch (pollErr) {
            console.error("Compatibility polling error:", pollErr);
            // 폴링 중 에러는 무시하고 계속 시도 (네트워크 일시 오류 등)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }

    void pollData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { data, loading, error };
}
