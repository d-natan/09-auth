import { axiosInstance } from "./axiosInstance";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// =====================
// AUTH
// =====================

export async function register(data: {
  email: string;
  password: string;
}): Promise<void> {
  await axiosInstance.post(
    "/auth/register",
    data
  );
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<void> {
  await axiosInstance.post(
    "/auth/login",
    data
  );
}

export async function logout(): Promise<void> {
  await axiosInstance.post(
    "/auth/logout"
  );
}

// =====================
// USER
// =====================

export async function getMe(): Promise<User> {
  const res =
    await axiosInstance.get(
      "/users/me"
    );

  return res.data;
}

export async function updateProfile(data: {
  name: string;
}): Promise<User> {
  const res =
    await axiosInstance.patch(
      "/users/me",
      data
    );

  return res.data;
}

// =====================
// NOTES
// =====================

type FetchNotesParams = {
  page: number;
  search?: string;
  tag?: string;
};

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const res =
    await axiosInstance.get(
      "/notes",
      {
        params,
      }
    );

  return res.data;
}

// =====================
// CREATE NOTE
// =====================

export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const res = await axiosInstance.post(
    "/notes",
    data
  );

  return res.data;
}

// DELETE NOTE

export async function deleteNote(
  id: string
): Promise<void> {
  await axiosInstance.delete(
    `/notes/${id}`
  );
}

// CHECK SESSION
export async function checkSession(): Promise<User> {
  const res = await axiosInstance.get(
    "/auth/session"
  );

  return res.data;
}

// 🔥 ВАЖЛИВО — ця функція була відсутня

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const res =
    await axiosInstance.get(
      `/notes/${id}`
    );

  return res.data;
}