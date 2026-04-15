"use client";

import { useEffect, useState } from "react";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const setUser = useAuthStore(
    (s) => s.setUser
  );

  const clearIsAuthenticated =
    useAuthStore(
      (s) => s.clearIsAuthenticated
    );

  useEffect(() => {
  const verify = async () => {
    try {
      const user = await checkSession();

      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    } catch {
      clearIsAuthenticated();
    } finally {
      setLoading(false);
    }
  };

  verify();
}, [setUser, clearIsAuthenticated]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
}