"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseClientSide } from "@/lib/supabase/supabase-client-side";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<any>([]);
  const ref = useRef<HTMLInputElement>(null);

  const fetch = async () => {
    const supabase = createSupabaseClientSide();
    let { data, error } = await supabase.from("notes").select("*");
    if (!error) setNotes(data);
  };

  const createTask = async () => {
    const supabase = createSupabaseClientSide();
    const { data, error } = await supabase
      .from("notes")
      .insert([{ text: ref.current?.value }])
      .select();
    if (!error && data) {
      setNotes([...notes, data[0]]);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form
          className="flex w-full max-w-sm items-center gap-2"
          action={createTask}
        >
          <Input type="text" placeholder="New task" ref={ref} />
          <Button type="submit">Add</Button>
        </form>
        <div className="mt-12 space-y-4">
          {notes.map((note: any) => (
            <div
              key={note.id}
              className="min-w-[300px] flex justify-between items-center"
            >
              <span>{note.text}</span>
              <Link href={`/notes/${note.id}`}>
                <Button>Open</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
