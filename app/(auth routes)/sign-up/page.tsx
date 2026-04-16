"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { register, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(
    null
  );

  const [loading, setLoading] =
    useState<boolean>(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await register({
        email,
        password,
      });

      // 🔥 ОБОВ'ЯЗКОВО
      const user = await getMe();

      // 🔥 ОБОВ'ЯЗКОВО
      setUser(user);

      router.push("/profile");
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}