import axios from 'axios';
import { gateway } from './imports';

const api = {
	public: {
		getHostById: () => { },
		getHostBookings: () => { },
	},
	auth: {
		register: (body: gateway.dtos.CreateUserDTO) => {
			return axios.post<gateway.dtos.UserLoggedInDTO>('/auth/register', body)
		},
		login: () => { },
	},
	clients: {
		getMe: () => { },
		deleteMe: () => { },
		getMyBookings: () => { },
		getBookingById: () => { },
		createBooking: () => { },
		deleteBooking: () => { },
		updateBooking: () => { },
	},
	hosts: {
		getMe: () => { },
		deleteMe: () => { },
		updateMe: () => { },
		getMyBookings: () => { },
		getBookingById: () => { },
		createBooking: () => { },
		deleteBooking: () => { },
		updateBooking: () => { },
		getMySettings: () => { },
		updateMySettings: () => { },
	},
}
