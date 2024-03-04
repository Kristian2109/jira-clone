import { Container } from "inversify";
import InternalAuthManager from "./services/internalAuthManager";
import ExternalAuthManager from "./services/externalAuthManager";
import UserManager from "./services/userManager";

const container = new Container()
container.bind(InternalAuthManager).toSelf();
container.bind(ExternalAuthManager).toSelf();
container.bind(UserManager).toSelf();
export default container;