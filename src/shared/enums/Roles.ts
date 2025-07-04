export enum Roles {
  HOST = "HOST",
  CLIENT = "CLIENT",
}

export enum Permissions {
  CLIENT_READ_PROFILE = "client.read.profile",
  CLIENT_UPDATE_PROFILE = "client.update.profile",
  CLIENT_DELETE_PROFILE = "client.delete.profile",
  CLIENT_READ_BOOKINGS = "client.read.bookings",
  CLIENT_CREATE_BOOKING = "client.create.booking",
  CLIENT_UPDATE_BOOKING = "client.update.booking",
  CLIENT_CANCEL_BOOKING = "client.cancel.booking",

  HOST_READ_PROFILE = "host.read.profile",
}
