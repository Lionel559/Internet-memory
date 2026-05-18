"use client";

import { useEffect, useState } from "react";
import { ApiMemory } from "./useMemories";

export function useMemory(id: string) {
  const [memory, setMemory] = useState<ApiMemory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemory() {
      try {
        const response = await fetch("/api/memories");
        const data = await response.json();

        const foundMemory = data.memories?.find(
          (item: ApiMemory) => item.id === id
        );

        setMemory(foundMemory || null);
      } catch (error) {
        console.error("Failed to fetch memory:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemory();
  }, [id]);

  return {
    memory,
    loading,
  };
}