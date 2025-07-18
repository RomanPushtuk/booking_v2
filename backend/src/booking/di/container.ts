import { Container } from "typedi";
import { vs } from "../vs";

const diContainer = Container.of("booking");
diContainer.set("vs", vs);

export { diContainer };
