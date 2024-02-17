"use server";

import { createSupabaseReqRes } from "@/lib/supabase/supabase-req-res";
import { revalidatePath } from "next/cache";

export const fetchTasks = async () => {
  const supabase = createSupabaseReqRes();
  let { data, error } = await supabase.from("notes").select("*");
  if (!error) return data;
  else return [];
};

export const fetchTask = async (id: string) => {
  const supabase = createSupabaseReqRes();
  let { data, error } = await supabase.from("notes").select("*").eq("id", id);
  if (!error && data && data.length > 0) return data[0];
  else return null;
};

export const createTask = async (formData: any) => {
  const supabase = createSupabaseReqRes();
  let { data, error } = await supabase
    .from("notes")
    .insert([{ text: formData.get("text") }])
    .select();
  if (!error) {
    revalidatePath("/notes");
  }
};
