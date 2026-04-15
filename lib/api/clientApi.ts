import { api } from "./api";
import { User } from "@/types/user";

interface AuthRequest {
  email: string;
  password: string;
}

export const register = async (
  data: AuthRequest
): Promise<User> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (
  data: AuthRequest
): Promise<User> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get("/auth/session");
  return res.data || null;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (
  username: string
): Promise<User> => {
  const res = await api.patch("/users/me", {
    username,
  });

  return res.data;
};

// NOTES TYPES
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

// GET all notes
export const fetchNotes = async (params: {
  page?: number;
  search?: string;
  tag?: string;
}) => {
  const res = await api.get("/notes", {
    params: {
      perPage: 12,
      ...params,
    },
  });

  return res.data;
};

// GET note by id
export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

// CREATE note
export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post("/notes", data);
  return res.data;
};

// DELETE note
export const deleteNote = async (
  id: string
): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};