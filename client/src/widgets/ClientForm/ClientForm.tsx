import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Title,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { clientFormShema } from "./clientFormShema";

interface IClientFormProps {
  item?: {
    name?: string;
  };
}

const ClientForm = (props: IClientFormProps) => {
  const { item } = props;

  const isEditing = Boolean(item);

  const form = useForm({
    initialValues: {
      name: item?.name ?? "",
      ...(isEditing
        ? {}
        : {
            login: "",
            password: "",
          }),
    },
    validate: zod4Resolver(clientFormShema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted:", values);
  };

  return (
    <>
      <Title mb="md">{isEditing ? "Edit" : "Create New"} Client</Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="John Doe"
              withAsterisk
              {...form.getInputProps("name")}
            />

            {!isEditing && (
              <>
                <TextInput
                  label="Login"
                  placeholder="Login"
                  withAsterisk
                  {...form.getInputProps("login")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="••••••••"
                  withAsterisk
                  {...form.getInputProps("password")}
                />
              </>
            )}

            <Button type="submit" fullWidth mt="md">
              {isEditing ? "Edit" : "Create New"} Client
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export { ClientForm };
