import { NextFunction, Response } from "express";
import ProjectRepository from "../repositories/projectRepository";
import { AuthenticatedRequest } from "../types/auth";
import { IdSchema } from "../types/genericTypes";
import BadRequestError from "../exceptions/badRequestError";
import { injectable } from "inversify";
import JwtResolver from "./jwtResolver";

@injectable()
export default class AuthorizationManager {
    protected _projectRepository: ProjectRepository;

    constructor(projectRepository: ProjectRepository) {
        this._projectRepository = projectRepository;
    }

    public async authorize(request: AuthenticatedRequest, response: Response) {
        JwtResolver.resolve(request);
        const projectRegex = /\/projects\/\d+/;
        if (projectRegex.test(request.url)) {
            await this._validateUserAccessProject(request, response)
        }
    }

    private async _validateUserAccessProject(request: AuthenticatedRequest, response: Response) {
        const words = request.url.split("/");
        const projectId = IdSchema.parse(Number(words[2]));
        const isUserProjectMember = await this._projectRepository.isUserMemberOfProject(projectId, request.user.id);
        const userRole = request.user.role;
        if (userRole !== "admin" && isUserProjectMember !== 1) {
            throw new BadRequestError({message: "User doesn't have access to this project!", statusCode: 401})
        }
    }
} 