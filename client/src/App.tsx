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
        <auth.AuthProvider>
          <Routes>
            {auth.AuthRoutes}
            <Route element={<auth.PrivateRoute />}>
              {client.ClientRoutes}
              {admin.AdminRoutes}
              {monitoring.MonitoringRoutes}
            </Route>
          </Routes>
        </auth.AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export { App };
