import { Route } from "react-router";
import { HomePage } from "./pages";

const ClientRoutes = (
  <Route path="client">
    <Route index element={<HomePage />} />
  </Route>
);

export { ClientRoutes };
