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
import { BorderColumnCreate, NameAndDescription } from "../types/project";
import BoardRepository from "../repositories/boardRepository";
import BoardColumnMapper from "../mappers/boardMapper";

@injectable()
export default class BoardManager {
    protected _projectCustomRepository: ProjectRepository;
    protected _boardRepository: BoardRepository;

    constructor(projectRepository: ProjectRepository, boardRepository: BoardRepository) {
        this._projectCustomRepository = projectRepository;
        this._boardRepository = boardRepository;
    }

    public async createBoard(params: {projectId: number, boardMetadata: NameAndDescription}) {
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

    public async addBoardColumn(params: {columnDTO: BorderColumnCreate, projectId: number}) {
        const {columnDTO, projectId} = params;
        const project = await this._projectCustomRepository.findWithBoard(projectId)
        const board = project.board;

        const newColumn = BoardColumnMapper.toColumn(columnDTO);
        newColumn.board = board;
        this.addNewColumnAndSetOrder(board.boardColumns, newColumn);
        this._boardRepository.save(board);
    }

    public async deleteBoardColumn(params: {columnId: number, projectId: number}) {
        const {columnId, projectId} = params;
        const project = await this._projectCustomRepository.findWithBoard(projectId);
        const board = project.board;
        const columnToDeleteIndex = board.boardColumns.findIndex((column) => column.id === columnId)

        if (columnToDeleteIndex === -1) {
            throw new BadRequestError({message: "Not column with id: " + columnId + " found!", statusCode: 400})
        }
        this.deleteColumnAndSetOrder(board.boardColumns, columnToDeleteIndex);
        this._projectCustomRepository.save(project);

    }

    private createInitialBoardColumns() {
        return [
            new BoardColumn("To Do", "Tasks to be done.", 1),
            new BoardColumn("In Progress", "Tasks in progress.", 2),
            new BoardColumn("Done", "Done tasks.", 3)
        ]
    } 

    private addNewColumnAndSetOrder(columns: BoardColumn[], newColumn: BoardColumn) {
        const currentColumnsCount = columns.length;
        if (currentColumnsCount < newColumn.orderNumber) {
            newColumn.orderNumber = currentColumnsCount + 1;
        } else {
            columns.forEach(column => {
                if (column.orderNumber >= newColumn.orderNumber) {
                    column.orderNumber++;
                }
            })
        }
        columns.push(newColumn);
    }

    private deleteColumnAndSetOrder(columns: BoardColumn[], columnToDeleteIndex: number) {
        const toDeleteOrder = columns[columnToDeleteIndex].orderNumber;
        columns.forEach(column => {
            if (column.orderNumber > toDeleteOrder) {
                column.orderNumber--;
            }
        })

        columns.splice(columnToDeleteIndex, 1);
    }
}