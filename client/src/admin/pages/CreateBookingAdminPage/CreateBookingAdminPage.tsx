import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Center, Container } from "@mantine/core";
import { DateTime } from "luxon";

import { useAuth } from "../../../auth";
import { CreateBookingDTO } from "../../../queries/bookingSchemas";
import { useAdminCreateNewBooking } from "../../../queries/bookingComponents";

import { BookingShemaType } from "../../components/BookingForm/bookingFormShema";
import { BookingForm, Footer } from "../../components";


const mapBookingShemaTypeToCreateBookingDTO = (
  payload: BookingShemaType,
): CreateBookingDTO => {
  const date = DateTime.fromFormat(payload.date, "yyyy-MM-dd");

  const [hour1, minute1] = payload.timeSlot.start.split(":").map(Number);
  const dt1 = DateTime.now().set({
    year: date.year,
    month: date.month,
    day: date.day,
    hour: hour1,
    minute: minute1,
    second: 0,
    millisecond: 0,
  });

  const [hour2, minute2] = payload.timeSlot.end.split(":").map(Number);
  const dt2 = DateTime.now().set({
    year: date.year,
    month: date.month,
    day: date.day,
    hour: hour2,
    minute: minute2,
    second: 0,
    millisecond: 0,
  });

  return {
    clientId: payload.clientId,
    hostId: payload.hostId,
    fromDateTime: dt1.toISO(),
    toDateTime: dt2.toISO(),
  };
};

const CreateBookingAdminPage = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/admin/bookings");
  }, [navigate]);

  const { accessToken } = useAuth() as { accessToken: string };

  const create = useAdminCreateNewBooking();

  const handleCreate = (data: BookingShemaType) => {
    create.mutate({
      body: mapBookingShemaTypeToCreateBookingDTO(data) as CreateBookingDTO,
      headers: {
        authorization: accessToken,
      },
    });
    navigate("/admin/bookings");
  };

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
