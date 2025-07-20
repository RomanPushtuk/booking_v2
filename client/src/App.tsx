import { BrowserRouter, Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HomePage,
  CreateBookingPage,
  BookingDetailsPage,
  LoginPage,
  CreateHostAdminPage,
  EditHostAdminPage,
  CreateClientAdminPage,
  EditClientAdminPage,
  CreateBookingAdminPage,
  EditBookingAdminPage,
  AdminDashboard,
  ListClientsAdminPage,
  ListHostsAdminPage,
  ListBookingsAdminPage,
} from "./pages";

import { theme } from "./theme";
import { AuthProvider } from "./contexts";
import { PrivateRoute } from "./widgets";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter basename="/">
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateBookingPage />} />
              <Route path="/details" element={<BookingDetailsPage />} />
              <Route path="/admin/hosts" element={<ListHostsAdminPage />} />
              <Route
                path="/admin/hosts/create"
                element={<CreateHostAdminPage />}
              />
              <Route path="/admin/hosts/edit" element={<EditHostAdminPage />} />
              <Route path="/admin/clients" element={<ListClientsAdminPage />} />
              <Route
                path="/admin/clients/create"
                element={<CreateClientAdminPage />}
              />
              <Route
                path="/admin/clients/edit"
                element={<EditClientAdminPage />}
              />
              <Route
                path="/admin/bookings"
                element={<ListBookingsAdminPage />}
              />
              <Route
                path="/admin/bookings/create"
                element={<CreateBookingAdminPage />}
              />
              <Route
                path="/admin/bookings/edit"
                element={<EditBookingAdminPage />}
              />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export { App };
