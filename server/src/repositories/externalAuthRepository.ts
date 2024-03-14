import { injectable } from "inversify";
import { Repository } from "typeorm";
import UserAccount from "../entities/account/userAccount";
import { AppDataSource } from "../config/datasource";
import { Id } from "../types/genericTypes";
import ExternalUserLogin from "../entities/account/externalUserLogin";

@injectable()
export default class ExternalAuthRepository {
    private nativeRepo: Repository<ExternalUserLogin>;
    constructor() {
        this.nativeRepo = AppDataSource.getRepository(ExternalUserLogin);
    }

    public async findByIdWithUser(externalId: string) {
        return this.nativeRepo.findOne({
            where: {
                externalId
            },
            relations: {
                user: true
            }
        })
    }
}