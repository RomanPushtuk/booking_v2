import { Button, Center, Container, Flex } from "@mantine/core";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { Footer, Section } from "../../widgets";

const BookingDetailsPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <Section title="Booking Details"></Section>
        </Container>
      </Center>

      <Footer onBack={handleBack}>
        <Flex flex={1} justify="center">
          <Button size="lg" px="28px" mr="md">
            Cancel
          </Button>
          <Button size="lg" px="28px">
            Reshedule
          </Button>
        </Flex>
      </Footer>
    </>
  );
};

export { BookingDetailsPage };
