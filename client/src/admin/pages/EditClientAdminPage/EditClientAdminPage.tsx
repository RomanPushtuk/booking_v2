import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Center, Container, Text } from "@mantine/core";

import { useAuth } from "../../../auth";
import { UpdateClientDTO } from "../../../queries/bookingSchemas";
import { useAdminGetClientById, useAdminUpdateClietn } from "../../../queries/bookingComponents";

import { UpdateClientShemaType } from "../../components/ClientForm/clientFormShema";
import { ClientForm, Footer } from "../../components";

const mapUpdateClientShemaTypeToUpdateClientDTO = (
  payload: UpdateClientShemaType,
): UpdateClientDTO => {
  console.log(payload);
  return {};
};

const EditClientAdminPage = () => {
  const params = useParams();

  if (!params.clientId) throw new Error("No clientId in params");

  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/clients");
  }, [navigate]);

  const { accessToken } = useAuth() as { accessToken: string };

  const client = useAdminGetClientById({
    pathParams: { clientId: params.clientId },
    headers: {
      authorization: accessToken,
    },
  });

  const update = useAdminUpdateClietn();

  const handleEdit = (data: UpdateClientShemaType) => {
    update.mutate({
      pathParams: { clientId: params.clientId as string },
      body: mapUpdateClientShemaTypeToUpdateClientDTO(data),
      headers: {
        authorization: accessToken,
      },
    });
  };

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          {client.isFetching && <Text>...fetching</Text>}
          {client.isError && <Text c="red.7">...error</Text>}
          {client.isSuccess && (
            <ClientForm
              item={{
                name: "Client",
              }}
              onUpdate={handleEdit}
            />
          )}
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { EditClientAdminPage };
