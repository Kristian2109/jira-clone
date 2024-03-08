import { injectable } from "inversify";
import { Repository } from "typeorm";
import Project from "../entities/project";
import { AppDataSource } from "../config/datasource";
import { ProjectCreate, NameAndDescription } from "../types/project";
import ProjectMapper from "../mappers/projectMapper";
import ProjectMember from "../entities/projectMember";
import UserManager from "./userManager";
import ProjectRepository from "../repositories/projectRepository";
import BoardRepository from "../repositories/boardRepository";
import BadRequestError from "../exceptions/badRequestError";

@injectable()
class ProjectManager {
    protected _userManager: UserManager;
    protected _projectCustomRepository: ProjectRepository;
    protected _boardRepository: BoardRepository;

    constructor(userManager: UserManager, projectRepository: ProjectRepository, boardRepository: BoardRepository) {
        this._userManager = userManager;
        this._projectCustomRepository = projectRepository;
        this._boardRepository = boardRepository;
    }

    public async createProject(projectToCreate: ProjectCreate, ownerId: number) {
        const project = ProjectMapper.toProject(projectToCreate);
        const user = await this._userManager.getUserByIdWithException(ownerId);
        const ownerMember = new ProjectMember(project, user, "Accepted", "Owner");
        project.members = [ownerMember];

        return await this._projectCustomRepository.save(project);
    }

    public async getProjectById(id: number): Promise<Project> {
        return this._projectCustomRepository.findByIdWithMembersAndViews(id);
    }

    public async getUserProjects(userId: number) {
        return this._projectCustomRepository.findProjectsWhereUserIsMember(userId);
    }

    public async getProjectBoard(projectId: number) {
        const project = await this._projectCustomRepository.findWithBoard(projectId);
        return project;
    }

    public async inviteUser(projectId: number, userEmail: string) {
        const project = await this._projectCustomRepository.findByIdWithMembersAndViews(projectId);
        const user = await this._userManager.getUserByEmail(userEmail);

        const isUserAlreadyMember = project.members.find(member => member.user.id === user.id)
        if (isUserAlreadyMember) {
            throw new BadRequestError({message: "User is already a member!", statusCode: 400});
        }

        const newMember = new ProjectMember(project, user, "Pending", "Worker");
        project.members.push(newMember);
        this._projectCustomRepository.save(project);
    }

    public async acceptInvitation(projectId: number, userId: number) {
        const invitation = await this._projectCustomRepository.findMembership(projectId, userId);
        if (invitation.status != "Pending") {
            throw new BadRequestError({message: "Invitation already accepted!", statusCode: 400});
        }

        invitation.status = "Accepted"
        this._projectCustomRepository.saveMembership(invitation);
    }

    public async declineInvitation(projectId: number, userId: number) {
        const invitation = await this._projectCustomRepository.findMembership(projectId, userId);
        if (invitation.status != "Pending") {
            throw new BadRequestError({message: "Invitation already accepted!", statusCode: 400});
        }
        
        this._projectCustomRepository.deleteMembership(invitation);
    }
}

export default ProjectManager;