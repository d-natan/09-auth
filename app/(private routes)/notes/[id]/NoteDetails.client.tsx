"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";

import { Note } from "@/types/note";

type Props = {
  id: string;
};

export default function NoteDetailsClient({
  id,
}: Props) {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],

    queryFn: () => fetchNoteById(id),

    enabled: Boolean(id),
  });

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError || !data) {
    return <p>Error loading note</p>;
  }

  return (
    <div>
      <h1>{data.title}</h1>

      <p>{data.content}</p>

      {data.tag && (
        <p>
          <strong>Tag:</strong> {data.tag}
        </p>
      )}

      {data.createdAt && (
        <p>
          <strong>Created:</strong>{" "}
          {new Date(
            data.createdAt
          ).toLocaleString()}
        </p>
      )}
    </div>
  );
}