import { cookies } from "next/headers";
import { axiosInstance } from "./axiosInstance";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

// USER
export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

// SESSION (ВАЖЛИВО: повертає відповідь)
export async function checkSession() {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}

// NOTES
export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}