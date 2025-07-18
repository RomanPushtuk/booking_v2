import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";
import { BookingForm, Footer } from "../../widgets";

const CreateBookingAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/bookings");
  }, [navigate]);

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <BookingForm />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateBookingAdminPage };
