import { fetchTasks } from "@/src/action/notes";
import React from "react";
import Form from "./form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page() {
  const notes = await fetchTasks();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Form />
        <ul className="mt-12 space-y-4">
          {notes?.map((note: any) => (
            <div
              key={note.id}
              className="min-w-[300px] flex justify-between items-center"
            >
              <span>{note.text}</span>
              <Link href={`/notes/${note.id}`}>
                <Button>open</Button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}
