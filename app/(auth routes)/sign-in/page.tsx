"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { login, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const [email, setEmail] =
    useState<string>("");

  const [password, setPassword] =
    useState<string>("");

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState<boolean>(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      // отримуємо поточного користувача
      const user = await getMe();

      // зберігаємо у глобальному store
      setUser(user);

      // редірект після логіну
      router.push("/profile");

    } catch (error) {
      console.error(error);

      setError(
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "Sign In"}
        </button>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </div>
  );
}