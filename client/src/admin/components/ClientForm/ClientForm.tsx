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
import {
  createClientFormShema,
  updateClientFormShema,
  type CreateClientShemaType,
  type UpdateClientShemaType,
} from "./clientFormShema";

interface IClientFormProps {
  item?: {
    name?: string;
  };

  onCreate?: (payload: CreateClientShemaType) => void;
  onUpdate?: (payload: UpdateClientShemaType) => void;
}

const ClientForm = (props: IClientFormProps) => {
  const { item, onCreate, onUpdate } = props;

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
    validate: zod4Resolver(
      isEditing ? updateClientFormShema : createClientFormShema,
    ),
  });

  const handleSubmit = (values: typeof form.values) => {
    if (isEditing) {
      if (onUpdate) {
        onUpdate(values as UpdateClientShemaType);
      }
    } else {
      if (onCreate) {
        onCreate(values as CreateClientShemaType);
      }
    }
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
              disabled
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
