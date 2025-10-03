import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../model/user";
import { AuthContext } from "../hook/userContext";
import apiFetch from "../hook/useFetch";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [isLoginModalOpen, setIsModalLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored) as User;
      return {
        ...parsed,
        createAt: new Date(parsed.createAt),
        UpdateAt: new Date(parsed.UpdateAt),
      };
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handler = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("expiresAt")
      setToken("");
      setUser(null);
      setIsModalLogin(true);
    };

    window.addEventListener("auth:expired", handler);

    return () => {
      window.removeEventListener("auth:expired", handler);
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    const storedExpiresAt = localStorage.getItem("expiresAt");
    if (!storedExpiresAt) return;

    const expireAt = parseInt(storedExpiresAt, 10);
    const timeout = expireAt - Date.now();
    if (timeout <= 0) {
      window.dispatchEvent(new Event("auth:expired"));
      return;
    }
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("auth:expired"));
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);

  useEffect(() => {
    console.log(token);
    console.log(localStorage.getItem('expireAt'))
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const res = await apiFetch("login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(res)

      if (!res.ok) return false;
      const data = await res.json();
      if (data.expires_at) {
        console.log(new Date(data.expires_at));
        const expireAt = new Date(data.expires_at).getTime();
        localStorage.setItem("expiresAt", expireAt.toString());
      }

      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = async (token: string) => {
    if (!token) return false;
    try {
      const res = await apiFetch(
        "logout",
        {
          method: "POST",
        },
        token
      );
      if (res.ok) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");

        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateUser = async (data: Partial<User>, token: string) => {
    if (!token || !user) return;
    const formData = new FormData();
    formData.append("_method", "PUT");
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) formData.append(k, v as any);
    });
    const res = await apiFetch(
      "user",
      {
        method: "POST",
        body: formData,
      },
      token
    );
    if (!res.ok) throw new Error("Update user failed");
    const updated = await res.json();
    setUser({ ...updated.user });
    return updated.user;
  };

  const reset = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    token: string
  ) => {
    if (!token) throw new Error("No token");

    try {
      const res = await apiFetch(
        "changepassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: newPassword,
          }),
        },
        token
      );
      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          throw new Error(json.message || "Change password failed");
        } catch {
          throw new Error("Change password failed: " + text);
        }
      }

      return true;
    } catch (err) {
      console.error("Change password error:", err);
      return false;
    }
  };

  function requireLogin() {
    if (!token) {
      setIsModalLogin(true);
      return true;
    } else {
      return false;
    }
  }

  function closeLoginModal() {
    setIsModalLogin(false);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        changePassword,
        user,
        setUser,
        login,
        logout,
        updateUser,
        reset,
        error,
        setError,
        closeLoginModal,
        requireLogin,
        isLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
