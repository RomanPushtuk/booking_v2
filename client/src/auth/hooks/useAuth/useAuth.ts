import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Outside of Auth context");
  return context;
};
