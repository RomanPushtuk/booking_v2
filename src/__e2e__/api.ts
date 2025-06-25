import axios from "axios";
import { gateway } from "./imports";

const base = "http://localhost:3000";

const axiosInstance = axios.create({ validateStatus: () => true });

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
        base + "/auth/login",
        body,
      );
    },
  },
  clients: {
    getMe: (accessToken: string) => {
      return axiosInstance.get<gateway.dtos.ClientDTO>(base + "/clients/me", {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
    },
    updateMe: (accessToken: string, body: gateway.dtos.UpdateClientDTO) => {
      return axiosInstance.patch<gateway.dtos.ClientUpdatedDTO>(
        base + "/clients/me",
        body,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );
    },
    deleteMe: (accessToken: string) => {
      return axiosInstance.delete<gateway.dtos.ClientDeletedDTO>(
        base + "/clients/me",
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );
    },
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
