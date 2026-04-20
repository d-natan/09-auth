import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // 🔥 правильно збираємо cookies
  const cookieHeader = (await cookies())
  .getAll()
  .map(({ name, value }) => `${name}=${value}`)
  .join("; ");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id, cookieHeader),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}