import { injectable } from "inversify";
import { Repository } from "typeorm";
import Project from "../entities/project";
import { AppDataSource } from "../config/datasource";
import { ProjectCreate } from "../types/project";
import ProjectMapper from "../mappers/projectMapper";
import ProjectMember from "../entities/projectMember";
import UserManager from "./userManager";

@injectable()
class ProjectManager {
    protected _projectRepository: Repository<Project>;
    protected _userManager: UserManager;

    constructor(userManager: UserManager) {
        this._projectRepository = AppDataSource.getRepository(Project);
        this._userManager = userManager;
    }

    public async createProject(projectToCreate: ProjectCreate, ownerId: number) {
        const project = ProjectMapper.toProject(projectToCreate);
        const ownerMember = new ProjectMember();
        ownerMember.project = project;
        ownerMember.user = await this._userManager.getUserByIdWithException(ownerId);
        ownerMember.role = "Owner";
        ownerMember.status = "Accepted";
        project.members = [ownerMember];

        return await this._projectRepository.save(project);
    }

    public async getUserProjects(userId: number) {
        const memberships = await this._projectRepository
            .createQueryBuilder(`select projectId from project_member where userId = ${userId}`)
            .getMany();
        
        const projects = await this._projectRepository
            .createQueryBuilder("project")
            .select(["project.id", "project.name", "project.description"])
            .whereInIds(memberships)
            .getMany();

            // `select id, name, description from project where id in ${me}`
        return projects;
    }
}

export default ProjectManager;