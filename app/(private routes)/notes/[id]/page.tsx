interface Props {
  params: { id: string };
}

export default function NoteDetailsPage({ params }: Props) {
  return (
    <div>
      <h1>Note Details</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}