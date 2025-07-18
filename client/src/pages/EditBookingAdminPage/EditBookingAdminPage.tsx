import { Center, Container } from "@mantine/core";
import { BookingForm, Footer } from "../../widgets";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export const EditBookingAdminPage = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/bookings");
  }, [navigate]);
  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <BookingForm
            item={{
              clientId: "fu039jf39",
              hostId: "ogkrjf39",
              timeSlot: { start: "09:00", end: "13:00" },
            }}
          />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};
