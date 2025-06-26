import axios, { AxiosRequestConfig } from "axios";
import { gateway } from "./imports";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  validateStatus: () => true,
});

export const api = {
  public: {
    getHostById: () => {},
    getHostBookings: () => {},
  },
  auth: {
    register: (body: gateway.dtos.CreateUserDTO) => {
      return axiosInstance.post<gateway.dtos.UserLoggedInDTO>(
        "/auth/register",
        body,
      );
    },
    login: (body: gateway.dtos.LogInUserDTO) => {
      return axiosInstance.post<gateway.dtos.UserLoggedInDTO>(
        "/auth/login",
        body,
      );
    },
  },
  clients: {
    getMe: (config: AxiosRequestConfig) => {
      return axiosInstance.get<gateway.dtos.ClientDTO>("/clients/me", config);
    },
    updateMe: (
      body: gateway.dtos.UpdateClientDTO,
      config: AxiosRequestConfig,
    ) => {
      return axiosInstance.patch<gateway.dtos.ClientUpdatedDTO>(
        "/clients/me",
        body,
        config,
      );
    },
    deleteMe: (config: AxiosRequestConfig) => {
      return axiosInstance.delete<gateway.dtos.ClientDeletedDTO>(
        "/clients/me",
        config,
      );
    },
    getMyBookings: () => {},
    getBookingById: () => {},
    createBooking: (body: gateway.dtos.CreateBookingDTO) => {
      return axiosInstance.post<gateway.dtos.BookingCreatedDTO>(
        "/me/bookings",
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
