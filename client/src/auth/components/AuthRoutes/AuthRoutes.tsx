import { Route } from "react-router";
import { LoginPage } from "../../pages";

export const AuthRoutes = (
	<Route path="login">
		<Route index element={<LoginPage />} />
	</Route>
);
