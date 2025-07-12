import { api } from "./api";
import { gateway } from "./imports";
import { AxiosRequestConfig } from "axios";
import config from "../config.json";

describe("Auth testing", () => {
  test("Register new client", async () => {
    const createUserDTO: gateway.dtos.CreateUserDTO = {
      login: "TestClient1",
      password: "StrongPassword123!@",
      role: gateway.enums.Roles.CLIENT,
    };
    const response = await api.auth.register(createUserDTO);

    expect(() => {
      new gateway.dtos.UserLoggedInDTO({ ...response.data });
    }).not.toThrow();
  });

  test("Register new host", async () => {
    const createUserDTO: gateway.dtos.CreateUserDTO = {
      login: "TestHost1",
      password: "StrongPassword123!@",
      role: gateway.enums.Roles.HOST,
    };
    const response = await api.auth.register(createUserDTO);

    expect(() => {
      new gateway.dtos.UserLoggedInDTO({ ...response.data });
    }).not.toThrow();
  });
});

describe("Client testing", () => {
  let clientConfig: AxiosRequestConfig;
  let hostConfig: AxiosRequestConfig;
  let invalidConfig: AxiosRequestConfig;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      api.auth.register({
        login: "CLIENT_TEST_1",
        password: "StrongPassword123!@",
        role: gateway.enums.Roles.CLIENT,
      }),
      api.auth.register({
        login: "HOST_TEST_1",
        password: "StrongPassword123!@",
        role: gateway.enums.Roles.HOST,
      }),
    ]);

    clientConfig = {
      headers: {
        Authorization: client.data.accessToken,
      },
    };

    hostConfig = {
      headers: {
        Authorization: host.data.accessToken,
      },
    };

    invalidConfig = {
      headers: {
        Authorization: "invalid_token",
      },
    };
  });

  test("Get me success", async () => {
    const response = await api.clients.getMe(clientConfig);

    expect(() => {
      new gateway.dtos.ClientDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Get me with invalid token", async () => {
    const response = await api.clients.getMe(invalidConfig);
    expect(response.status).toBe(401);
  });

  test("Get me with another role", async () => {
    const response = await api.clients.getMe(hostConfig);
    expect(response.status).toBe(403);
  });

  test("Update me success", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(updateClientDTO, clientConfig);

    expect(() => {
      new gateway.dtos.ClientUpdatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Update me with invalid token", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(updateClientDTO, invalidConfig);

    expect(response.status).toBe(401);
  });

  test("Update me with another role", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(updateClientDTO, hostConfig);

    expect(response.status).toBe(403);
  });

  test("Delete me success", async () => {
    const response = await api.clients.deleteMe(clientConfig);

    expect(() => {
      new gateway.dtos.ClientDeletedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Delete me with invalid token", async () => {
    const response = await api.clients.deleteMe(invalidConfig);

    expect(response.status).toBe(401);
  });

  test("Delete me with another role", async () => {
    const response = await api.clients.deleteMe(hostConfig);

    expect(response.status).toBe(403);
  });
});

describe("Client Bookings testing", () => {
  let clientConfig: AxiosRequestConfig;
  let hostConfig: AxiosRequestConfig;
  let invalidConfig: AxiosRequestConfig;
  let hostId: string;
  let testBookingId: string;
  let deleteBookingId: string;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      api.auth.register({
        login: "CLIENT_BOOKING_TEST_1",
        password: "StrongPassword123!@",
        role: gateway.enums.Roles.CLIENT,
      }),
      api.auth.register({
        login: "HOST_BOOKING_TEST_1",
        password: "StrongPassword123!@",
        role: gateway.enums.Roles.HOST,
      }),
    ]);

    clientConfig = {
      headers: {
        Authorization: client.data.accessToken,
      },
    };

    hostConfig = {
      headers: {
        Authorization: host.data.accessToken,
      },
    };

    invalidConfig = {
      headers: {
        Authorization: "invalid_token",
      },
    };

    const hostResponse = await api.hosts.getMe(hostConfig);
    hostId = hostResponse.data.id;

    const testBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T09:00:00Z",
      toDateTime: "2025-07-01T10:00:00Z",
    };
    const deleteBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T15:00:00Z",
      toDateTime: "2025-07-01T16:00:00Z",
    };
    const [testBookingResponse, deleteBookingResponse] = await Promise.all([
      api.clients.createBooking(testBookingDTO, clientConfig),
      api.clients.createBooking(deleteBookingDTO, clientConfig),
    ]);

    testBookingId = testBookingResponse.data.id;
    deleteBookingId = deleteBookingResponse.data.id;
  });

  test("Get my bookings success", async () => {
    const response = await api.clients.getMyBookings(clientConfig);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("Get my bookings with another role", async () => {
    const response = await api.clients.getMyBookings(hostConfig);
    expect(response.status).toBe(403);
  });

  test("Get my bookings with filters", async () => {
    const response = await api.clients.getMyBookings(clientConfig, {
      sortDirection: "DESC",
      sortProperty: "fromDateTime",
      fromDateTimeStart: "2025-01-01T00:00:00Z",
      toDateTime: "2025-12-31T23:59:59.999Z",
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("Get my bookings with exact date filters", async () => {
    const response = await api.clients.getMyBookings(clientConfig, {
      sortDirection: "DESC",
      sortProperty: "fromDateTime",
      fromDateTime: "2025-07-01T11:00:00Z",
      toDateTime: "2025-07-01T12:00:00Z",
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("Get my bookings with date range filters", async () => {
    const response = await api.clients.getMyBookings(clientConfig, {
      sortDirection: "DESC",
      sortProperty: "fromDateTime",
      fromDateTime: "2025-06-01T00:00:00Z",
      toDateTime: "2025-08-01T00:00:00Z",
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("Create booking success", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T11:00:00Z",
      toDateTime: "2025-07-01T12:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingCreatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(201);
  });

  test("Create booking with invalid token", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T12:00:00Z",
      toDateTime: "2025-07-01T13:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      invalidConfig,
    );
    expect(response.status).toBe(401);
  });

  test("Create booking with another role", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T14:00:00Z",
      toDateTime: "2025-07-01T15:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      hostConfig,
    );
    expect(response.status).toBe(403);
  });

  test("Create booking with invalid data", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: "invalid-host-id",
      fromDateTime: "2025-07-01T16:00:00Z",
      toDateTime: "2025-07-01T17:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Get booking by id success", async () => {
    const response = await api.clients.getBookingById(
      testBookingId,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(testBookingId);
  });

  test("Get booking by id with invalid token", async () => {
    const response = await api.clients.getBookingById(
      testBookingId,
      invalidConfig,
    );
    expect(response.status).toBe(401);
  });

  test("Get booking by id with another role", async () => {
    const response = await api.clients.getBookingById(
      testBookingId,
      hostConfig,
    );
    expect(response.status).toBe(403);
  });

  test("Get booking by id with invalid id", async () => {
    const response = await api.clients.getBookingById(
      "invalid-booking-id",
      clientConfig,
    );
    expect(response.status).toBe(404);
  });

  test("Update booking success", async () => {
    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T09:30:00Z",
      toDateTime: "2025-07-01T10:30:00Z",
    };

    const response = await api.clients.updateBooking(
      testBookingId,
      updateBookingDTO,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingUpdatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(testBookingId);
  });

  test("Update booking with invalid token", async () => {
    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T11:30:00Z",
      toDateTime: "2025-07-01T12:30:00Z",
    };

    const response = await api.clients.updateBooking(
      testBookingId,
      updateBookingDTO,
      invalidConfig,
    );
    expect(response.status).toBe(401);
  });

  test("Update booking with another role", async () => {
    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T12:30:00Z",
      toDateTime: "2025-07-01T13:30:00Z",
    };

    const response = await api.clients.updateBooking(
      testBookingId,
      updateBookingDTO,
      hostConfig,
    );
    expect(response.status).toBe(403);
  });

  test("Update booking with invalid id", async () => {
    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T13:00:00Z",
      toDateTime: "2025-07-01T14:00:00Z",
    };

    const response = await api.clients.updateBooking(
      "invalid-booking-id",
      updateBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(404);
  });

  test("Delete booking success", async () => {
    const response = await api.clients.deleteBooking(
      deleteBookingId,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingDeletedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Delete booking with invalid token", async () => {
    const response = await api.clients.deleteBooking(
      "any-booking-id",
      invalidConfig,
    );
    expect(response.status).toBe(401);
  });

  test("Delete booking with another role", async () => {
    const response = await api.clients.deleteBooking(
      "any-booking-id",
      hostConfig,
    );
    expect(response.status).toBe(403);
  });

  test("Delete booking with invalid id", async () => {
    const response = await api.clients.deleteBooking(
      "invalid-booking-id",
      clientConfig,
    );
    expect(response.status).toBe(404);
  });

  test("Create at not working hour", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T19:00:00Z",
      toDateTime: "2025-07-01T20:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking on weekend", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-06T10:00:00Z",
      toDateTime: "2025-07-06T11:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking across different days", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T23:00:00Z",
      toDateTime: "2025-07-02T01:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking during lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T13:30:00Z",
      toDateTime: "2025-07-01T13:45:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that spans lunch break (before to after lunch)", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T12:00:00Z",
      toDateTime: "2025-07-01T15:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that starts before lunch and ends during lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T12:00:00Z",
      toDateTime: "2025-07-01T13:30:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that starts during lunch and ends after lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T13:30:00Z",
      toDateTime: "2025-07-01T15:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking within single working period before lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T12:00:00Z",
      toDateTime: "2025-07-01T13:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
  });

  test("Create booking within single working period after lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T14:00:00Z",
      toDateTime: "2025-07-01T15:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();
  });

  test("Create valid booking within working hours", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T16:00:00Z",
      toDateTime: "2025-07-01T17:00:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);
  });

  test("Create overlapping booking - config allowOverlappingBookings behavior", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T09:30:00Z",
      toDateTime: "2025-07-01T10:30:00Z",
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );

    if (config.allowOverlappingBookings) {
      expect(response.status).toBe(200);
    } else {
      expect(response.status).toBe(400);
    }
  });

  test("Update booking to invalid time", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T15:00:00Z",
      toDateTime: "2025-07-01T16:00:00Z",
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);

    const bookingId = createResponse.data.id;

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T19:00:00Z",
      toDateTime: "2025-07-01T20:00:00Z",
    };

    const updateResponse = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      clientConfig,
    );
    expect(updateResponse.status).toBe(400);
  });

  test("Attempt to update deleted booking", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostId,
      fromDateTime: "2025-07-01T17:00:00Z",
      toDateTime: "2025-07-01T18:00:00Z",
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);
    const bookingId = createResponse.data.id;

    const deleteResponse = await api.clients.deleteBooking(
      bookingId,
      clientConfig,
    );
    expect(deleteResponse.status).toBe(200);

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      fromDateTime: "2025-07-01T11:00:00Z",
      toDateTime: "2025-07-01T12:00:00Z",
    };

    const updateResponse = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      clientConfig,
    );
    expect(updateResponse.status).toBe(404);
  });
});
