import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Text } from "@mantine/core";

import { useAuth } from "../../../auth";
import { HostDTO, UpdateHostDTO } from "../../../queries/bookingSchemas";
import { useAdminGetHost, useAdminUpdateHost } from "../../../queries/bookingComponents";

import { HostForm, IHostFormProps } from "../../components/HostForm/HostForm";
import { UpdateHostShemaType } from "../../components/HostForm/hostFormShema";
import { Footer } from "../../components";


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
