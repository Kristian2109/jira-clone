import { injectable } from "inversify";
import { Repository } from "typeorm";
import Project from "../entities/project";
import { AppDataSource } from "../config/datasource";
import { ProjectCreate, ViewCreate } from "../types/project";
import ProjectMapper from "../mappers/projectMapper";
import ProjectMember from "../entities/projectMember";
import UserManager from "./userManager";
import ProjectRepository from "../repositories/projectRepository";

@injectable()
class ProjectManager {
    protected _userManager: UserManager;
    protected _projectCustomRepository: ProjectRepository;

    constructor(userManager: UserManager, projectRepository: ProjectRepository) {
        this._userManager = userManager;
        this._projectCustomRepository = projectRepository;
    }

    public async createProject(projectToCreate: ProjectCreate, ownerId: number) {
        const project = ProjectMapper.toProject(projectToCreate);
        const ownerMember = new ProjectMember();
        ownerMember.project = project;
        ownerMember.user = await this._userManager.getUserByIdWithException(ownerId);
        ownerMember.role = "Owner";
        ownerMember.status = "Accepted";
        project.members = [ownerMember];

        return await this._projectCustomRepository.save(project);
    }

    public async getProjectById(id: number): Promise<Project> {
        return this._projectCustomRepository.findByIdWithException(id);
    }

    public async getUserProjects(userId: number) {
        return this._projectCustomRepository.findProjectsWhereUserIsMember(userId);
    }
}

export default ProjectManager;