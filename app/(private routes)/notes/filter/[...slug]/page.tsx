interface Props {
  params: { slug?: string[] };
}

export default function FilterPage({ params }: Props) {
  return (
    <div>
      <h1>Filter Notes</h1>
      <p>Slug: {params.slug?.join(", ")}</p>
    </div>
  );
}