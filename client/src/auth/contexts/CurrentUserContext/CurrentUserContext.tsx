import { createContext } from "react";

export interface CurrentUserContextType {
	id: string
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
