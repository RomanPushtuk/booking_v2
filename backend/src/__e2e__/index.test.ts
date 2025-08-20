import { api } from "./api";
import { gateway } from "./imports";
import { AxiosRequestConfig } from "axios";
import config from "../config.json";
import { DateTime, Duration, WeekdayNumbers } from "luxon";
import { Days } from "../shared/enums/Days";

type TestUserConfig = AxiosRequestConfig & { userId: string };

async function createIsolatedUser(
  loginSuffix: string,
  role: gateway.enums.Roles,
): Promise<TestUserConfig> {
  const testUser = await api.auth.register({
    login: `${role}_${loginSuffix}`,
    password: "StrongPassword123!@",
    role: role,
  });

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: testUser.data.accessToken,
    },
  };

  const roleApiMap = {
    [gateway.enums.Roles.CLIENT]: api.clients.getMe,
    [gateway.enums.Roles.HOST]: api.hosts.getMe,
  } as const;

  const getMe = roleApiMap[role];
  if (!getMe) {
    throw new Error(`Unsupported role: ${role}`);
  }

  const userResponse = await getMe(config);

  return {
    headers: {
      Authorization: testUser.data.accessToken,
    },
    userId: userResponse.data.id,
  };
}

export function generateBookingDates(
  dayOfWeek: Days,
  startTime: string,
  duration: string,
  options: {
    timeZone?: string;
    inPast?: boolean;
    weeksOffset?: number;
  } = {},
): { fromDateTime: string; toDateTime: string } {
  const { timeZone = "UTC", inPast = false, weeksOffset = 1 } = options;

  const [hours, minutes] = startTime.split(":").map(Number);

  const now = DateTime.now().setZone(timeZone);

  const DayToNumber: Record<Days, WeekdayNumbers> = {
    [Days.MONDAY]: 1,
    [Days.TUESDAY]: 2,
    [Days.WEDNESDAY]: 3,
    [Days.THURSDAY]: 4,
    [Days.FRIDAY]: 5,
    [Days.SATURDAY]: 6,
    [Days.SUNDAY]: 7,
  };

  let targetDate = now.set({
    weekday: DayToNumber[dayOfWeek],
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0,
  });

  if (inPast) {
    if (targetDate >= now.startOf("day")) {
      targetDate = targetDate.minus({ weeks: weeksOffset });
    }
  } else {
    if (targetDate <= now || weeksOffset > 1) {
      targetDate = targetDate.plus({ weeks: weeksOffset });
    }
  }

  const durationObj = Duration.fromISO(duration);
  const endDate = targetDate.plus(durationObj);

  return {
    fromDateTime: targetDate.toISO()!,
    toDateTime: endDate.toISO()!,
  };
}

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
  let clientConfig: TestUserConfig;
  let hostConfig: TestUserConfig;
  let invalidConfig: AxiosRequestConfig;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      createIsolatedUser("CLIENT_TEST_1", gateway.enums.Roles.CLIENT),
      createIsolatedUser("HOST_TEST_1", gateway.enums.Roles.HOST),
    ]);

    clientConfig = client;
    hostConfig = host;

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
  let clientConfig: TestUserConfig;
  let hostConfig: TestUserConfig;
  let invalidConfig: AxiosRequestConfig;
  let testBookingId: string;
  let deleteBookingId: string;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      createIsolatedUser("CLIENT_BOOKING_TEST_1", gateway.enums.Roles.CLIENT),
      createIsolatedUser("HOST_BOOKING_TEST_1", gateway.enums.Roles.HOST),
    ]);

    clientConfig = client;
    hostConfig = host;

    invalidConfig = {
      headers: {
        Authorization: "invalid_token",
      },
    };

    const testBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.TUESDAY, "09:00", "PT1H"),
    };
    const deleteBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.FRIDAY, "09:00", "PT1H"),
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
      fromDateTime: "2025-01-01T00:00:00Z",
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
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "09:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingCreatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(201);

    await api.clients.deleteBooking(response.data.id, clientConfig);
  });

  test("Create booking outside working hours - client always restricted", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "06:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );

    expect(response.status).toBe(400);
  });

  test("Create booking in the past - client always restricted", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "10:00", "PT1H", {
        inPast: true,
        weeksOffset: 5,
      }),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );

    expect(response.status).toBe(400);
  });

  test("Create booking with invalid token", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "10:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      invalidConfig,
    );
    expect(response.status).toBe(401);
  });

  test("Create booking with another role", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "11:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      hostConfig,
    );
    expect(response.status).toBe(403);
  });

  test("Create booking with non-existent client", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: "invalid-host-id",
      ...generateBookingDates(Days.MONDAY, "12:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(404);
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
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.MONDAY, "09:00", "PT1H"),
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);
    const bookingId = createResponse.data.id;

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      ...generateBookingDates(Days.MONDAY, "10:00", "PT1H"),
    };

    const response = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      clientConfig,
    );

    expect(() => {
      new gateway.dtos.BookingUpdatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(bookingId);

    await api.clients.deleteBooking(bookingId, clientConfig);
  });

  test("Update booking with invalid token", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.TUESDAY, "11:00", "PT1H"),
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);
    const bookingId = createResponse.data.id;

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      ...generateBookingDates(Days.TUESDAY, "12:00", "PT1H"),
    };

    const response = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      invalidConfig,
    );
    expect(response.status).toBe(401);

    await api.clients.deleteBooking(bookingId, clientConfig);
  });

  test("Update booking with another role", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.TUESDAY, "15:00", "PT1H"),
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);
    const bookingId = createResponse.data.id;

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      ...generateBookingDates(Days.TUESDAY, "16:00", "PT1H"),
    };

    const response = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      hostConfig,
    );
    expect(response.status).toBe(403);

    await api.clients.deleteBooking(bookingId, clientConfig);
  });

  test("Update booking with invalid id", async () => {
    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      ...generateBookingDates(Days.TUESDAY, "17:00", "PT1H"),
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
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "19:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking on weekend", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.SATURDAY, "10:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking across different days", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "23:00", "PT2H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking during lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "13:30", "PT15M"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that spans lunch break (before to after lunch)", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "12:00", "PT3H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that starts before lunch and ends during lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "12:00", "PT1H30M"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking that starts during lunch and ends after lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "13:30", "PT1H30M"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(400);
  });

  test("Create booking within single working period before lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "12:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();

    await api.clients.deleteBooking(response.data.id, clientConfig);
  });

  test("Create booking within single working period after lunch", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "14:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);
    expect(response.data.id).toBeDefined();

    await api.clients.deleteBooking(response.data.id, clientConfig);
  });

  test("Create valid booking within working hours", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.WEDNESDAY, "16:00", "PT1H"),
    };

    const response = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(response.status).toBe(201);

    await api.clients.deleteBooking(response.data.id, clientConfig);
  });

  test("Create overlapping booking - config allowOverlappingBookings behavior", async () => {
    const overlappingBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.TUESDAY, "09:30", "PT1H"),
    };

    const response = await api.clients.createBooking(
      overlappingBookingDTO,
      clientConfig,
    );

    if (config.allowOverlappingBookings) {
      expect(response.status).toBe(201);
      await api.clients.deleteBooking(response.data.id, clientConfig);
    } else {
      expect(response.status).toBe(400);
    }
  });

  test("Update booking to invalid time", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.THURSDAY, "15:00", "PT1H"),
    };

    const createResponse = await api.clients.createBooking(
      createBookingDTO,
      clientConfig,
    );
    expect(createResponse.status).toBe(201);
    const bookingId = createResponse.data.id;

    const updateBookingDTO: gateway.dtos.UpdateClientBookingDTO = {
      ...generateBookingDates(Days.THURSDAY, "19:00", "PT1H"),
    };

    const updateResponse = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      clientConfig,
    );
    expect(updateResponse.status).toBe(400);

    await api.clients.deleteBooking(bookingId, clientConfig);
  });

  test("Attempt to update deleted booking", async () => {
    const createBookingDTO: gateway.dtos.CreateClientBookingDTO = {
      hostId: hostConfig.userId,
      ...generateBookingDates(Days.THURSDAY, "17:00", "PT1H"),
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
      ...generateBookingDates(Days.THURSDAY, "11:00", "PT1H"),
    };

    const updateResponse = await api.clients.updateBooking(
      bookingId,
      updateBookingDTO,
      clientConfig,
    );
    expect(updateResponse.status).toBe(404);
  });

  describe("Client Security Tests - Real Vulnerability Check", () => {
    let clientA: TestUserConfig;
    let clientB: TestUserConfig;
    let hostConfig: TestUserConfig;
    let bookingByClientA: string;

    beforeAll(async () => {
      const [client1, client2, host] = await Promise.all([
        createIsolatedUser("CLIENT_SECURITY_A", gateway.enums.Roles.CLIENT),
        createIsolatedUser("CLIENT_SECURITY_B", gateway.enums.Roles.CLIENT),
        createIsolatedUser("HOST_SECURITY", gateway.enums.Roles.HOST),
      ]);

      clientA = client1;
      clientB = client2;
      hostConfig = host;

      const bookingDTO: gateway.dtos.CreateClientBookingDTO = {
        hostId: hostConfig.userId,
        ...generateBookingDates(Days.MONDAY, "10:00", "PT1H"),
      };

      const response = await api.clients.createBooking(bookingDTO, clientA);
      expect(response.status).toBe(201);
      bookingByClientA = response.data.id;
    });

    test("Client B cannot read Client A's booking by ID", async () => {
      const response = await api.clients.getBookingById(
        bookingByClientA,
        clientB,
      );
      expect(response.status).toBe(404);

      const clientAResponse = await api.clients.getBookingById(
        bookingByClientA,
        clientA,
      );
      expect(clientAResponse.status).toBe(200);
      expect(clientAResponse.data.id).toBe(bookingByClientA);
    });

    test("Client B cannot update Client A's booking", async () => {
      const updateDTO: gateway.dtos.UpdateClientBookingDTO = {
        ...generateBookingDates(Days.MONDAY, "14:00", "PT1H"),
      };

      const response = await api.clients.updateBooking(
        bookingByClientA,
        updateDTO,
        clientB,
      );
      expect(response.status).toBe(404);

      const clientABooking = await api.clients.getBookingById(
        bookingByClientA,
        clientA,
      );
      expect(clientABooking.status).toBe(200);
      expect(clientABooking.data.fromDateTime).not.toContain("14:00");
    });

    test("Client B cannot delete Client A's booking", async () => {
      const response = await api.clients.deleteBooking(
        bookingByClientA,
        clientB,
      );
      expect(response.status).toBe(404);

      const clientABooking = await api.clients.getBookingById(
        bookingByClientA,
        clientA,
      );
      expect(clientABooking.status).toBe(200);
      expect(clientABooking.data.id).toBe(bookingByClientA);
    });

    afterAll(async () => {
      await api.clients.deleteBooking(bookingByClientA, clientA);
    });
  });
});

