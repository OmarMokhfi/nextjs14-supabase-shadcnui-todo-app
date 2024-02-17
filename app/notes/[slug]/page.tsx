import { fetchTask } from "@/src/action/notes";
import React from "react";

export default async function page({ params }: { params: { slug: string } }) {
  const note = await fetchTask(params.slug);
  return (
    <div className="h-screen w-scren grid place-items-center">{note.text}</div>
  );
}
