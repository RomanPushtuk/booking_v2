import "./styles.css";
import { Model, View, Controller } from "./app";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const controller = new Controller(model);
  new View(controller);
});
