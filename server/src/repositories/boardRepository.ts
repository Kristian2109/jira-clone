import { injectable } from "inversify";
import { Repository } from "typeorm";
import Board from "../entities/board";
import { AppDataSource } from "../config/datasource";
import BadRequestError from "../exceptions/badRequestError";

@injectable()
export default class BoardRepository {
    protected _nativeRepo: Repository<Board>;
    constructor() {
        this._nativeRepo = AppDataSource.getRepository(Board);
    }

    public async save(board: Board) {
        return this._nativeRepo.save(board);
    }

    public async findById(boardId: number) {
        return this._nativeRepo.findOneBy({id: boardId});
    }

    public async findByIdWithException(projectId: number): Promise<Board> {
        const foundProject = await this.findById(projectId);
        if (!foundProject) {
            throw new BadRequestError({message: `No ${this._nativeRepo.target.toString()} with id: ${projectId}!`, statusCode: 400});
        }
        return foundProject;
    }
}