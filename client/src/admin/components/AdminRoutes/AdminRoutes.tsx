import { Route } from "react-router";
import {
	AdminDashboard,
	CreateBookingAdminPage,
	CreateClientAdminPage,
	CreateHostAdminPage,
	EditBookingAdminPage,
	EditClientAdminPage,
	EditHostAdminPage,
	ListBookingsAdminPage,
	ListClientsAdminPage,
	ListHostsAdminPage,
} from "../../pages";

export const AdminRoutes = (
	<Route path="admin">
		<Route index element={<AdminDashboard />} />

		<Route path="hosts">
			<Route index element={<ListHostsAdminPage />} />
			<Route path="create" element={<CreateHostAdminPage />} />
			<Route path=":hostId" element={<EditHostAdminPage />} />
		</Route>

		<Route path="clients">
			<Route index element={<ListClientsAdminPage />} />
			<Route path="create" element={<CreateClientAdminPage />} />
			<Route path=":clientId" element={<EditClientAdminPage />} />
		</Route>

		<Route path="bookings">
			<Route index element={<ListBookingsAdminPage />} />
			<Route path="create" element={<CreateBookingAdminPage />} />
			<Route path=":bookingId" element={<EditBookingAdminPage />} />
		</Route>
	</Route>
);
