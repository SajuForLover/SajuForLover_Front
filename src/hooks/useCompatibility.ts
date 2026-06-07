import { useState, useEffect } from "react";
import { fetchCompatibility, fetchExistingCompatibility } from "@/api/characters";
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
        
        if (result) {
          if (isMounted) {
            setData(result);
            setLoading(false);
          }
          return;
        }

        // 2. 존재하지 않으면 생성 요청 (이미 백그라운드에서 진행 중일 수도 있음)
        // 응답을 기다리지 않고 즉시 루프 진입하여 폴링함
        void fetchCompatibility(userId!);

        // 3. 폴링 루프
        while (isMounted) {
          // 2초 대기
          await new Promise((resolve) => setTimeout(resolve, 2000));
          if (!isMounted) break;

          try {
            const res = await fetchExistingCompatibility(userId!);
            if (res) {
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
