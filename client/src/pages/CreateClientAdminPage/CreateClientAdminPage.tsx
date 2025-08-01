import { Center, Container } from "@mantine/core";
import { ClientForm, Footer } from "../../widgets";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { useAdminCreateNewClient } from "../../queries/bookingComponents";
import type { CreateClientDTO } from "../../queries/bookingSchemas";
import type { CreateClientShemaType } from "../../widgets/ClientForm/clientFormShema";
import { useAuth } from "../../contexts";

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
