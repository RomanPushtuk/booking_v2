import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Text } from "@mantine/core";
import {
  useAdminGetHost,
  useAdminUpdateHost,
} from "../../queries/bookingComponents";
import { Center, Container } from "@mantine/core";
import { Footer, HostForm } from "../../widgets";
import { useAuth } from "../../contexts";
import type { HostDTO, UpdateHostDTO } from "../../queries/bookingSchemas";
import type { IHostFormProps } from "../../widgets/HostForm/HostForm";
import type { UpdateHostShemaType } from "../../widgets/HostForm/hostFormShema";

const mapHostToHostForm = (host: HostDTO): IHostFormProps => {
  return {
    item: {
      forwardBooking: host.forwardBooking,
      workingDays: host.workDays,
      workingHours: host.workHours.map((item) => {
        const { from, to } = item;
        return { start: from, end: to };
      }),
    },
  };
};

const mapUpdateHostShemaTypeToUpdateHostDTO = (
  payload: UpdateHostShemaType,
): UpdateHostDTO => {
  return {
    forwardBooking: payload.forwardBooking,
    workDays: payload.workingDays as (
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY"
      | "SUNDAY"
    )[],
    workHours: payload.workingHours.map((item) => {
      const { start, end } = item;
      return { from: start, to: end };
    }),
  };
};

const EditHostAdminPage = () => {
  const params = useParams();

  if (!params.hostId) throw new Error("No hostId in params");

  const { accessToken } = useAuth() as { accessToken: string };

  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/hosts");
  }, [navigate]);

  const host = useAdminGetHost({
    pathParams: { hostId: params.hostId },
    headers: {
      authorization: accessToken,
    },
  });

  const update = useAdminUpdateHost();

  const handleEdit = (data: UpdateHostShemaType) => {
    update.mutate({
      pathParams: { hostId: params.hostId as string },
      body: mapUpdateHostShemaTypeToUpdateHostDTO(data),
      headers: {
        authorization: accessToken,
      },
    });
  };

  return (
    <>
      <Container maw={640} w="100%" mb={42}>
        {host.isFetching && <Text>...fetching</Text>}
        {host.isError && <Text c="red.7">...error</Text>}
        {host.isSuccess && (
          <HostForm {...mapHostToHostForm(host.data)} onEdit={handleEdit} />
        )}
      </Container>

      <Footer onBack={handleBack} />
    </>
  );
};

export { EditHostAdminPage };
