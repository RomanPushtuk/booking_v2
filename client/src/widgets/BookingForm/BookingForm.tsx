import { Button, Stack, Title, Paper, Group } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { bookingFormShema } from "./bookingFormShema";
import { SelectAsync } from "../SelectAsync";

interface IBookingFormProps {
  item?: {
    clientId?: string;
    hostId?: string;
    timeSlot?: { start: string; end: string };
  };
}

const getClients = async () => {
  return [
    { value: "fu039jf39", label: "Client1" },
    { value: "ffu390jf", label: "Client2" },
    { value: "fu2234", label: "Client3" },
  ];
};

const getHosts = async () => {
  return [
    { value: "ogkrjf39", label: "Host1" },
    { value: "fjjv390jf", label: "Host2" },
    { value: "fr822234", label: "Host3" },
  ];
};

const BookingForm = (props: IBookingFormProps) => {
  const { item } = props;

  const isEditing = Boolean(item);

  const form = useForm({
    initialValues: {
      clientId: item?.clientId ?? "",
      hostId: item?.hostId ?? "",
      timeSlot: item?.timeSlot ?? { start: "", end: "" },
    },

    validate: zod4Resolver(bookingFormShema),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted:", values);
  };

  return (
    <>
      <Title mb="md">{isEditing ? "Edit" : "Create New"} Booking</Title>

      <Paper withBorder shadow="sm" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <SelectAsync
              label="Client"
              placeholder="Client"
              withAsterisk
              value={form.values.clientId}
              onChange={(value) => {
                form.setFieldValue("clientId", value);
              }}
              fetchFn={getClients}
            />
            <SelectAsync
              label="Host"
              placeholder="Host"
              withAsterisk
              value={form.values.hostId}
              onChange={(value) => {
                form.setFieldValue("hostId", value);
              }}
              fetchFn={getHosts}
            />
            <Group>
              <TimeInput
                flex={1}
                label={`Start Time`}
                value={form.values.timeSlot.start}
                onChange={(event) =>
                  form.setFieldValue(`timeSlot.start`, event.target.value)
                }
                required
              />
              <TimeInput
                flex={1}
                label={`End Time`}
                value={form.values.timeSlot.end}
                onChange={(event) =>
                  form.setFieldValue(`timeSlot.end`, event.target.value)
                }
                required
              />
            </Group>
            <Button type="submit" fullWidth mt="md">
              {isEditing ? "Edit" : "Create New"} Booking
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export { BookingForm };
