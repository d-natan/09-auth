"use client";

import Link from "next/link";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
}

const mockNotes: Note[] = [
  { id: "1", title: "First Note", content: "Hello world", tag: "Todo" },
  { id: "2", title: "Second Note", content: "Work stuff", tag: "Work" },
];

export default function NotesClient() {
  return (
    <div>
      <h1>Notes</h1>

      <Link href="/notes/action/create">Create Note</Link>

      <ul>
        {mockNotes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}