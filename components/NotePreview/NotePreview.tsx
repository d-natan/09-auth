"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

async function fetchNote(id: string): Promise<Note> {
  const response = await axios.get(
    `https://notehub-public.goit.study/api/notes/${id}`
  );

  return response.data;
}

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>;

  if (!data) return null;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{data.title}</h2>

      <p className={css.content}>{data.content}</p>

      <span className={css.tag}>{data.tag}</span>
    </div>
  );
}