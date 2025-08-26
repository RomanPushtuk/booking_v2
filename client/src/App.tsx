import { BrowserRouter, Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "./theme";

import * as auth from "./auth";
import * as client from "./client";
import * as admin from "./admin";
import * as monitoring from "./monitoring";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter basename="/">
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <auth.components.AuthProvider>
          <Routes>
            {auth.components.AuthRoutes}
            <Route element={<auth.components.PrivateRoute />}>
              {client.components.ClientRoutes}
              {admin.components.AdminRoutes}
              {monitoring.components.MonitoringRoutes}
            </Route>
          </Routes>
        </auth.components.AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export { App };
