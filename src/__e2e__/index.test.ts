import { api } from "./api";
import { gateway } from "./imports";
import { AxiosRequestConfig } from "axios";

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
  let clientConfig: AxiosRequestConfig;
  let hostConfig: AxiosRequestConfig;
  let invalidConfig: AxiosRequestConfig;

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
