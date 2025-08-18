import { useCallback } from "react";
import { DateTime } from "luxon";
import { Center, Container, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";

import { useAuth } from "../../../auth";
import { BookingDTO, UpdateBookingDTO } from "../../../queries/bookingSchemas";
import { useAdminGetBooking, useAdminUpdateBooking } from "../../../queries/bookingComponents";

import { BookingForm, IBookingFormItem } from "../../components/BookingForm/BookingForm";
import { BookingShemaType } from "../../components/BookingForm/bookingFormShema";
import { Footer } from "../../components";


const mapBookingDTOToBookingFormItem = (
  booking: BookingDTO,
): IBookingFormItem => {
  return {
    clientId: booking.clientId,
    hostId: booking.hostId,
    date: DateTime.fromISO(booking.fromDateTime).toFormat("yyyy-MM-dd"),
    timeSlot: {
      start: DateTime.fromISO(booking.fromDateTime).toFormat("HH:mm"),
      end: DateTime.fromISO(booking.toDateTime).toFormat("HH:mm"),
    },
  };
};

const mapBookingShemaTypeToUpdateBookingDTO = (
  payload: BookingShemaType,
): UpdateBookingDTO => {
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

export const EditBookingAdminPage = () => {
  const params = useParams();

  if (!params.bookingId) throw new Error("No bookingId in params");

  const { accessToken } = useAuth() as { accessToken: string };

  const booking = useAdminGetBooking({
    pathParams: { bookingId: params.bookingId },
    headers: {
      authorization: accessToken,
    },
  });

  const update = useAdminUpdateBooking();

  const handleEdit = (data: BookingShemaType) => {
    update.mutate({
      pathParams: { bookingId: params.bookingId as string },
      body: mapBookingShemaTypeToUpdateBookingDTO(data),
      headers: {
        authorization: accessToken,
      },
    });
  };

  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate("/admin/bookings");
  }, [navigate]);
  return (
    <>
      <Center h="100vh">
        <Container maw={640} w="100%" mb="64px">
          {booking.isFetching && <Text>...fetching</Text>}
          {booking.isError && <Text c="red.7">...error</Text>}
          {booking.isSuccess && (
            <BookingForm
              item={mapBookingDTOToBookingFormItem(booking.data)}
              onEdit={handleEdit}
            />
          )}
        </Container>
      </Center>
      <Footer onBack={handleBack} />
    </>
  );
};
