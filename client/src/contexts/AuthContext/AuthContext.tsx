import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import { operationsByTag } from "../../queries/bookingComponents";
import { useMutation } from "@tanstack/react-query";

interface AuthContextType {
  accessToken: string | null;
  login: (login: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: operationsByTag.auth.authLogin,
  });

  const login = async (login: string, password: string) => {
    await loginMutation.mutateAsync(
      { body: { login, password } },
      { onSuccess: (data) => setAccessToken(data.accessToken) },
    );
  };

  return (
    <AuthContext.Provider value={{ accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Outside of Auth context");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
