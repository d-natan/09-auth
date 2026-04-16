import { axiosInstance } from "./axiosInstance";
import type { User } from "@/types/user";

// AUTH
export async function login(data: { email: string; password: string }) {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
}

export async function register(data: { email: string; password: string }) {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await axiosInstance.get("/users/me");
  return res.data;
}

// NOTES
export async function fetchNotes(params?: {
  page?: number;
  search?: string;
  tag?: string;
}) {
  const res = await axiosInstance.get("/notes", {
    params,
  });

  return res.data;
}