"use client";

import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await login({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      });

      router.push("/profile");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className={css.input} required />
        </div>

        <button type="submit" className={css.submitButton}>
          Log in
        </button>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}