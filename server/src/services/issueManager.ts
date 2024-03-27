import { injectable } from "inversify";
import { NameAndDescription, OrderNumber } from "../types/project";
import IssueTypeRepository from "../repositories/issueTypeRepository";
import IssueTypeMapper from "../mappers/issueTypeMapper";
import ProjectRepository from "../repositories/projectRepository";
import {
  IssueCreate,
  IssueFieldContentCreate,
  IssueFieldCreate,
  IssueUpdate,
} from "../types/issue";
import IssueFieldMapper from "../mappers/issueFieldMapper";
import OrderNumberManager from "./orderManager";
import IssueField from "../entities/issue/issueField";
import UserManager from "./userManager";
import IssueMapper from "../mappers/issueMapper";
import IssueRepository from "../repositories/issueReposiotry";
import Project from "../entities/project/project";
import { Id } from "../types/genericTypes";
import Issue from "../entities/issue/issue";
import BadRequestError from "../exceptions/badRequestError";
import IssueFieldContent from "../entities/issue/issueFieldContent";
import IssueType from "../entities/issue/issueType";

@injectable()
export default class IssueManager {
  protected _issueTypeRepository: IssueTypeRepository;
  protected _projectRepository: ProjectRepository;
  protected _orderNumberManager: OrderNumberManager<IssueField>;
  protected _userManager: UserManager;
  protected _issueRepository: IssueRepository;

  constructor(
    issueTypeRepository: IssueTypeRepository,
    projectRepository: ProjectRepository,
    orderNumberManager: OrderNumberManager<IssueField>,
    userManager: UserManager,
    issueRepository: IssueRepository
  ) {
    this._issueTypeRepository = issueTypeRepository;
    this._projectRepository = projectRepository;
    this._orderNumberManager = orderNumberManager;
    this._userManager = userManager;
    this._issueRepository = issueRepository;
  }

  public async createIssueType(projectId: number, details: NameAndDescription) {
    const project = await this._projectRepository.findByIdWithException(
      projectId
    );
    const newIssueType = IssueTypeMapper.toIssueType(details);
    newIssueType.project = project;
    return await this._issueTypeRepository.save(newIssueType);
  }

  public async createIssueField(params: {
    projectId: number;
    issueTypeId: number;
    issueField: IssueFieldCreate;
  }) {
    const { projectId, issueTypeId, issueField } = params;

    const issueType = await this._issueTypeRepository.findIssueTypeWithFields(
      projectId,
      issueTypeId
    );

    const newIssueField = IssueFieldMapper.toEntity(issueField);
    this._orderNumberManager.addNewColumnAndSetOrder(
      issueType.issueFields,
      newIssueField
    );

    return this._issueTypeRepository.save(issueType);
  }

  public async addIssueToBoard(params: {
    projectId: Id;
    issueId: Id;
    boardColumnId: Id;
  }) {
    const { projectId, issueId, boardColumnId } = params;

    const issue = await this._issueRepository.findWithAllRelations(
      projectId,
      issueId
    );
    await this.setBoardColumnToIssue(issue, projectId, boardColumnId);
    return this._issueRepository.save(issue);
  }

  public async findIssueType(projectId: number, issueTypeId: number) {
    return this._issueTypeRepository.findIssueTypeWithFields(
      projectId,
      issueTypeId
    );
  }

  public async findIssue(projectId: number, issueId: number) {
    return this._issueRepository.findIssueWithFieldsAndColumn(
      projectId,
      issueId
    );
  }

  public async findIssuesByProject(
    projectId: number,
    filters: { key: string; value: string }[]
  ) {
    return this._issueRepository.findIssuesByProject(projectId, filters);
  }

  public async updateIssueField(params: {
    projectId: number;
    issueId: number;
    updateInfo: IssueUpdate;
  }) {
    const { projectId, issueId, updateInfo } = params;
    const issue = await this._issueRepository.findWithAllRelations(
      projectId,
      issueId
    );
    const issueTypeFields = issue.issueType.issueFields;

    issue.summary = updateInfo.summary || issue.summary;
    if (updateInfo.isCompleted !== undefined) {
      issue.isCompleted = updateInfo.isCompleted;
    }

    updateInfo.fields?.forEach((updatedField) => {
      const issueField = issueTypeFields.find(
        (field) => field.id === updatedField.issueFieldId
      );
      if (!issueField) {
        throw new BadRequestError({
          message: `Field with id ${updatedField.issueFieldId} is not part of issue of type ${issue.issueType.name}!`,
          statusCode: 400,
        });
      }
      let fieldIndexToUpdate = issue.fields.findIndex(
        (field) => field.issueField.id === issueField.id
      );
      if (fieldIndexToUpdate === -1) {
        throw new Error(`Field with id ${issueField.id} cannot be found!`);
      }
      issue.fields[fieldIndexToUpdate].content = updatedField.content;
    });

    return this._issueRepository.save(issue);
  }

  public async createIssue(params: {
    projectId: number;
    createdById: number;
    issueToCreate: IssueCreate;
  }) {
    const { projectId, createdById, issueToCreate } = params;
    const createdBy = await this._userManager.getUserByIdWithException(
      createdById
    );
    const issueType = await this._issueTypeRepository.findIssueTypeWithFields(
      projectId,
      issueToCreate.issueTypeId
    );
    const project = await this._projectRepository.findByIdWithException(
      projectId
    );

    const newIssue = IssueMapper.toEntity(issueToCreate);
    newIssue.createdBy = createdBy;
    newIssue.key = await this.generateIssueKey(project);
    newIssue.fields = this.getIssueFieldsContent(
      issueType,
      issueToCreate.fields
    );
    newIssue.issueType = issueType;

    if (issueToCreate.boardColumnId) {
      await this.setBoardColumnToIssue(
        newIssue,
        projectId,
        issueToCreate.boardColumnId
      );
    }

    return this._issueRepository.save(newIssue);
  }

  private getIssueFieldsContent(
    issueType: IssueType,
    issueFieldsContent?: IssueFieldContentCreate[]
  ): IssueFieldContent[] {
    return issueType.issueFields.map((fieldType) => {
      const fieldToAdd = issueFieldsContent?.find(
        (field) => field.issueFieldId === fieldType.id
      );
      const fieldContent = fieldToAdd ? fieldToAdd.content : "";
      return new IssueFieldContent(fieldType, fieldContent);
    });
  }

  private async generateIssueKey(project: Project) {
    const projectName = project.key;
    const tasksCount = await this._issueRepository.countOfTasksInProject(
      project.id
    );
    return `${projectName}-${tasksCount}`;
  }

  private async setBoardColumnToIssue(
    issue: Issue,
    projectId: Id,
    boardColumnId: Id
  ) {
    const board = (await this._projectRepository.findWithBoard(projectId))
      .board;
    const boardColumn = board.boardColumns.find(
      (column) => column.id === boardColumnId
    );
    if (!boardColumn) {
      throw new BadRequestError({
        message: `Board column with id: ${boardColumnId} is not a part of board: ${board.name}!`,
        statusCode: 400,
      });
    }
    issue.boardColumn = boardColumn;
    this._issueRepository.save(issue);
  }
}
