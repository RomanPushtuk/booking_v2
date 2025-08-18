import { TextInput, PasswordInput, Paper, Title, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { loginFormShema } from "./loginFormShema";

interface ILoginFormProps {
  onSubmit: (values: { login: string; password: string }) => void;
}

const LoginForm = (props: ILoginFormProps) => {
  const form = useForm({
    initialValues: {
      login: "",
      password: "",
    },
    validate: zod4Resolver(loginFormShema),
  });

  return (
    <>
      <Title>Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(props.onSubmit)}>
          <TextInput
            label="Login"
            placeholder="you@example.com"
            required
            {...form.getInputProps("login")}
          />

          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="md"
            required
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" size="lg" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </>
  );
};

export { LoginForm };
