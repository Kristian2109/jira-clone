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

  public async save(issue: Issue) {
    return this._issueNativeRepo.save(issue);
  }

  public async saveMany(issues: Issue[]) {
    return this._issueNativeRepo.save(issues);
  }

  public async setBoardIssueToNull(issueId: number) {
    return this._issueNativeRepo
      .createQueryBuilder()
      .relation(Issue, "boardColumn")
      .of(issueId) // you can use just post id as well
      .set(null);
  }

  public async findIssueWithRelations(
    issueIdentifier: { projectId: Id; issueId: Id },
    relations: string[] = []
  ) {
    return this._issueNativeRepo.findOneOrFail({
      where: {
        id: issueIdentifier.issueId,
        issueType: {
          project: {
            id: issueIdentifier.projectId,
          },
        },
      },
      relations,
    });
  }

  public async findWithAllRelations(projectId: Id, issueId: Id) {
    return this.findIssueWithRelations({ projectId, issueId }, [
      "issueType",
      "issueType.issueFields",
      "fields",
      "fields.issueField",
      "boardColumn",
    ]);
  }

  public async findIssueWithFieldsAndColumn(projectId: Id, issueId: Id) {
    return this.findIssueWithRelations({ projectId, issueId }, [
      "fields",
      "fields.issueField",
      "boardColumn",
      "issueType",
    ]);
  }

  public async countOfTasksInProject(projectId: Id) {
    return this._issueNativeRepo.count({
      where: {
        issueType: {
          project: {
            id: projectId,
          },
        },
      },
    });
  }

  public async findIssuesByProject(
    projectId: Id,
    filters: { key: string; value: string }[] = []
  ): Promise<Issue[]> {
    const isCompleted = filters.find((filter) => filter.key === "isCompleted");

    return this._issueNativeRepo.find({
      where: {
        issueType: {
          project: {
            id: projectId,
          },
        },
        isCompleted:
          isCompleted != undefined ? Boolean(isCompleted.value) : false,
      },
      relations: ["boardColumn", "issueType"],
    });
  }

  public async findIssuesByUser(
    userId: Id,
    pagination: { begin: number; end: number } = { begin: 0, end: 10 }
  ) {
    return this._issueNativeRepo.find({
      where: {
        createdBy: {
          id: userId,
        },
      },
      order: {
        createdAt: "DESC",
      },
      skip: pagination.begin,
      take: pagination.end - pagination.begin,
      relations: ["issueType", "issueType.project"],
    });
  }

  public async findIssuesByBoard(projectId: number, columnId: number) {
    return this._issueNativeRepo.find({
      where: {
        boardColumn: {
          id: columnId,
        },
        issueType: {
          project: {
            id: projectId,
          },
        },
      },
      relations: ["boardColumn", "issueType", "issueType.project"],
    });
  }
}
