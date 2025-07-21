import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button, Center, Container } from "@mantine/core";
import { Footer, NearestBooking, Section } from "../../widgets";
import { useQuery } from "@tanstack/react-query";
import { operationsByTag } from "../../queries/bookingComponents";
import { useAuth } from "../../contexts";

export const HomePage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth() as { accessToken: string };

  const bookings = useQuery({
    queryKey: ['clientBookings'],
    queryFn: () => {
      return operationsByTag.clients.clientsGetBookings({
        // @ts-expect-error 123
        headers: {
          'authorization': accessToken
        }
      })
    },
  });

  console.log(bookings);

  const handleCreateBooking = useCallback(() => {
    navigate("/create");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <Section title="Nearest bookings" actionText="See All">
            <NearestBooking
              id="12"
              name="Name"
              description="Description"
              date="14.07.2025"
              time="18:00"
            />
          </Section>
        </Container>
      </Center>

      <Footer>
        <Button size="lg" fullWidth px="48px" onClick={handleCreateBooking}>
          New Booking
        </Button>
      </Footer>
    </>
  );
};
