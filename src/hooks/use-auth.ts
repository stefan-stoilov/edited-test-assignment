import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { setLsAuthStatus, mockDelay } from "../lib";
import type { LoginSchemaType } from "../models";

export function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const login = useCallback(
    async ({ username, password, shouldRememberUser }: LoginSchemaType) => {
      await mockDelay();
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, shouldRememberUser }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }

        setIsAuthenticated(true);
        setLsAuthStatus({ isAuthenticated: true, shouldRememberUser });
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          return error.message;
        }
        return "Unexpected error occurred.";
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await mockDelay();
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }

      setIsAuthenticated(false);
      setLsAuthStatus({ isAuthenticated: false });
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "Unexpected error occurred.";
    }
  }, []);

  const redirectToLogin = useCallback(() => {
    navigate("/login");
    setIsAuthenticated(false);
    setLsAuthStatus({ isAuthenticated: false });
  }, []);

  return { isAuthenticated, logout, login, redirectToLogin };
}
