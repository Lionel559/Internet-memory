import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("memories")
    .update({
      is_favorite: body.isFavorite,
    })
    .eq("id", id)
    .select("id, is_favorite")
    .single();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    memory: {
      id: data.id,
      isFavorite: data.is_favorite,
    },
  });
}