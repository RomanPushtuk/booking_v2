import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { EntityItem, Footer } from "../../widgets";
import { truncate } from "../../utils";
import { useAdminGetClients } from "../../queries/bookingComponents";
import { useAuth } from "../../contexts";

const ListClientsAdminPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth() as { accessToken: string };

  const clients = useAdminGetClients({
    headers: {
      authorization: accessToken,
    },
  });

  const onEditClick = useCallback(
    (id: string) => () => {
      navigate(`/admin/clients/${id}`);
    },
    [navigate],
  );
  const onDeleteClick = () => { };
  const handleBack = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  const onCreateClick = () => {
    navigate("/admin/clients/create");
  };

  return (
    <>
      <Container maw={640} w="100%" mb='100px'>
        <Title mb="md">Clients</Title>
        {clients.isFetching && <Text>...fetching</Text>}
        {clients.isError && <Text c={"red.7"}>Error</Text>}
        {clients.isSuccess && (
          <Stack>
            {clients.data.map((item) => {
              return (
                <EntityItem
                  key={item.id}
                  title={<Title order={4}>{truncate(item.id)}</Title>}
                  onDeleteClick={onDeleteClick}
                  onDetailsClick={onEditClick(item.id)}
                />
              );
            })}
          </Stack>
        )}
      </Container>

      <Footer onBack={handleBack}>
        <Flex flex={1} justify="center">
          <Button
            size="lg"
            px="48px"
            style={{ zIndex: 1 }}
            onClick={onCreateClick}
          >
            Create New Client
          </Button>
        </Flex>
      </Footer>
    </>
  );
};

export { ListClientsAdminPage };
