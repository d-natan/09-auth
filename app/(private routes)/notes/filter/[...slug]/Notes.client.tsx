"use client";

interface Props {
  slug?: string[];
}

export default function NotesClient({ slug }: Props) {
  return (
    <div>
      <h2>Filtered Notes</h2>

      <p>
        Filter: {slug?.join(", ") || "all"}
      </p>
    </div>
  );
}