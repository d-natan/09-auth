import { axiosInstance } from "./axiosInstance";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// =====================
// AUTH
// =====================

export async function register(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await axiosInstance.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await axiosInstance.post<User>("/auth/login", data);
  return res.data;
}

export async function logOut(): Promise<void> {
  await axiosInstance.post("/auth/logout");
}

// =====================
// SESSION
// =====================

export async function checkSession() {
  const res = await axiosInstance.get("/auth/session");
  return res;
}

export async function getMe(): Promise<User> {
  const res = await axiosInstance.get<User>("/users/me");
  return res.data;
}

// =====================
// NOTES
// =====================

export async function fetchNotes(params: {
  page?: number;
  search?: string;
  tag?: string;
}): Promise<{
  notes: Note[];
  totalPages: number;
}> {
  const res = await axiosInstance.get("/notes", {
    params,
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axiosInstance.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: {
  title: string;
  content: string;
}): Promise<Note> {
  const res = await axiosInstance.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axiosInstance.delete<Note>(`/notes/${id}`);
  return res.data;
}