describe("Host testing", () => {
  let clientConfig: TestUserConfig;
  let hostConfig: TestUserConfig;
  let invalidConfig: AxiosRequestConfig;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      createIsolatedUser("CLIENT_TEST_HOST_2", gateway.enums.Roles.CLIENT),
      createIsolatedUser("HOST_TEST_2", gateway.enums.Roles.HOST),
    ]);

    clientConfig = client;
    hostConfig = host;

    invalidConfig = {
      headers: {
        Authorization: "invalid_token",
      },
    };
  });

  describe("Host Profile Management", () => {
    test("Get me success", async () => {
      const response = await api.hosts.getMe(hostConfig);

      expect(() => {
        new gateway.dtos.HostDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Get me with invalid token", async () => {
      const response = await api.hosts.getMe(invalidConfig);
      expect(response.status).toBe(401);
    });

    test("Get me with another role", async () => {
      const response = await api.hosts.getMe(clientConfig);
      expect(response.status).toBe(403);
    });

    test("Update me success", async () => {
      const testHostConfig = await createIsolatedUser(
        "UPDATE_SUCCESS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P3W",
        workHours: [{ from: "09:00", to: "17:00" }],
        workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);

      expect(() => {
        new gateway.dtos.HostUpdatedDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Update me with invalid token", async () => {
      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P2W",
      };

      const response = await api.hosts.updateMe(updateHostDTO, invalidConfig);

      expect(response.status).toBe(401);
    });

    test("Update me with another role", async () => {
      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P2W",
      };

      const response = await api.hosts.updateMe(updateHostDTO, clientConfig);

      expect(response.status).toBe(403);
    });

    test("Delete me success", async () => {
      const testHostConfig = await createIsolatedUser(
        "DELETE_SUCCESS",
        gateway.enums.Roles.HOST,
      );

      const response = await api.hosts.deleteMe(testHostConfig);

      expect(() => {
        new gateway.dtos.HostDeletedDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Delete me with invalid token", async () => {
      const response = await api.hosts.deleteMe(invalidConfig);

      expect(response.status).toBe(401);
    });

    test("Delete me with another role", async () => {
      const response = await api.hosts.deleteMe(clientConfig);

      expect(response.status).toBe(403);
    });

    test("Update with invalid ISO 8601 duration format", async () => {
      const testHostConfig = await createIsolatedUser(
        "ISO_INVALID",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P1X",
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(400);
    });

    test("Update with multiple invalid ISO 8601 duration formats", async () => {
      const testHostConfig = await createIsolatedUser(
        "ISO_MULTI",
        gateway.enums.Roles.HOST,
      );

      const invalidFormats = ["1W", "PP1W", "P1", "INVALID", ""];

      for (const invalidFormat of invalidFormats) {
        const updateHostDTO: gateway.dtos.UpdateHostDTO = {
          forwardBooking: invalidFormat,
        };

        const response = await api.hosts.updateMe(
          updateHostDTO,
          testHostConfig,
        );
        expect(response.status).toBe(400);
      }
    });

    test("Update with invalid work hours format - from > to", async () => {
      const testHostConfig = await createIsolatedUser(
        "WORK_HOURS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [{ from: "17:00", to: "09:00" }],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(400);
    });

    test("Update with invalid time format", async () => {
      const testHostConfig = await createIsolatedUser(
        "TIME_FORMAT",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [{ from: "25:00", to: "26:00" }],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(400);
    });

    test("Update with invalid work days", async () => {
      const testHostConfig = await createIsolatedUser(
        "INVALID_DAYS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workDays: ["INVALID_DAY", "ANOTHER_INVALID"],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(400);
    });

    test("Partial update - only forwardBooking", async () => {
      const testHostConfig = await createIsolatedUser(
        "PARTIAL_UPDATE",
        gateway.enums.Roles.HOST,
      );

      const getResponse = await api.hosts.getMe(testHostConfig);
      const originalWorkHours = getResponse.data.workHours;
      const originalWorkDays = getResponse.data.workDays;

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P2W",
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(200);

      const updatedResponse = await api.hosts.getMe(testHostConfig);
      expect(updatedResponse.data.forwardBooking).toBe("P2W");
      expect(updatedResponse.data.workHours).toEqual(originalWorkHours);
      expect(updatedResponse.data.workDays).toEqual(originalWorkDays);
    });

    test("Update with overlapping work hours", async () => {
      const testHostConfig = await createIsolatedUser(
        "OVERLAP_HOURS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [
          { from: "09:00", to: "13:00" },
          { from: "12:00", to: "15:00" },
        ],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(400);
    });

    test("Update with gap in work hours (lunch break)", async () => {
      const testHostConfig = await createIsolatedUser(
        "LUNCH_BREAK",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [
          { from: "09:00", to: "12:00" },
          { from: "13:00", to: "17:00" },
        ],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(200);
    });

    test("Update with empty work hours array", async () => {
      const testHostConfig = await createIsolatedUser(
        "EMPTY_HOURS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(200);
    });

    test("Update with empty work days array", async () => {
      const testHostConfig = await createIsolatedUser(
        "EMPTY_DAYS",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workDays: [],
      };

      const response = await api.hosts.updateMe(updateHostDTO, testHostConfig);
      expect(response.status).toBe(200);
    });
  });

  describe("Host Bookings Management", () => {
    let bookingId: string;
    let testHostConfig: TestUserConfig;
    let testClientConfig: TestUserConfig;

    beforeAll(async () => {
      const [testHost, testClient] = await Promise.all([
        createIsolatedUser("HOST_BOOKINGS_TEST", gateway.enums.Roles.HOST),
        createIsolatedUser("CLIENT_BOOKINGS_TEST", gateway.enums.Roles.CLIENT),
      ]);

      testHostConfig = testHost;
      testClientConfig = testClient;

      const bookingResponses = await Promise.all([
        api.clients.createBooking(
          {
            hostId: testHostConfig.userId,
            ...generateBookingDates(Days.FRIDAY, "09:00", "PT1H"),
          },
          testClientConfig,
        ),
        api.clients.createBooking(
          {
            hostId: testHostConfig.userId,
            ...generateBookingDates(Days.FRIDAY, "10:00", "PT1H"),
          },
          testClientConfig,
        ),
        api.clients.createBooking(
          {
            hostId: testHostConfig.userId,
            ...generateBookingDates(Days.FRIDAY, "11:00", "PT1H"),
          },
          testClientConfig,
        ),
      ]);
      bookingId = bookingResponses[0].data.id;
    });

    test("Get my bookings success", async () => {
      const response = await api.hosts.getMyBookings(testHostConfig);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("Get my bookings with invalid token", async () => {
      const response = await api.hosts.getMyBookings(invalidConfig);
      expect(response.status).toBe(401);
    });

    test("Get my bookings with another role", async () => {
      const response = await api.hosts.getMyBookings(clientConfig);
      expect(response.status).toBe(403);
    });

    test("Create booking success", async () => {
      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.WEDNESDAY, "10:00", "PT1H"),
        info: {
          title: "Test Booking",
          description: "Test booking description",
        },
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );

      expect(() => {
        new gateway.dtos.BookingCreatedDTO({ ...response.data });
      }).not.toThrow();
      expect(response.status).toBe(201);
      bookingId = response.data.id;
    });

    test("Create booking with invalid token", async () => {
      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.WEDNESDAY, "11:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        invalidConfig,
      );

      expect(response.status).toBe(401);
    });

    test("Create booking with another role", async () => {
      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.WEDNESDAY, "12:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        clientConfig,
      );

      expect(response.status).toBe(403);
    });

    test("Get booking by id success", async () => {
      const response = await api.hosts.getBookingById(
        bookingId,
        testHostConfig,
      );

      expect(() => {
        new gateway.dtos.BookingDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Get booking by id with invalid token", async () => {
      const response = await api.hosts.getBookingById(bookingId, invalidConfig);
      expect(response.status).toBe(401);
    });

    test("Get booking by id with another role", async () => {
      const response = await api.hosts.getBookingById(bookingId, clientConfig);
      expect(response.status).toBe(403);
    });

    test("Update booking success", async () => {
      const updateHostBookingDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.WEDNESDAY, "15:00", "PT1H"),
      };

      const response = await api.hosts.updateBooking(
        bookingId,
        updateHostBookingDTO,
        testHostConfig,
      );

      expect(() => {
        new gateway.dtos.BookingUpdatedDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Update booking with invalid token", async () => {
      const updateHostBookingDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.WEDNESDAY, "16:00", "PT1H"),
      };

      const response = await api.hosts.updateBooking(
        bookingId,
        updateHostBookingDTO,
        invalidConfig,
      );

      expect(response.status).toBe(401);
    });

    test("Update booking with another role", async () => {
      const updateHostBookingDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.WEDNESDAY, "17:00", "PT1H"),
      };

      const response = await api.hosts.updateBooking(
        bookingId,
        updateHostBookingDTO,
        clientConfig,
      );

      expect(response.status).toBe(403);
    });

    test("Delete booking success", async () => {
      const response = await api.hosts.deleteBooking(bookingId, testHostConfig);

      expect(() => {
        new gateway.dtos.BookingDeletedDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Delete booking with invalid token", async () => {
      const response = await api.hosts.deleteBooking(bookingId, invalidConfig);
      expect(response.status).toBe(401);
    });

    test("Delete booking with another role", async () => {
      const response = await api.hosts.deleteBooking(bookingId, clientConfig);
      expect(response.status).toBe(403);
    });

    test("Host creates booking outside own working hours", async () => {
      const isolatedHostConfig = await createIsolatedUser(
        "WORKING_HOURS_TEST",
        gateway.enums.Roles.HOST,
      );
      const isolatedClientConfig = await createIsolatedUser(
        "WORKING_HOURS_TEST",
        gateway.enums.Roles.CLIENT,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [{ from: "09:00", to: "17:00" }],
        workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      };
      await api.hosts.updateMe(updateHostDTO, isolatedHostConfig);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: isolatedClientConfig.userId,
        ...generateBookingDates(Days.THURSDAY, "18:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        isolatedHostConfig,
      );

      if (config.allowHostWorkingHoursOverride) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });

    test("Host creates booking on non-working day", async () => {
      const isolatedHostConfig = await createIsolatedUser(
        "NON_WORKING_DAY_TEST",
        gateway.enums.Roles.HOST,
      );
      const isolatedClientConfig = await createIsolatedUser(
        "NON_WORKING_DAY_TEST",
        gateway.enums.Roles.CLIENT,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workDays: ["MONDAY", "TUESDAY", "WEDNESDAY"],
      };
      await api.hosts.updateMe(updateHostDTO, isolatedHostConfig);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: isolatedClientConfig.userId,
        ...generateBookingDates(Days.FRIDAY, "10:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        isolatedHostConfig,
      );

      if (config.allowHostWorkingHoursOverride) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });

    test("Host creates overlapping booking - config allowOverlappingBookings behavior", async () => {
      const [testHostConfig, client1Config, client2Config] = await Promise.all([
        createIsolatedUser("OVERLAP_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser("OVERLAP_CLIENT_1", gateway.enums.Roles.CLIENT),
        createIsolatedUser("OVERLAP_CLIENT_2", gateway.enums.Roles.CLIENT),
      ]);

      const firstBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: client1Config.userId,
        ...generateBookingDates(Days.THURSDAY, "10:00", "PT1H"),
      };
      const firstResponse = await api.hosts.createBooking(
        firstBookingDTO,
        testHostConfig,
      );
      expect(firstResponse.status).toBe(201);

      const overlappingBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: client2Config.userId,
        ...generateBookingDates(Days.THURSDAY, "10:30", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        overlappingBookingDTO,
        testHostConfig,
      );

      if (config.allowOverlappingBookings) {
        expect(response.status).toBe(201);
        await api.hosts.deleteBooking(firstResponse.data.id, testHostConfig);
        await api.hosts.deleteBooking(response.data.id, testHostConfig);
      } else {
        expect(response.status).toBe(400);
        await api.hosts.deleteBooking(firstResponse.data.id, testHostConfig);
      }
    });

    test("Host creates booking with non-existent client", async () => {
      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: "non-existent-client-id",
        ...generateBookingDates(Days.FRIDAY, "10:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        hostConfig,
      );
      expect(response.status).toBe(404);
    });

    test("Host creates booking in the past - config allowHostPastTimeBookings behavior", async () => {
      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("PAST_BOOKING_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser("PAST_BOOKING_CLIENT", gateway.enums.Roles.CLIENT),
      ]);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.FRIDAY, "10:00", "PT1H", {
          inPast: true,
          weeksOffset: 10,
        }),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );

      if (config.allowHostPastTimeBookings) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });

    test("Host creates booking beyond forwardBooking limit", async () => {
      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("FORWARD_BOOKING_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser(
          "FORWARD_BOOKING_CLIENT",
          gateway.enums.Roles.CLIENT,
        ),
      ]);

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P1W",
      };
      await api.hosts.updateMe(updateHostDTO, testHostConfig);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.FRIDAY, "10:00", "PT1H", {
          weeksOffset: 26,
        }),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );
      if (config.allowHostForwardBookingOverride) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });

    test("Host updates booking to overlap with existing", async () => {
      const [testHostConfig, testClient1Config, testClient2Config] =
        await Promise.all([
          createIsolatedUser("OVERLAP_HOST", gateway.enums.Roles.HOST),
          createIsolatedUser("OVERLAP_CLIENT_1", gateway.enums.Roles.CLIENT),
          createIsolatedUser("OVERLAP_CLIENT_2", gateway.enums.Roles.CLIENT),
        ]);

      const booking1DTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClient1Config.userId,
        ...generateBookingDates(Days.FRIDAY, "09:00", "PT1H"),
      };
      const booking2DTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClient2Config.userId,
        ...generateBookingDates(Days.FRIDAY, "11:00", "PT1H"),
      };

      const [booking1Response, booking2Response] = await Promise.all([
        api.hosts.createBooking(booking1DTO, testHostConfig),
        api.hosts.createBooking(booking2DTO, testHostConfig),
      ]);

      expect(booking1Response.status).toBe(201);
      expect(booking2Response.status).toBe(201);

      const updateBookingDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.FRIDAY, "09:30", "PT1H"),
      };

      const updateResponse = await api.hosts.updateBooking(
        booking2Response.data.id,
        updateBookingDTO,
        testHostConfig,
      );

      if (config.allowOverlappingBookings) {
        expect(updateResponse.status).toBe(200);
      } else {
        expect(updateResponse.status).toBe(400);
      }

      await api.hosts.deleteBooking(booking1Response.data.id, testHostConfig);
      await api.hosts.deleteBooking(booking2Response.data.id, testHostConfig);
    });

    test("Host creates booking during lunch break", async () => {
      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("LUNCH_BREAK_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser("LUNCH_BREAK_CLIENT", gateway.enums.Roles.CLIENT),
      ]);

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [
          { from: "09:00", to: "12:00" },
          { from: "13:00", to: "17:00" },
        ],
      };
      await api.hosts.updateMe(updateHostDTO, testHostConfig);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.FRIDAY, "12:30", "PT15M"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );

      if (config.allowHostWorkingHoursOverride) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });

    test("Host creates booking spanning lunch break", async () => {
      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("SPAN_LUNCH_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser("SPAN_LUNCH_CLIENT", gateway.enums.Roles.CLIENT),
      ]);

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        workHours: [
          { from: "09:00", to: "12:00" },
          { from: "13:00", to: "17:00" },
        ],
      };
      await api.hosts.updateMe(updateHostDTO, testHostConfig);

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.FRIDAY, "11:00", "PT3H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );
      if (config.allowHostWorkingHoursOverride) {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(400);
      }
    });
  });

  describe("Public Host API", () => {
    test("Get hosts list success", async () => {
      const response = await api.public.getHosts();

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("Get host by id success", async () => {
      const response = await api.public.getHostById(hostConfig.userId);

      expect(() => {
        new gateway.dtos.HostDTO({ ...response.data });
      }).not.toThrow();

      expect(response.status).toBe(200);
    });

    test("Get host bookings success", async () => {
      const response = await api.public.getHostBookings(hostConfig.userId);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("Get host bookings with ASC sorting", async () => {
      const response = await api.public.getHostBookings(hostConfig.userId, {
        sortDirection: "ASC",
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("Get host bookings with DESC sorting", async () => {
      const response = await api.public.getHostBookings(hostConfig.userId, {
        sortDirection: "DESC",
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test("Get host bookings with invalid host id", async () => {
      const response = await api.public.getHostBookings("invalid-host-id");
      expect(response.status).toBe(404);
    });

    test("Get host by invalid id", async () => {
      const response = await api.public.getHostById("invalid-id");
      expect(response.status).toBe(404);
    });

    test("Get host bookings shows only future bookings within forwardBooking", async () => {
      const testHostConfig = await createIsolatedUser(
        "TIME_TEST_HOST",
        gateway.enums.Roles.HOST,
      );

      const updateHostDTO: gateway.dtos.UpdateHostDTO = {
        forwardBooking: "P1W",
      };
      await api.hosts.updateMe(updateHostDTO, testHostConfig);

      const response = await api.public.getHostBookings(testHostConfig.userId);
      expect(response.status).toBe(200);

      const now = new Date();
      response.data.forEach((booking: { fromDateTime: string }) => {
        const bookingDate = new Date(booking.fromDateTime);
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        expect(bookingDate.getTime()).toBeGreaterThan(now.getTime());
        expect(bookingDate.getTime()).toBeLessThanOrEqual(
          weekFromNow.getTime(),
        );
      });
    });

    test("Get host bookings doesn't show past bookings", async () => {
      const response = await api.public.getHostBookings(hostConfig.userId);
      expect(response.status).toBe(200);

      const now = new Date();
      response.data.forEach((booking: { fromDateTime: string }) => {
        const bookingDate = new Date(booking.fromDateTime);
        expect(bookingDate.getTime()).toBeGreaterThan(now.getTime());
      });
    });

    test("Get host bookings doesn't show deleted bookings", async () => {
      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("DELETED_BOOKING_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser(
          "DELETED_BOOKING_CLIENT",
          gateway.enums.Roles.CLIENT,
        ),
      ]);

      const createBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.SUNDAY, "10:00", "PT1H"),
      };

      const createResponse = await api.hosts.createBooking(
        createBookingDTO,
        testHostConfig,
      );
      expect(createResponse.status).toBe(201);

      const deleteResponse = await api.hosts.deleteBooking(
        createResponse.data.id,
        testHostConfig,
      );
      expect(deleteResponse.status).toBe(200);
      const publicResponse = await api.public.getHostBookings(
        testHostConfig.userId,
      );
      expect(publicResponse.status).toBe(200);

      const deletedBooking = publicResponse.data.find(
        (booking: { id: string }) => booking.id === createResponse.data.id,
      );
      expect(deletedBooking).toBeUndefined();
    });

    test("Get deleted host by id returns 404", async () => {
      const testHostConfig = await createIsolatedUser(
        "TO_DELETE_HOST",
        gateway.enums.Roles.HOST,
      );

      const beforeDeleteResponse = await api.public.getHostById(
        testHostConfig.userId,
      );
      expect(beforeDeleteResponse.status).toBe(200);

      const deleteResponse = await api.hosts.deleteMe(testHostConfig);
      expect(deleteResponse.status).toBe(200);

      const afterDeleteResponse = await api.public.getHostById(
        testHostConfig.userId,
      );
      expect(afterDeleteResponse.status).toBe(404);
    });

    test("Get host bookings with deleted host returns 404", async () => {
      const testHostConfig = await createIsolatedUser(
        "DELETED_HOST_BOOKINGS",
        gateway.enums.Roles.HOST,
      );

      await api.hosts.deleteMe(testHostConfig);

      const response = await api.public.getHostBookings(testHostConfig.userId);
      expect(response.status).toBe(404);
    });
  });

  describe("Host Business Rules Validation", () => {
    test("Valid ISO 8601 duration formats", async () => {
      const testHostConfig = await createIsolatedUser(
        "VALID_ISO_HOST",
        gateway.enums.Roles.HOST,
      );

      const validFormats = [
        "P1D",
        "P1W",
        "P1M",
        "P1Y",
        "PT1H",
        "PT30M",
        "P1DT2H30M",
      ];

      for (const validFormat of validFormats) {
        const updateHostDTO: gateway.dtos.UpdateHostDTO = {
          forwardBooking: validFormat,
        };

        const response = await api.hosts.updateMe(
          updateHostDTO,
          testHostConfig,
        );
        expect(response.status).toBe(200);
      }
    });
  });

  describe("Host Security Tests - Real Vulnerability Check", () => {
    let hostA: TestUserConfig;
    let hostB: TestUserConfig;
    let clientConfig: TestUserConfig;
    let bookingByHostA: string;

    beforeAll(async () => {
      const [host1, host2, client] = await Promise.all([
        createIsolatedUser("HOST_SECURITY_A", gateway.enums.Roles.HOST),
        createIsolatedUser("HOST_SECURITY_B", gateway.enums.Roles.HOST),
        createIsolatedUser("CLIENT_SECURITY", gateway.enums.Roles.CLIENT),
      ]);

      hostA = host1;
      hostB = host2;
      clientConfig = client;

      const bookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: clientConfig.userId,
        ...generateBookingDates(Days.WEDNESDAY, "10:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(bookingDTO, hostA);
      expect(response.status).toBe(201);
      bookingByHostA = response.data.id;
    });

    test("Host B cannot read Host A's booking by ID", async () => {
      const response = await api.hosts.getBookingById(bookingByHostA, hostB);
      expect(response.status).toBe(404);

      const hostAResponse = await api.hosts.getBookingById(
        bookingByHostA,
        hostA,
      );
      expect(hostAResponse.status).toBe(200);
      expect(hostAResponse.data.id).toBe(bookingByHostA);
    });

    test("Host B cannot update Host A's booking", async () => {
      const updateDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.WEDNESDAY, "14:00", "PT1H"),
      };

      const response = await api.hosts.updateBooking(
        bookingByHostA,
        updateDTO,
        hostB,
      );
      expect(response.status).toBe(404);

      const hostABooking = await api.hosts.getBookingById(
        bookingByHostA,
        hostA,
      );
      expect(hostABooking.status).toBe(200);
      expect(hostABooking.data.fromDateTime).not.toContain("14:00");
    });

    test("Host B cannot delete Host A's booking", async () => {
      const response = await api.hosts.deleteBooking(bookingByHostA, hostB);
      expect(response.status).toBe(404);

      const hostABooking = await api.hosts.getBookingById(
        bookingByHostA,
        hostA,
      );
      expect(hostABooking.status).toBe(200);
      expect(hostABooking.data.id).toBe(bookingByHostA);
    });

    afterAll(async () => {
      await api.hosts.deleteBooking(bookingByHostA, hostA);
    });
  });

  describe("Host-Client Booking Interactions", () => {
    let testClientConfig: TestUserConfig;

    beforeAll(async () => {
      testClientConfig = await createIsolatedUser(
        "HOST_CLIENT_INTERACTION_TEST",
        gateway.enums.Roles.CLIENT,
      );
    });

    test("Host creates booking for specific existing client", async () => {
      const testHostConfig = await createIsolatedUser(
        "SPECIFIC_CLIENT_HOST",
        gateway.enums.Roles.HOST,
      );

      const createHostBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.SUNDAY, "09:00", "PT1H"),
      };

      const response = await api.hosts.createBooking(
        createHostBookingDTO,
        testHostConfig,
      );
      expect(response.status).toBe(201);
      expect(response.data.id).toBeDefined();

      await api.hosts.deleteBooking(response.data.id, testHostConfig);
    });

    test("Host cannot access other host's bookings", async () => {
      const otherHostConfig = await createIsolatedUser(
        "OTHER_HOST_TEST",
        gateway.enums.Roles.HOST,
      );

      const createBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.SUNDAY, "11:00", "PT1H"),
      };

      const firstHostConfig = await createIsolatedUser(
        "FIRST_HOST_TEST",
        gateway.enums.Roles.HOST,
      );

      const createResponse = await api.hosts.createBooking(
        createBookingDTO,
        firstHostConfig,
      );
      expect(createResponse.status).toBe(201);

      const getResponse = await api.hosts.getBookingById(
        createResponse.data.id,
        otherHostConfig,
      );
      expect(getResponse.status).toBe(404);

      await api.hosts.deleteBooking(createResponse.data.id, firstHostConfig);
    });

    test("Host modifies client's booking created by host", async () => {
      const testHostConfig = await createIsolatedUser(
        "MODIFY_BOOKING_HOST",
        gateway.enums.Roles.HOST,
      );

      const createBookingDTO: gateway.dtos.CreateHostBookingDTO = {
        clientId: testClientConfig.userId,
        ...generateBookingDates(Days.SUNDAY, "13:00", "PT1H"),
      };

      const createResponse = await api.hosts.createBooking(
        createBookingDTO,
        testHostConfig,
      );
      expect(createResponse.status).toBe(201);

      const updateBookingDTO: gateway.dtos.UpdateHostBookingDTO = {
        ...generateBookingDates(Days.SUNDAY, "13:30", "PT1H"),
      };

      const updateResponse = await api.hosts.updateBooking(
        createResponse.data.id,
        updateBookingDTO,
        testHostConfig,
      );
      expect(updateResponse.status).toBe(200);

      await api.hosts.deleteBooking(createResponse.data.id, testHostConfig);
    });
  });

  describe("Time-based Business Logic", () => {
    test("Past bookings are never visible in public API", async () => {
      const response = await api.public.getHostBookings(hostConfig.userId);
      expect(response.status).toBe(200);

      const now = new Date();
      response.data.forEach((booking: { fromDateTime: string }) => {
        const bookingStart = new Date(booking.fromDateTime);
        expect(bookingStart.getTime()).toBeGreaterThan(now.getTime());
      });
    });

    test("Bookings sorting works correctly", async () => {
      const bookings = [
        {
          fromDateTime: "2025-07-01T09:00:00Z",
          toDateTime: "2025-07-01T10:00:00Z",
        },
        {
          fromDateTime: "2025-07-01T14:00:00Z",
          toDateTime: "2025-07-01T15:00:00Z",
        },
        {
          fromDateTime: "2025-07-01T11:00:00Z",
          toDateTime: "2025-07-01T12:00:00Z",
        },
      ];

      const [testHostConfig, testClientConfig] = await Promise.all([
        createIsolatedUser("SORTING_TEST_HOST", gateway.enums.Roles.HOST),
        createIsolatedUser("SORTING_TEST_CLIENT", gateway.enums.Roles.CLIENT),
      ]);

      const createdBookingIds: string[] = [];
      for (const booking of bookings) {
        const createBookingDTO: gateway.dtos.CreateHostBookingDTO = {
          clientId: testClientConfig.userId,
          ...booking,
        };
        const response = await api.hosts.createBooking(
          createBookingDTO,
          testHostConfig,
        );
        createdBookingIds.push(response.data.id);
      }

      const ascResponse = await api.public.getHostBookings(
        testHostConfig.userId,
        {
          sortDirection: "ASC",
        },
      );
      expect(ascResponse.status).toBe(200);

      for (let i = 1; i < ascResponse.data.length; i++) {
        const prev = new Date(ascResponse.data[i - 1].fromDateTime);
        const curr = new Date(ascResponse.data[i].fromDateTime);
        expect(prev.getTime()).toBeLessThanOrEqual(curr.getTime());
      }

      const descResponse = await api.public.getHostBookings(
        testHostConfig.userId,
        {
          sortDirection: "DESC",
        },
      );
      expect(descResponse.status).toBe(200);

      for (let i = 1; i < descResponse.data.length; i++) {
        const prev = new Date(descResponse.data[i - 1].fromDateTime);
        const curr = new Date(descResponse.data[i].fromDateTime);
        expect(prev.getTime()).toBeGreaterThanOrEqual(curr.getTime());
      }

      for (const bookingId of createdBookingIds) {
        await api.hosts.deleteBooking(bookingId, testHostConfig);
      }
    });
  });
});
