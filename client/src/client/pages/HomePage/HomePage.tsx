import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button, Center, Container } from "@mantine/core";
import { shared } from "../../imports";

// import { usePublicGetHosts } from "../../../queries/bookingComponents";
import { Dashboard } from "../../components";


export const HomePage = () => {
  const navigate = useNavigate();
  // const { accessToken } = useAuth() as { accessToken: string };

  const handleCreateBooking = useCallback(() => {
    navigate("/client/create");
  }, []);

  const handleSelectHostClick = useCallback(() => {
    navigate("/client/hosts");
  }, [])

  const handleSelectDateTimeClick = useCallback(() => {
    navigate("/client/date-time");
  }, [])

  const handleSelectServiceClick = useCallback(() => {
    navigate("/client/services");
  }, [])

  return (
    <>
      <Container maw={640} w="100%" mb="64px">
        <shared.components.Section title="Booking app">
          <Dashboard
            onSelectHostClick={handleSelectHostClick}
            onSelectDateTimeClick={handleSelectDateTimeClick}
            onSelectServiceClick={handleSelectServiceClick}
          />
        </shared.components.Section>
      </Container>

      <shared.components.Footer>
        <Center w='100%'>
          <Button size="lg" px="28px" mr="md" onClick={handleCreateBooking}>
            New Booking
          </Button>
        </Center>
      </shared.components.Footer>
    </>
  );
};
