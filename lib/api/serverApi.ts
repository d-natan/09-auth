import { axiosInstance } from "@/lib/api/axiosInstance";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

import { Note } from "@/types/note";
import { User } from "@/types/user";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function getMe(): Promise<User> {
  const res = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res.data;
}

export async function checkSession(): Promise<AxiosResponse> {
  const res = await axiosInstance.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const res = await axiosInstance.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return res.data;
}