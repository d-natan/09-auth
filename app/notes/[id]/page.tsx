import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/notes";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 100),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 100),
      url: `https://notehub.app/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const note = await fetchNoteById(params.id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </main>
  );
}