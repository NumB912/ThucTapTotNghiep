import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../model/user";
import { AuthContext } from "./userContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [isLoginModalOpen,setIsModalLogin] = useState<boolean>(false)
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
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(res)
      if (!res.ok) return false;
      const data = await res.json();
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
      const res = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setToken("");
        setUser(null);
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
    const res = await fetch("http://127.0.0.1:8000/api/user", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
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

const changePassword = async (currentPassword: string, newPassword: string, token: string) => {
  if (!token) throw new Error("No token");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/user/changepassword", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPassword,
      }),
    });

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


  function requireLogin(){ 

    if(!token){
      setIsModalLogin(true)
      return true
    }
    else{
      return false
    }

  }

  function closeLoginModal(){
    setIsModalLogin(false)
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
        isLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
