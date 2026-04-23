import { axiosInstance } from "./axiosInstance";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get(
    "/users/me",
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return res.data;
}

export async function checkSession(): Promise<AxiosResponse> {
  const cookieHeader = await getCookieHeader();

  return axiosInstance.get(
    "/auth/session",
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const cookieHeader = await getCookieHeader();

  const res = await axiosInstance.get(
    `/notes/${id}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return res.data;
}