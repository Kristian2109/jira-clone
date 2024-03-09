import { injectable } from "inversify";
import { NameAndDescription, OrderNumber } from "../types/project";
import IssueTypeRepository from "../repositories/issueTypeRepository";
import IssueTypeMapper from "../mappers/issueTypeMapper";
import ProjectRepository from "../repositories/projectRepository";
import { IssueCreate, IssueFieldCreate } from "../types/issue";
import IssueFieldMapper from "../mappers/issueFieldMapper";
import OrderNumberManager from "./orderManager";
import IssueField from "../entities/issue/issueField";
import UserManager from "./userManager";
import IssueMapper from "../mappers/issueMapper";
import IssueRepository from "../repositories/issueReposiotry";
import Project from "../entities/project/project";

@injectable()
export default class IssueManager {
    protected _issueTypeRepository: IssueTypeRepository;
    protected _projectRepository: ProjectRepository;
    protected _orderNumberManager: OrderNumberManager<IssueField>;
    protected _userManager: UserManager;
    protected _issueRepository: IssueRepository;

    constructor
    (
        issueTypeRepository: IssueTypeRepository,
        projectRepository: ProjectRepository, 
        orderNumberManager: OrderNumberManager<IssueField>, 
        userManager: UserManager,
        issueRepository: IssueRepository
    ) 
    {
        this._issueTypeRepository = issueTypeRepository;
        this._projectRepository = projectRepository;
        this._orderNumberManager = orderNumberManager;
        this._userManager = userManager;
        this._issueRepository = issueRepository;
    }

    public async createIssueType(projectId: number, details: NameAndDescription) {
        const project = await this._projectRepository.findByIdWithException(projectId)
        const newIssueType = IssueTypeMapper.toIssueType(details);
        newIssueType.project = project;
        return await this._issueTypeRepository.save(newIssueType);
    }

    public async createIssueField(params: {projectId: number, issueTypeId: number, issueField: IssueFieldCreate}) {
        const {projectId, issueTypeId, issueField} = params;

        const issueType = await this._issueTypeRepository.findIssueTypeWithFields(projectId, issueTypeId);

        const newIssueField = IssueFieldMapper.toEntity(issueField);
        this._orderNumberManager.addNewColumnAndSetOrder(issueType.issueFields, newIssueField);

        return this._issueTypeRepository.save(issueType);
    }

    public async findIssueType(projectId: number, issueTypeId: number) {
        return this._issueTypeRepository.findIssueTypeWithFields(projectId, issueTypeId);
    }

    public async findIssue(projectId: number, issueId: number) {
        return this._issueRepository.find(projectId, issueId);
    }

    public async createIssue(params: {projectId: number, createdById: number, issueToCreate: IssueCreate}) {
        const {projectId, createdById, issueToCreate} = params;
        const createdBy = await this._userManager.getUserByIdWithException(createdById);
        const issueType = await this._issueTypeRepository.findIssueTypeWithFields(projectId, issueToCreate.issueTypeId);
        const project = await this._projectRepository.findByIdWithException(projectId);

        const newIssue = IssueMapper.toEntity(issueToCreate);
        newIssue.createdBy = createdBy;
        newIssue.issueType = issueType;
        newIssue.key = await this.generateIssueKey(project);
        return this._issueRepository.save(newIssue);
    }

    private async generateIssueKey(project: Project) {
        const projectName = project.key;
        const tasksCount = await this._issueRepository.countOfTasksInProject(project.id);
        return `${projectName}-${tasksCount}`;
    }
}