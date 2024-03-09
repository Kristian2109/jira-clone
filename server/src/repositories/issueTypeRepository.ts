import { injectable } from "inversify";
import { AppDataSource } from "../config/datasource";
import { Repository } from "typeorm";
import IssueType from "../entities/issue/issueType";

@injectable()
export default class IssueTypeRepository {
    protected _issueNativeRepo: Repository<IssueType>;
    constructor() {
        this._issueNativeRepo = AppDataSource.getRepository(IssueType);
    }

    public async save(issueType: IssueType) {
        return this._issueNativeRepo.save(issueType);
    }

    public async findIssueTypeWithFields(projectId: number, issueId: number) {
        return this._issueNativeRepo.findOneOrFail({
            where: {
                project: {
                    id: projectId
                },
                id: issueId,
            },
            relations: {
                "issueFields": true
            }
        })
    }
}