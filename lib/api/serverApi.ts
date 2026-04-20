import { axiosInstance } from "./axiosInstance";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

// =====================
// USER
// =====================

export async function getMe(
  cookieHeader: string
): Promise<User> {
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

// =====================
// SESSION
// =====================

export async function checkSession(
  cookieHeader: string
): Promise<AxiosResponse> {
  return axiosInstance.get(
    "/auth/session",
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  );
}

// =====================
// NOTE
// =====================

export async function fetchNoteById(
  id: string,
  cookieHeader: string
): Promise<Note> {
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