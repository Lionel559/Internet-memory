"use client";

import { useMemo, useState } from "react";
import { ApiMemory } from "./useMemories";

export function useSearch(memories: ApiMemory[]) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return memories;

    const searchValue = query.toLowerCase();

    return memories.filter((memory) => {
      return (
        memory.title.toLowerCase().includes(searchValue) ||
        memory.url.toLowerCase().includes(searchValue)
      );
    });
  }, [query, memories]);

  return {
    query,
    setQuery,
    results,
  };
}