import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

// =====================
// USER
// =====================
export async function getMe() {
  const res = await clientApi.get("/users/me");
  return res.data;
}

// =====================
// AUTH
// =====================
export async function login(data: { email: string; password: string }) {
  const res = await clientApi.post("/auth/login", data);
  return res.data;
}

export async function register(data: { email: string; password: string }) {
  const res = await clientApi.post("/auth/register", data);
  return res.data;
}

export async function logout() {
  const res = await clientApi.post("/auth/logout");
  return res.data;
}

// =====================
// USER
// =====================
export async function getUser() {
  const res = await clientApi.get("/users/me");
  return res.data;
}

// =====================
// NOTES
// =====================
export async function fetchNotes(params: {
  page: number;
  search?: string;
  tag?: string;
}) {
  const res = await clientApi.get("/notes", { params });
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await clientApi.get(`/notes/${id}`);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await clientApi.delete(`/notes/${id}`);
  return res.data;
}