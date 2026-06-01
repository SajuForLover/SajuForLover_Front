import { useState, useEffect } from "react";
import { fetchCompatibility } from "@/api/characters";
import type { CharacterId } from "@/constants/characters";
import type { CompatibilityData } from "@/types/api";

export function useCompatibility(userId: string | null, characterId: CharacterId) {
  const [data, setData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId || !characterId) return;

    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchCompatibility(userId!, characterId);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [userId, characterId]);

  return { data, loading, error };
}
