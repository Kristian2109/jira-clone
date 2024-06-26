import ProjectRepository from "../repositories/projectRepository";
import { AuthenticatedRequest } from "../types/auth";
import { IdSchema } from "../types/genericTypes";
import BadRequestError from "../exceptions/badRequestError";
import { injectable } from "inversify";

@injectable()
export default class AuthorizationManager {
  protected _projectRepository: ProjectRepository;

  constructor(projectRepository: ProjectRepository) {
    this._projectRepository = projectRepository;
  }

  private async _validateUserAccessProject(request: AuthenticatedRequest) {
    const words = request.url.split("/");
    const projectId = IdSchema.parse(Number(words[2]));
    const isUserProjectMember =
      await this._projectRepository.isUserMemberOfProject(
        projectId,
        request.user.id
      );
    const userRole = request.user.role;
    if (userRole !== "admin" && isUserProjectMember !== 1) {
      throw new BadRequestError({
        message: "User doesn't have access to this project!",
        statusCode: 401,
      });
    }
  }

  public async authorize(request: AuthenticatedRequest) {
    const projectRegex = /\/projects\/\d+/;
    if (projectRegex.test(request.url)) {
      await this._validateUserAccessProject(request);
    }
  }
}
