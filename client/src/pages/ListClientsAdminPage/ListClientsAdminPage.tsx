import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button, Center, Container, Flex, Stack, Title } from "@mantine/core";
import { EntityItem, Footer } from "../../widgets";
import { truncate } from "../../utils";

const ListClientsAdminPage = () => {
  const navigate = useNavigate();

  const onEditClick = useCallback(() => {
    navigate("/admin/clients/edit");
  }, [navigate]);
  const onDeleteClick = () => {};
  const handleBack = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <Title mb="md">Clients</Title>
          <Stack>
            <EntityItem
              title={<Title order={4}>{truncate("SomeClientNickname")}</Title>}
              onDeleteClick={onDeleteClick}
              onDetailsClick={onEditClick}
            />
          </Stack>
        </Container>
      </Center>

      <Footer onBack={handleBack}>
        <Flex flex={1} justify="center">
          <Button size="lg" px="48px">
            Create New Client
          </Button>
        </Flex>
      </Footer>
    </>
  );
};

export { ListClientsAdminPage };
