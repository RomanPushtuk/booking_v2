import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Flex,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { EntityItem, Footer } from "../../widgets";
import { truncate } from "../../utils";
import { useAuth } from "../../contexts";
import { useAdminGetBookings } from "../../queries/bookingComponents";

const ListBookingsAdminPage = () => {
  const navigate = useNavigate();

  const { accessToken } = useAuth() as { accessToken: string };

  const bookings = useAdminGetBookings({
    headers: {
      authorization: accessToken,
    },
  });

  const onEditClick = useCallback(
    (id: string) => () => {
      navigate(`/admin/bookings/${id}`);
    },
    [navigate],
  );
  const onDeleteClick = () => { };
  const handleBack = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  const onCreateClick = () => {
    navigate("/admin/bookings/create");
  };

  return (
    <>
      <Container maw={640} w="100%" mb='100px'>
        <Title mb="md">Bookings</Title>

        {bookings.isFetching && <Text>...fetching</Text>}
        {bookings.isError && <Text c={"red.7"}>Error</Text>}
        {bookings.isSuccess && (
          <Stack>
            {bookings.data.map((item) => {
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
          <Button size="lg" px="48px" onClick={onCreateClick}>
            Create New Booking
          </Button>
        </Flex>
      </Footer>
    </>
  );
};

export { ListBookingsAdminPage };
