import { injectable } from "inversify";
import { Repository } from "typeorm";
import Board from "../entities/project/board";
import { AppDataSource } from "../config/datasource";
import BadRequestError from "../exceptions/badRequestError";
import BoardColumn from "../entities/project/boardColumn";

@injectable()
export default class BoardRepository {
  protected _nativeRepo: Repository<Board>;
  protected _columnNativeRepo: Repository<BoardColumn>;
  constructor() {
    this._nativeRepo = AppDataSource.getRepository(Board);
    this._columnNativeRepo = AppDataSource.getRepository(BoardColumn);
  }

  public async save(board: Board) {
    return this._nativeRepo.save(board);
  }

  public async findById(boardId: number) {
    return this._nativeRepo.findOneBy({ id: boardId });
  }

  public async findByIdWithException(projectId: number): Promise<Board> {
    const foundProject = await this.findById(projectId);
    if (!foundProject) {
      throw new BadRequestError({
        message: `No Project with id: ${projectId}!`,
        statusCode: 400,
      });
    }
    return foundProject;
  }

  public async deleteColumn(columnId: number) {
    await this._columnNativeRepo.delete({ id: columnId });
  }
}
