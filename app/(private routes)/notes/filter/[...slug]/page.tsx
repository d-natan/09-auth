import NotesClient from "./Notes.client";

interface Props {
  params: { slug?: string[] };
}

export default function FilterPage({ params }: Props) {
  return <NotesClient slug={params.slug} />;
}