import { api } from "./api";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export async function register(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await api.post(
    "/auth/register",
    data
  );

  return res.data;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await api.post(
    "/auth/login",
    data
  );

  return res.data;
}

export async function logout(): Promise<User> {
  const res = await api.post(
    "/auth/logout"
  );

  return res.data;
}

export async function getMe(): Promise<User> {
  const res =
    await api.get(
      "/users/me"
    );

  return res.data;
}

export async function updateProfile(data: {
  username: string;
}): Promise<User> {
  const res = await api.patch(
    "/users/me",
    data
  );

  return res.data;
}

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
    await api.get(
      "/notes",
      {
        params,
      }
    );

  return res.data;
}

export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const res = await api.post(
    "/notes",
    data
  );

  return res.data;
}

export async function deleteNote(
  id: string
): Promise<Note> {
  const res = await api.delete(
    `/notes/${id}`
  );

  return res.data;
}

export async function checkSession(): Promise<User> {
  const res = await api.get(
    "/auth/session"
  );

  return res.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const res =
    await api.get(
      `/notes/${id}`
    );

  return res.data;
}