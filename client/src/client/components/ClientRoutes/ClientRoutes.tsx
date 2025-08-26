import { Route } from "react-router";
import { HomePage, ListHostsPage } from "../../pages";

const ClientRoutes = (
	<Route path="client">
		<Route index element={<HomePage />} />
		<Route path="hosts" element={<ListHostsPage />} />
	</Route>
);

export { ClientRoutes };
