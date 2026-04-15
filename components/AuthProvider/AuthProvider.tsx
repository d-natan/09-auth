"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { setUser, clearIsAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(true);

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // 1. перевіряємо сесію (refreshToken логіка на бекенді)
        await checkSession();

        // 2. якщо сесія валідна — отримуємо користувача
        const user = await getMe();

        setUser(user);
      } catch {
        // якщо щось не так — очищаємо стан
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [setUser, clearIsAuthenticated]);

  // якщо користувач не авторизований і йде в приватний роут
  useEffect(() => {
    if (!loading && isPrivateRoute) {
      const tokenExists = document.cookie.includes("accessToken");

      if (!tokenExists) {
        clearIsAuthenticated();
        router.replace("/sign-in");
      }
    }
  }, [loading, isPrivateRoute, router, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}