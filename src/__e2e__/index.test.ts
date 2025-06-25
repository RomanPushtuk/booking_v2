import { api } from "./api";
import { gateway } from "./imports";

describe("Auth testing", () => {
  test("Register new client", async () => {
    const createUserDTO: gateway.dtos.CreateUserDTO = {
      login: "TestClient1",
      password: "StrongPassword123!@",
      role: "CLIENT",
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
      role: "HOST",
    };
    const response = await api.auth.register(createUserDTO);

    expect(() => {
      new gateway.dtos.UserLoggedInDTO({ ...response.data });
    }).not.toThrow();
  });
});

describe("Client testing", () => {
  let clientAccessUserToken: string;
  let hostAccessHostToken: string;

  beforeAll(async () => {
    const [client, host] = await Promise.all([
      api.auth.register({
        login: "CLIENT_TEST_1",
        password: "StrongPassword123!@",
        role: "CLIENT",
      }),
      api.auth.register({
        login: "HOST_TEST_1",
        password: "StrongPassword123!@",
        role: "HOST",
      }),
    ]);

    clientAccessUserToken = client.data.accessToken;
    hostAccessHostToken = host.data.accessToken;
  });

  test("Get me success", async () => {
    const response = await api.clients.getMe(clientAccessUserToken);

    expect(() => {
      new gateway.dtos.ClientDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Get me with invalid token", async () => {
    const response = await api.clients.getMe("invalid_token");
    // TODO: 401, unauthorized
    expect(response.status).toBe(500);
  });

  test("Get me with another role", async () => {
    const response = await api.clients.getMe(hostAccessHostToken);
    // TODO: 403, forbidden
    expect(response.status).toBe(500);
  });

  test("Update me success", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(
      clientAccessUserToken,
      updateClientDTO,
    );

    expect(() => {
      new gateway.dtos.ClientUpdatedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Update me with invalid token", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(
      "invalid_token",
      updateClientDTO,
    );
    // TODO: 401, unauthorized
    expect(response.status).toBe(500);
  });

  test("Update me with another role", async () => {
    const updateClientDTO: gateway.dtos.UpdateClientDTO = {
      info: { firstName: "Test" },
    };

    const response = await api.clients.updateMe(
      hostAccessHostToken,
      updateClientDTO,
    );
    // TODO: 403, forbidden
    expect(response.status).toBe(500);
  });

  test("Delete me success", async () => {
    const response = await api.clients.deleteMe(clientAccessUserToken);

    expect(() => {
      new gateway.dtos.ClientDeletedDTO({ ...response.data });
    }).not.toThrow();

    expect(response.status).toBe(200);
  });

  test("Delete me with invalid token", async () => {
    const response = await api.clients.deleteMe("invalid_token");
    // TODO: 401, unauthorized
    expect(response.status).toBe(500);
  });

  test("Delete me with another role", async () => {
    const response = await api.clients.deleteMe(hostAccessHostToken);
    // TODO: 403, forbidden
    expect(response.status).toBe(500);
  });
});
