import { injectable } from "inversify";
import { AppDataSource } from "../config/datasource";
import { Repository } from "typeorm";
import Issue from "../entities/issue/issue";
import { Id } from "../types/genericTypes";

@injectable()
export default class IssueRepository {
    protected _issueNativeRepo: Repository<Issue>;
    constructor() {
        this._issueNativeRepo = AppDataSource.getRepository(Issue);
    }

    public async save(issueType: Issue) {
        return this._issueNativeRepo.save(issueType);
    }

    public async findIssueWithRelations(issueIdentifier: {projectId: Id, issueId: Id}, relations: string[] = []) {
        return this._issueNativeRepo.findOneOrFail({
            where: {
                id: issueIdentifier.issueId,
                issueType: {
                    project: {
                        id: issueIdentifier.projectId
                    }
                }
            },
            relations
        })
    }

    public async findWithAllRelations(projectId: Id, issueId: Id) {
        return this.findIssueWithRelations(
            {projectId, issueId},
            ["issueType", "issueType.issueFields", "fields", "fields.issueField", "boardColumn"]
            );
    }

    public async findIssueWithFieldsAndColumn(projectId: Id, issueId: Id) {
        return this.findIssueWithRelations(
            {projectId, issueId},
            ["issueType", "fields", "fields.issueField", "boardColumn"]
            );
    }

    public async countOfTasksInProject(projectId: Id) {
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

    public async findIssuesByProject(projectId: Id): Promise<Issue[]> {
        return this._issueNativeRepo.find({
            where: {
                issueType: {
                    project: {
                        id: projectId
                    }
                }
            },
            relations: ["boardColumn"]
        })
    }
}