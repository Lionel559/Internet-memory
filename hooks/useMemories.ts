"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type ApiMemory = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  summary: string;
  category: string;
  isFavorite: boolean;
  savedAt: string;
};

export function useMemories() {
  const [memories, setMemories] = useState<ApiMemory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const response = await fetch("/api/memories");
        const data = await response.json();

        setMemories(data.memories || []);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemories();

    const channel = supabase
      .channel("memories-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "memories",
        },
        (payload) => {
          const newMemory: ApiMemory = {
            id: payload.new.id,
            title: payload.new.title,
            url: payload.new.url,
            favicon: payload.new.favicon || "",
            summary: payload.new.summary || "",
            category: payload.new.category || "Website",
            isFavorite: payload.new.is_favorite || false,
            savedAt: payload.new.saved_at,
          };

          setMemories((current) => [newMemory, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    memories,
    loading,
  };
}