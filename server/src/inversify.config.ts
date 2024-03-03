import { Container } from "inversify";
import AuthManager from "./services/authManager";
import OAuthManager from "./services/oAuthManager";

const container = new Container()
container.bind(AuthManager).toSelf();
container.bind(OAuthManager).toSelf();

export default container;