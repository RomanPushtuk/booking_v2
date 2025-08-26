import { createContext } from "react";

export interface AuthContextType {
  accessToken: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
