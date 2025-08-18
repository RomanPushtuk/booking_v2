import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Flex,
  Stack,
  Title,
  Text
} from "@mantine/core";

import { useAuth } from "../../../auth";
import { useAdminGetHosts } from "../../../queries/bookingComponents";

import { EntityItem, Footer } from "../../components";
import { truncate } from "../../utils";

const ListHostsAdminPage = () => {
  const navigate = useNavigate();

  const { accessToken } = useAuth() as { accessToken: string };

  const hosts = useAdminGetHosts({
    headers: {
      authorization: accessToken,
    },
  });

  const onEditClick = useCallback(
    (id: string) => () => {
      navigate(`/admin/hosts/${id}`);
    },
    [navigate],
  );
  const onDeleteClick = () => {};
  const handleBack = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  const handleCreate = () => {
    navigate("/admin/hosts/create");
  };

  return (
    <>
      <Container maw={640} w="100%" mb="100px">
        <Title mb="md">Hosts</Title>
        {hosts.isFetching && <Text>...fetching</Text>}
        {hosts.isError && <Text c={"red.7"}>Error</Text>}
        {hosts.isSuccess && (
          <Stack>
            {hosts.data.map((item) => {
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
          <Button size="lg" px="48px" onClick={handleCreate}>
            Create New Host
          </Button>
        </Flex>
      </Footer>
    </>
  );
};

export { ListHostsAdminPage };
