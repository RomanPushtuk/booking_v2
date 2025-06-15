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
