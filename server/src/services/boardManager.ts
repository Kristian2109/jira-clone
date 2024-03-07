import { injectable } from "inversify";
import BoardColumn from "../entities/boardColumn";
import ProjectRepository from "../repositories/projectRepository";
import { Repository } from "typeorm";
import Project from "../entities/project";
import UserManager from "./userManager";
import { AppDataSource } from "../config/datasource";
import Board from "../entities/board";
import GenericException from "../exceptions/genericException";
import BadRequestError from "../exceptions/badRequestError";
import { ViewCreate } from "../types/project";
import BoardRepository from "../repositories/boardRepository";

@injectable()
export default class BoardManager {
    protected _projectCustomRepository: ProjectRepository;
    protected _boardRepository: BoardRepository;

    constructor(projectRepository: ProjectRepository, boardRepository: BoardRepository) {
        this._projectCustomRepository = projectRepository;
        this._boardRepository = boardRepository;
    }

    public async createBoard(params: {projectId: number, boardMetadata: ViewCreate}) {
        const {projectId, boardMetadata} = params;
        const project = await this._projectCustomRepository.findByIdWithException(projectId);
        const boardView = new Board();
        boardView.name = boardMetadata.name,
        boardView.description = boardMetadata.description
        boardView.boardColumns = this.createInitialBoardColumns();
        project.board = boardView
        return this._projectCustomRepository.save(project);
    }

    public async getBoard(params: {projectId: number}) {
        const { projectId } = params;
        return (await this._projectCustomRepository.findWithBoard(projectId)).board;
    }

    private createInitialBoardColumns() {
        return [
            new BoardColumn("To Do", "Tasks to be done.", 1),
            new BoardColumn("In Progress", "Tasks in progress.", 2),
            new BoardColumn("Done", "Done tasks.", 3)
        ]
    } 
}