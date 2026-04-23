"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { updateProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const [name, setName] =
    useState<string>(user?.username ?? "");

  const [loading, setLoading] =
    useState<boolean>(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    try {
      const updatedUser =
        await updateProfile({
          username: name,
        });

      setUser(updatedUser);

      router.push("/profile");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel(): void {
    router.back();
  }

  if (!user) return null;

  return (
    <div>
      <h1>Edit Profile</h1>

      <Image
        src={user.avatar}
        alt="avatar"
        width={120}
        height={120}
      />

      <p>Email: {user.email}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          Save
        </button>

        <button
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}