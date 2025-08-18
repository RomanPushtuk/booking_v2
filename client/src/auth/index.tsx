import { Route } from "react-router";
import { PrivateRoute } from "./components"
import { LoginPage } from "./pages";
import { AuthProvider, useAuth } from "./contexts"

const AuthRoutes = (
	<Route path="login">
		<Route index element={<LoginPage />} />
	</Route>
);

export { AuthRoutes, PrivateRoute, AuthProvider, useAuth };
