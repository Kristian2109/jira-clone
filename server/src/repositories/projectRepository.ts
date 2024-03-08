import { FindOptions, FindOptionsRelations, Repository } from "typeorm";
import Project from "../entities/project/project";
import { AppDataSource } from "../config/datasource";
import { injectable } from "inversify";
import BadRequestError from "../exceptions/badRequestError";
import ProjectMember from "../entities/project/projectMember";
@injectable()
export default class ProjectRepository {
    protected _projectRepo: Repository<Project>;
    protected _memberRepo: Repository<ProjectMember>;

    constructor() {
        this._projectRepo = AppDataSource.getRepository(Project);
        this._memberRepo = AppDataSource.getRepository(ProjectMember);
    }

    public async save(project: Project) {
        return this._projectRepo.save(project);
    }

    public async findById(projectId: number) {
        return this._projectRepo.findOneBy({id: projectId});
    }

    public async findByIdWithException(projectId: number): Promise<Project> {
        const foundProject = await this.findById(projectId);
        if (!foundProject) {
            throw new BadRequestError({message: `No Project with id: ${projectId}!`, statusCode: 400});
        }
        return foundProject;
    }

    public async findByIdWithMembersAndViews(projectId: number): Promise<Project> {
        return this._projectRepo.findOneOrFail({
            where: {
                id: projectId
            },
            relations: ["members", "board", "members.user"]
        });
    }

    public async findProjectsWhereUserIsMember(userId: number): Promise<Project[]> {
        return this._projectRepo.find({
            where: {
                "members": {
                    "user": {
                        "id": userId
                    }
                }
            }
        })
    }

    public async findWithBoard(projectId: number): Promise<Project> {
        const foundProject = await this._projectRepo.findOne({
            where: {
                id: projectId
            },
            relations: ["board", "board.boardColumns"]
        })
        if (!foundProject) {
            throw new BadRequestError({message: `No Project with id: ${projectId}!`, statusCode: 400});
        }
        return foundProject;
    }

    public async findMembership(projectId: number, userId: number) {
        return this._memberRepo.findOneOrFail({
            where: {
                project: {
                    id: projectId
                },
                user: {
                    id: userId
                }
            }
        })
    }

    public async saveMembership(projectMember: ProjectMember) {
        this._memberRepo.save(projectMember);
    }

    public async deleteMembership(projectMember: ProjectMember) {
        this._memberRepo.remove(projectMember);
    }
}