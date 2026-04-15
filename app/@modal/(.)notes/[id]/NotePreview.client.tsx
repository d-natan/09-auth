"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );

  if (isError || !data)
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note</p>
      </Modal>
    );

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>
      <p>{data.createdAt}</p>

      <button onClick={() => router.back()}>Close</button>
    </Modal>
  );
}