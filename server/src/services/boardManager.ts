import { injectable } from "inversify";
import BoardColumn from "../entities/project/boardColumn";
import ProjectRepository from "../repositories/projectRepository";
import Board from "../entities/project/board";
import BadRequestError from "../exceptions/badRequestError";
import { BorderColumnCreate, NameAndDescription } from "../types/project";
import BoardRepository from "../repositories/boardRepository";
import BoardColumnMapper from "../mappers/boardMapper";
import OrderNumberManager from "./orderManager";
import IssueRepository from "../repositories/issueReposiotry";

@injectable()
export default class BoardManager {
  protected _projectCustomRepository: ProjectRepository;
  protected _boardRepository: BoardRepository;
  protected _orderNumberManager: OrderNumberManager<BoardColumn>;
  protected _issueCustomRepository: IssueRepository;

  constructor(
    projectRepository: ProjectRepository,
    boardRepository: BoardRepository,
    orderNumberManager: OrderNumberManager<BoardColumn>,
    issueCustomRepository: IssueRepository
  ) {
    this._projectCustomRepository = projectRepository;
    this._boardRepository = boardRepository;
    this._orderNumberManager = orderNumberManager;
    this._issueCustomRepository = issueCustomRepository;
  }

  public async createBoard(params: {
    projectId: number;
    boardMetadata: NameAndDescription;
  }) {
    const { projectId, boardMetadata } = params;
    const project = await this._projectCustomRepository.findWithBoard(
      projectId
    );

    if (project.board) {
      throw new BadRequestError({
        message: "Board already exists!",
        statusCode: 400,
      });
    }

    const boardView = new Board();
    boardView.name = boardMetadata.name;
    boardView.description = boardMetadata.description;
    boardView.boardColumns = this.createInitialBoardColumns();
    project.board = boardView;
    return this._projectCustomRepository.save(project);
  }

  public async getBoard(params: { projectId: number }) {
    const { projectId } = params;
    return (await this._projectCustomRepository.findWithBoard(projectId)).board;
  }

  public async getFullBoard(params: { projectId: number }) {
    return this._projectCustomRepository.findFullBoard(params.projectId);
  }

  public async addBoardColumn(params: {
    columnDTO: BorderColumnCreate;
    projectId: number;
  }) {
    const { columnDTO, projectId } = params;
    const project = await this._projectCustomRepository.findWithBoard(
      projectId
    );
    const board = project.board;

    const newColumn = BoardColumnMapper.toColumn(columnDTO);
    newColumn.board = board;
    this._orderNumberManager.addNewColumnAndSetOrder(
      board.boardColumns,
      newColumn
    );
    this._boardRepository.save(board);
  }

  public async deleteBoardColumn(params: {
    columnId: number;
    projectId: number;
  }) {
    const { columnId, projectId } = params;
    const project = await this._projectCustomRepository.findWithBoard(
      projectId
    );
    const board = project.board;
    const columnToDeleteIndex = board.boardColumns.findIndex(
      (column) => column.id === columnId
    );

    if (columnToDeleteIndex === -1) {
      throw new BadRequestError({
        message: "Not column with id: " + columnId + " found!",
        statusCode: 400,
      });
    }
    this._orderNumberManager.deleteColumnAndSetOrder(
      board.boardColumns,
      columnToDeleteIndex
    );
    const issues = await this._issueCustomRepository.findIssuesByBoard(
      projectId,
      columnId
    );

    for (let issue of issues) {
      const updatedIssue =
        await this._issueCustomRepository.setBoardIssueToNull(issue.id);
    }
    await this._projectCustomRepository.save(project);
    this._boardRepository.deleteColumn(columnId);
  }

  private createInitialBoardColumns() {
    return [
      new BoardColumn("To Do", "Tasks to be done.", 1),
      new BoardColumn("In Progress", "Tasks in progress.", 2),
      new BoardColumn("Done", "Done tasks.", 3),
    ];
  }
}
