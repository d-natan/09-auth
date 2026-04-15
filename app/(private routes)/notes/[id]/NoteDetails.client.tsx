"use client";

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  return (
    <div>
      <h2>Note Details</h2>
      <p>Note ID: {id}</p>
    </div>
  );
}