import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <aside>{sidebar}</aside>

      <main>{children}</main>
    </div>
  );
}