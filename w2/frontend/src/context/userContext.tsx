import{
  createContext,
  useContext,
} from "react";
import type { User } from "../model/user";

export interface AuthContextType {
  token: string;
  setToken: (t: string) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: (token:string) => Promise<boolean>;
  updateUser: (data: Partial<User>, token: string) => Promise<User | undefined>;
  reset: (user: User, token: string) => void;
  changePassword: (currentPassword: string, newPassword: string, token: string) => Promise<boolean>;
  error: string;
  setError: (e: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
