import { injectable } from "inversify";
import BoardColumn from "../entities/boardColumn";
import ProjectRepository from "../repositories/projectRepository";
import { Repository } from "typeorm";
import Project from "../entities/project";
import UserManager from "./userManager";
import { AppDataSource } from "../config/datasource";
import ProjectView from "../entities/projectView";
import GenericException from "../exceptions/genericException";
import BadRequestError from "../exceptions/badRequestError";
import { ViewCreate } from "../types/project";
import ProjectViewCategory from "../entities/projectViewCategory";

@injectable()
export default class BoardManager {
    protected _projectRepository: Repository<Project>;
    protected _userManager: UserManager;
    protected _projectCustomRepository: ProjectRepository;

    constructor(userManager: UserManager, projectRepository: ProjectRepository) {
        this._projectRepository = AppDataSource.getRepository(Project);
        this._userManager = userManager;
        this._projectCustomRepository = projectRepository;
    }

    private createInitialBoardColumns() {
        return [
            new BoardColumn("To Do", "Tasks to be done.", 1),
            new BoardColumn("In Progress", "Tasks in progress.", 2),
            new BoardColumn("Done", "Done tasks.", 3)
        ]
    } 

    public async createBoardView(params: {projectId: number, boardMetadata: ViewCreate}) {
        const {projectId, boardMetadata} = params;
        const project = await this._projectCustomRepository.findByIdWithException(projectId);
        const boardView = new ProjectView();
        boardView.project = project;
        boardView.details = {
            name: boardMetadata.name,
            description: boardMetadata.description
        }
        boardView.boardColumns = this.createInitialBoardColumns();
        const boardCategory =  await AppDataSource.getRepository(ProjectViewCategory).findOneBy({name: "Board"});
        if (!boardCategory) {
            throw new GenericException("Categories not initialized", 500);
        }
        boardView.viewCategory = boardCategory;
        await this._projectRepository.save(project);
    }

    public async getProjectView(params: {projectId: number, viewId: number}) {
        const view = await AppDataSource.getRepository(ProjectView).findOne({
            where: {
                id: params.viewId,
                project: { id: params.projectId }
            },
            relations: ['project', 'viewCategory', 'boardColumns'] // Assuming 'project' is the name of the relation in ProjectView entity
        })

        if (!view) {
            throw new BadRequestError({message: "Not such view in this project!", statusCode: 400})
        }
        return view;
    }

    public async getProjectViews(projectId: number) {
        const project = await this._projectCustomRepository.findByIdWithException(projectId);
        const projectViews = await AppDataSource.getRepository(ProjectView).find({
            where: {
                project : {id: projectId}
            },
            relations: ['project', 'viewCategory'] // Assuming 'project' is the name of the relation in ProjectView entity
        })
        return projectViews;
    }

    public async addIssuesToBoard(params: {projectId: number, viewId: number, issueIds: number[]}) {
        const {projectId, viewId} = params;
        const boardView = await this.getProjectView({projectId, viewId});
        if (boardView.viewCategory.name !== "Board") {
            throw new BadRequestError({message: "Current view isn't board"})
        }
    }

    public async deleteView(params: {projectId: number, viewId: number}) {
        const {projectId, viewId} = params;
        const projectView = await this.getProjectView({projectId, viewId});
        await AppDataSource.getRepository(ProjectView).manager.remove(projectView.boardColumns)
        const result = await AppDataSource.getRepository(ProjectView).remove(projectView);
        return result;
    }
}