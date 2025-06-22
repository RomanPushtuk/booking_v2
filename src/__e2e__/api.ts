import axios from "axios";
import { gateway } from "./imports";

const base = "http://localhost:3000";

export const api = {
  public: {
    getHostById: () => {},
    getHostBookings: () => {},
  },
  auth: {
    register: (body: gateway.dtos.CreateUserDTO) => {
      return axios.post<gateway.dtos.UserLoggedInDTO>(
        base + "/auth/register",
        body,
      );
    },
    login: (body: gateway.dtos.LogInUserDTO) => {
      return axios.post<gateway.dtos.UserLoggedInDTO>(
        base + "/auth/register",
        body,
      );
    },
  },
  clients: {
    getMe: () => {},
    deleteMe: () => {},
    getMyBookings: () => {},
    getBookingById: () => {},
    createBooking: (body: gateway.dtos.CreateBookingDTO) => {
      return axios.post<gateway.dtos.BookingCreatedDTO>(
        base + "/me/bookings",
        body,
      );
    },
    deleteBooking: () => {},
    updateBooking: () => {},
  },
  hosts: {
    getMe: () => {},
    deleteMe: () => {},
    updateMe: () => {},
    getMyBookings: () => {},
    getBookingById: () => {},
    createBooking: () => {},
    deleteBooking: () => {},
    updateBooking: () => {},
    getMySettings: () => {},
    updateMySettings: () => {},
  },
};
