import { FindOptions, FindOptionsRelations, Repository } from "typeorm";
import Project from "../entities/project";
import { AppDataSource } from "../config/datasource";
import { injectable } from "inversify";
import BadRequestError from "../exceptions/badRequestError";
import Board from "../entities/board";

@injectable()
export default class ProjectRepository {
    protected _nativeRepo: Repository<Project>;
    constructor() {
        this._nativeRepo = AppDataSource.getRepository(Project);
    }

    public async save(project: Project) {
        return this._nativeRepo.save(project);
    }

    public async findById(projectId: number) {
        return this._nativeRepo.findOneBy({id: projectId});
    }

    public async findByIdWithException(projectId: number): Promise<Project> {
        const foundProject = await this.findById(projectId);
        if (!foundProject) {
            throw new BadRequestError({message: `No ${this._nativeRepo.target.toString()} with id: ${projectId}!`, statusCode: 400});
        }
        return foundProject;
    }

    public async findByIdWithMembersAndViews(projectId: number): Promise<Project> {
        return this._nativeRepo.findOneOrFail({
            where: {
                id: projectId
            },
            relations: {
                "members": true,
                "board": true
            }
        });
    }

    public async findProjectsWhereUserIsMember(userId: number): Promise<Project[]> {
        return this._nativeRepo.find({
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
        const foundProject = await this._nativeRepo.findOne({
            where: {
                id: projectId
            },
            relations: ["board", "board.boardColumns"]
        })
        if (!foundProject) {
            throw new BadRequestError({message: `No ${this._nativeRepo.target.toString()} with id: ${projectId}!`, statusCode: 400});
        }
        return foundProject;
    }
}