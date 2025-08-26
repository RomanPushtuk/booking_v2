import { useContext } from "react";
import { CurrentUserContext, CurrentUserContextType } from "../../contexts";

export const useCurrentUser = (): CurrentUserContextType => {
	const context = useContext(CurrentUserContext);
	if (!context) throw new Error("Outside of CurrentUser context");
	return context;
};
