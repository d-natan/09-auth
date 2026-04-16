import { cookies } from "next/headers";
import { axiosInstance } from "./axiosInstance";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// =====================
// COOKIE HELPER
// =====================
function getCookieHeader(): string {
  return cookies().toString();
}

// =====================
// USER
// =====================
export async function getMe(): Promise<User> {
  const res = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: getCookieHeader(), // ✅ string, не Promise
    },
  });

  return res.data;
}

// =====================
// SESSION CHECK
// =====================
export async function checkSession() {
  const res = await axiosInstance.get("/auth/session", {
    headers: {
      Cookie: getCookieHeader(), // ✅ string
    },
  });

  return res;
}

// =====================
// NOTES
// =====================
export async function fetchNoteById(
  id: string,
  cookieHeader?: string
): Promise<Note> {
  const res = await axiosInstance.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader ?? getCookieHeader(), // ✅ fallback
    },
  });

  return res.data;
}