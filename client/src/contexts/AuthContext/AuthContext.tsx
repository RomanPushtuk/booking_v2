import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuthLogin } from "../../queries/bookingComponents";
import { useNavigate } from "react-router";

interface AuthContextType {
  accessToken: string | null;
  login: (login: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
      navigate("/admin");
    }
  }, []);

  const loginMutation = useAuthLogin();

  const login = async (login: string, password: string) => {
    await loginMutation.mutateAsync(
      { body: { login, password } },
      {
        onSuccess: (data) => {
          setAccessToken(data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/admin");
        },
      },
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
