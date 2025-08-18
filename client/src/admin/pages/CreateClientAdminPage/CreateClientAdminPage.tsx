import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";

import { useAuth } from "../../../auth";
import { CreateClientDTO } from "../../../queries/bookingSchemas";
import { useAdminCreateNewClient } from "../../../queries/bookingComponents";

import { CreateClientShemaType } from "../../components/ClientForm/clientFormShema";
import { ClientForm, Footer } from "../../components";

const mapCreateClientShemaTypeToCreateClientDTO = (
  data: CreateClientShemaType,
): CreateClientDTO => {
  return {
    login: data.login,
    password: data.password,
  };
};

const CreateClientAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/admin/clients");
  }, [navigate]);

  const { accessToken } = useAuth() as { accessToken: string };

  const create = useAdminCreateNewClient();

  const handleCreate = (data: CreateClientShemaType) => {
    create.mutate({
      body: mapCreateClientShemaTypeToCreateClientDTO(data) as CreateClientDTO,
      headers: {
        authorization: accessToken,
      },
    });
    navigate("/admin/clients");
  };

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <ClientForm onCreate={handleCreate} />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateClientAdminPage };
