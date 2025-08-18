import { useState } from "react";
import {
  TextInput,
  Textarea,
  PasswordInput,
  Button,
  Stack,
  FileInput,
  Title,
  Paper,
  Avatar,
  MultiSelect,
  Group,
  ActionIcon,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import {
  updateShema,
  createShema,
  type UpdateHostShemaType,
  type CreateHostShemaType,
} from "./hostFormShema";
import { IconTrash } from "@tabler/icons-react";

export interface IHostFormProps {
  item?: {
    avatar?: string;
    name?: string;
    description?: string;
    forwardBooking?: string;
    workingDays?: string[];
    workingHours?: { start: string; end: string }[];
  };
  onEdit?: (payload: UpdateHostShemaType) => void;
  onCreate?: (payload: CreateHostShemaType) => void;
}

const HostForm = (props: IHostFormProps) => {
  const { item, onEdit, onCreate } = props;

  const [preview, setPreview] = useState<string | null>(null);

  const isEditing = Boolean(item);

  const form = useForm({
    initialValues: {
      avatar: item?.avatar ?? (null as File | null),
      name: item?.name ?? "",
      description: item?.description ?? "",
      forwardBooking: item?.forwardBooking ?? "",
      workingDays: item?.workingDays ?? [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
      ],
      workingHours: item?.workingHours ?? [
        { start: "09:00", end: "13:00" },
        { start: "14:00", end: "18:00" },
      ],
      ...(isEditing
        ? {}
        : {
            login: "",
            password: "",
          }),
    },
    validate: zod4Resolver(isEditing ? updateShema : createShema),
  });

  console.log(form.errors);

  const handleSubmit = (values: typeof form.values) => {
    if (isEditing) {
      if (onEdit) {
        onEdit(values as UpdateHostShemaType);
      }
    } else {
      if (onCreate) {
        onCreate(values as CreateHostShemaType);
      }
    }
  };

  const handleAvatarChange = (file: File | null) => {
    form.setFieldValue("avatar", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <Title mb="md">{isEditing ? "Edit" : "Create New"} Host</Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Avatar src={preview} size={80} radius="xl" />

            <FileInput
              label="Avatar"
              placeholder="Upload avatar"
              accept="image/*"
              disabled
              onChange={handleAvatarChange}
            />

            <TextInput
              label="Name"
              placeholder="John Doe"
              disabled
              {...form.getInputProps("name")}
            />

            <Textarea
              label="Description"
              placeholder="Brief description..."
              autosize
              minRows={2}
              disabled
              {...form.getInputProps("description")}
            />

            <TextInput
              label="Forward booking period"
              placeholder="P1W"
              withAsterisk
              {...form.getInputProps("forwardBooking")}
            />

            <MultiSelect
              label="Working Days"
              placeholder="Select working days"
              data={[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
              ]}
              searchable
              clearable
              withAsterisk
              {...form.getInputProps("workingDays")}
            />

            {form.values.workingHours.map((_, index) => (
              <Group key={index}>
                <TimeInput
                  flex={1}
                  label={`Start Time`}
                  value={form.values.workingHours[index].start}
                  onChange={(event) =>
                    form.setFieldValue(
                      `workingHours.${index}.start`,
                      event.target.value,
                    )
                  }
                  required
                />

                <TimeInput
                  flex={1}
                  label={`End Time`}
                  value={form.values.workingHours[index].end}
                  onChange={(event) =>
                    form.setFieldValue(
                      `workingHours.${index}.end`,
                      event.target.value,
                    )
                  }
                  required
                />

                <ActionIcon
                  size="lg"
                  variant="default"
                  style={{ alignSelf: "end" }}
                  onClick={() => {
                    const workingHours = form.getValues().workingHours;
                    workingHours.splice(index, 1);
                    form.setFieldValue("workingHours", workingHours);
                  }}
                >
                  <IconTrash stroke={1.5} color="red" />
                </ActionIcon>
              </Group>
            ))}

            <Button
              variant="light"
              onClick={() =>
                form.setFieldValue("workingHours", [
                  ...form.values.workingHours,
                  { start: "", end: "" },
                ])
              }
            >
              + Add Working Hours
            </Button>

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

            <Button type="submit" fullWidth mt="md" style={{ zIndex: 2 }}>
              {isEditing ? "Edit" : "Create New"} Host
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export { HostForm };
