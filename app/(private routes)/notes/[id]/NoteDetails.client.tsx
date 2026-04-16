"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";

import { Note } from "@/types/note";

export default function NoteDetailsClient({
  id,
}: {
  id: string;
}) {
  const { data, isLoading, isError } =
    useQuery<Note>({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>{data.tag}</p>
    </div>
  );
}