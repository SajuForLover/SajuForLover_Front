import { useState, useEffect } from "react";
import { fetchCompatibility } from "@/api/characters";
import type { CharacterId } from "@/constants/characters";
import type { CompatibilityData } from "@/types/api";

export function useCompatibility(userId: string | null) {
  const [data, setData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchCompatibility(userId!);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [userId]);

  return { data, loading, error };
}
