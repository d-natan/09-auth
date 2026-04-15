import type { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      <aside style={{ width: "260px" }}>
        {sidebar}
      </aside>

      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}