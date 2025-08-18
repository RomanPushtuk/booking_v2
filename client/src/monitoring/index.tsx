import { Route } from "react-router";
import { MonitoringPage } from "./pages";

const MonitoringRoutes = (
	<Route path="monitoring">
		<Route index element={<MonitoringPage />} />
	</Route>
)

export { MonitoringRoutes }
