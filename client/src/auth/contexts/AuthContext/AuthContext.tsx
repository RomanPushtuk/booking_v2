import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuthLogin } from "../../../queries/bookingComponents";
import { DefaultErrorProps } from "../../../queries/bookingFetcher";
import { useNavigate } from "react-router";

const FETCH_ERROR_CHANNEL = new BroadcastChannel("FETCH_ERROR_CHANNEL");

interface AuthContextType {
  accessToken: string | null;
  login: (login: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent<DefaultErrorProps>) => {
      const error = event.data;
      if ([500, 404].includes(error.code)) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };
    FETCH_ERROR_CHANNEL.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const { pathname, search } = window.location;
    // console.log(pathname + search);
    if (accessToken) {
      setAccessToken(accessToken);
      navigate(pathname + search);
    } else {
      navigate("/login");
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
