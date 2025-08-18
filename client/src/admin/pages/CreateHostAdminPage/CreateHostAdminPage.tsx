import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Container } from "@mantine/core";

import { useAuth } from "../../../auth";
import { CreateHostDTO } from "../../../queries/bookingSchemas";
import { useAdminCreateNewHost } from "../../../queries/bookingComponents";

import { CreateHostShemaType } from "../../components/HostForm/hostFormShema";

import { Footer, HostForm } from "../../components";


const mapCreateHostShemaTypeToCreateHostDTO = (
  payload: CreateHostShemaType,
): CreateHostDTO => {
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
    login: payload.login,
    password: payload.password,
  };
};

const CreateHostAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/admin/hosts");
  }, [navigate]);

  const { accessToken } = useAuth() as { accessToken: string };

  const create = useAdminCreateNewHost();

  const handleCreate = (data: CreateHostShemaType) => {
    create.mutate({
      body: mapCreateHostShemaTypeToCreateHostDTO(data) as CreateHostDTO,
      headers: {
        authorization: accessToken,
      },
    });
    navigate("/admin/hosts");
  };

  return (
    <>
      <Container maw={640} w="100%" mb={42}>
        <HostForm onCreate={handleCreate} />
      </Container>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateHostAdminPage };
