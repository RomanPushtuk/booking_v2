import Datastore from "@seald-io/nedb";
import { config } from "../imports";

const vs = new Datastore({
  filename: config.VERION_STORAGE_DB_PATH,
  autoload: true,
});

export { vs };
