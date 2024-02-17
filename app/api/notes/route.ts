import { createSupabaseReqRes } from "@/lib/supabase/supabase-req-res";

export async function GET(request: Request) {
  const supabase = createSupabaseReqRes();
  let { data: notes, error } = await supabase.from("notes").select("*");
  return Response.json(notes, { status: 200 });
}
