import Datastore from "@seald-io/nedb";
const vs = new Datastore({
  filename: "./src/booking/vs/versions.db",
  autoload: true,
});

export { vs };
