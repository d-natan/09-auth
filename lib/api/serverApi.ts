import { axiosInstance } from "./axiosInstance";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

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
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

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
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

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