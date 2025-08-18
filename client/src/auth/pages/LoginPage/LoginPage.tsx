import { Center, Container } from "@mantine/core";

import { useAuth } from "../../contexts";
import { LoginForm } from "../../components";

const LoginPage = () => {
  const { login: authLogin } = useAuth();

  const handleSubmit = (values: { login: string; password: string }) => {
    const { login, password } = values;
    authLogin(login, password);
  };

  return (
    <Center h="100vh">
      <Container maw={640} w="100%" mb="64px">
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </Center>
  );
};

export { LoginPage };
