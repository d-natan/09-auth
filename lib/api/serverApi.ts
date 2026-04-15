import { axiosInstance } from "./axiosInstance";
import { cookies } from "next/headers";

import { Note } from "@/types/note";
import { User } from "@/types/user";

/**
 * Формує Cookie header для server-side запитів
 */
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

/**
 * Отримати поточного користувача
 */
export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

/**
 * Перевірка/оновлення сесії (refresh token flow)
 */
export async function checkSession(): Promise<void> {
  const cookieHeader = await getCookieHeader();

  await axiosInstance.get("/auth/refresh", {
    headers: {
      Cookie: cookieHeader,
    },
  });
}

/**
 * Отримати нотатку по ID
 */
export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}