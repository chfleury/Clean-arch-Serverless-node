import "reflect-metadata";
import { Container } from "inversify";
import { ControllerModule } from "./ControllerModule";
import { UseCaseModule } from "./UseCaseModule";
import { ServiceModule } from "./ServiceModule";

const container = new Container();

container.load(ControllerModule);
container.load(UseCaseModule);
container.load(ServiceModule);

export { container };
