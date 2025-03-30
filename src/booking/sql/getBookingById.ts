export const getBookingById = (bookingId: string) => {
  return `SELECT * FROM \`bookings\` WHERE \`id\` = '${bookingId}';`;
};
