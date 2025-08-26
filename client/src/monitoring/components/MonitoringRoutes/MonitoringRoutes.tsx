import { Route } from "react-router";
import { MonitoringPage } from "../../pages";

export const MonitoringRoutes = (
	<Route path="monitoring">
		<Route index element={<MonitoringPage />} />
	</Route>
)
