import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =============================
// Types
// =============================

export type NoteTag = "Todo" | "Work" | "Personal" | string;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

// =============================
// API functions
// =============================

// Get notes list with pagination
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params,
  });

  return data;
};

// Get note by id
export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
};

// Create note
export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);

  return data;
};

// Delete note
export const deleteNote = async (
  id: string
): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
