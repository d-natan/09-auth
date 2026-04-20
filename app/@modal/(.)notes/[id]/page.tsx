import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

import NotePreviewClient from "./NotePreview.client";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const cookieStore = await cookies();

  const cookieHeader =
    cookieStore
      .getAll()
      .map(
        (cookie) =>
          `${cookie.name}=${cookie.value}`
      )
      .join("; ");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],

    queryFn: () =>
      fetchNoteById(
        id,
        cookieHeader
      ),
  });

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}