import { Container } from "inversify";
import InternalAuthManager from "./services/internalAuthManager";
import ExternalAuthManager from "./services/externalAuthManager";
import UserManager from "./services/userManager";
import ProjectManager from "./services/projectManager";
import ProjectController from "./controllers/project";
import AuthController from "./controllers/auth";
import AccountController from "./controllers/account";
import ProjectRepository from "./repositories/projectRepository";
import BoardManager from "./services/boardManager";
import BoardRepository from "./repositories/boardRepository";

const container = new Container()
container.bind(InternalAuthManager).toSelf();
container.bind(ExternalAuthManager).toSelf();
container.bind(UserManager).toSelf();
container.bind(ProjectManager).toSelf();
container.bind(BoardManager).toSelf();
container.bind(ProjectController).toSelf();
container.bind(AuthController).toSelf();
container.bind(AccountController).toSelf();
container.bind(ProjectRepository).toSelf();
container.bind(BoardRepository).toSelf();

export default container;