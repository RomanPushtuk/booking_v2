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
    getMyBookings: (
      config: AxiosRequestConfig,
      params?: {
        sortDirection?: string;
        sortProperty?: string;
        fromDateTime?: string;
        toDateTime?: string;
      },
    ) => {
      return axiosInstance.get<gateway.dtos.BookingDTO[]>(
        "/clients/me/bookings",
        { ...config, params },
      );
    },
    getBookingById: (bookingId: string, config: AxiosRequestConfig) => {
      return axiosInstance.get<gateway.dtos.BookingDTO>(
        `/clients/me/bookings/${bookingId}`,
        config,
      );
    },
    createBooking: (
      body: gateway.dtos.CreateClientBookingDTO,
      config: AxiosRequestConfig,
    ) => {
      return axiosInstance.post<gateway.dtos.BookingCreatedDTO>(
        "/clients/me/bookings",
        body,
        config,
      );
    },
    deleteBooking: (bookingId: string, config: AxiosRequestConfig) => {
      return axiosInstance.delete<gateway.dtos.BookingDeletedDTO>(
        `/clients/me/bookings/${bookingId}`,
        config,
      );
    },
    updateBooking: (
      bookingId: string,
      body: gateway.dtos.UpdateClientBookingDTO,
      config: AxiosRequestConfig,
    ) => {
      return axiosInstance.patch<gateway.dtos.BookingUpdatedDTO>(
        `/clients/me/bookings/${bookingId}`,
        body,
        config,
      );
    },
  },
  hosts: {
    getMe: (config: AxiosRequestConfig) => {
      return axiosInstance.get<gateway.dtos.HostDTO>("/hosts/me", config);
    },
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
