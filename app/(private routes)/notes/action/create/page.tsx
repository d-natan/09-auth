"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // тут буде API
    console.log("Create note:", title);

    router.push("/notes");
  };

  return (
    <div>
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}