import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";
import { BookingForm, Footer } from "../../widgets";
import type { BookingShemaType } from "../../widgets/BookingForm/bookingFormShema";
import { useAdminCreateNewBooking } from "../../queries/bookingComponents";
import { useAuth } from "../../contexts";
import { mapUpdateBookingShemaTypeToUpdateBookingDTO } from "../EditBookingAdminPage/EditBookingAdminPage";
import type { CreateBookingDTO } from "../../queries/bookingSchemas";

const CreateBookingAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/admin/bookings");
  }, [navigate]);

  const { accessToken } = useAuth() as { accessToken: string };


  const create = useAdminCreateNewBooking()

  const handleCreate = (data: BookingShemaType) => {
    create.mutate({
      body: mapUpdateBookingShemaTypeToUpdateBookingDTO(data) as CreateBookingDTO,
      headers: {
        authorization: accessToken,
      }
    })
    navigate("/admin/bookings");
  }

  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          <BookingForm onCreate={handleCreate} />
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};

export { CreateBookingAdminPage };
