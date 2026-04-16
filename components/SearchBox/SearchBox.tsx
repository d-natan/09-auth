"use client";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({
  value,
  onChange,
}: SearchBoxProps) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    onChange(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={handleChange}
    />
  );
}