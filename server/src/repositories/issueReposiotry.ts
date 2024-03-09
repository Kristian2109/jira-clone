import { injectable } from "inversify";
import { AppDataSource } from "../config/datasource";
import { Repository } from "typeorm";
import IssueType from "../entities/issue/issueType";
import Issue from "../entities/issue/issue";

@injectable()
export default class IssueRepository {
    protected _issueNativeRepo: Repository<Issue>;
    constructor() {
        this._issueNativeRepo = AppDataSource.getRepository(Issue);
    }

    public async save(issueType: Issue) {
        return this._issueNativeRepo.save(issueType);
    }

    public async find(projectId: number, issueId: number) {
        return this._issueNativeRepo.findOneOrFail({
            where: {
                id: issueId,
                issueType: {
                    project: {
                        id: projectId
                    }
                }
            },
            relations: ["issueType", "fields", "fields.issueField"]
        })
    }

    public async countOfTasksInProject(projectId: number) {
        return this._issueNativeRepo.count({
            where: {
                issueType: {
                    project: {
                        id: projectId
                    }
                }
            }
        })
    }

}