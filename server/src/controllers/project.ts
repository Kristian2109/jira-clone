import { controller, httpDelete, httpGet, httpPatch, httpPost } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { ProjectCreateSchema, NameAndDescriptionSchema, BoardColumnCreateSchema } from "../types/project";
import ProjectManager from "../services/projectManager";
import { AuthenticatedRequest } from "../types/auth";
import JwtResolver from "../middleware/jwtResolver";
import BoardManager from "../services/boardManager";

@controller("/projects", JwtResolver.resolve)
class ProjectController {
    private _projectManager: ProjectManager;
    private _boardManager: BoardManager;

    constructor(projectManager: ProjectManager, boardManager: BoardManager) {
        this._projectManager = projectManager;
        this._boardManager = boardManager;

    }

    @httpPost("/", JwtResolver.resolve)
    public async createProject(req: AuthenticatedRequest, res: Response) {
        const projectToCreate = ProjectCreateSchema.parse(req.body);
        const project = await this._projectManager.createProject(projectToCreate, req.user.id);
        return res.status(201).json({
            message: "Success",
            data: {
                project
            }
        })
    }

    @httpGet("/me") 
    public async getUserProjects(req: AuthenticatedRequest, res: Response) {
        const projects = await this._projectManager.getUserProjects(req.user.id);
        return res.status(200).json({data: {projects}});
    }

    @httpGet("/:projectId")
    public async getProject(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const project = await this._projectManager.getProjectById(projectId);
        return res.status(200).json({data: {project}});
    }

    @httpGet("/:projectId/board") 
    public async getProjectBoard(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const board = await this._boardManager.getBoard({projectId});
        return res.status(200).json({data: {board}});
    }

    @httpPost("/:projectId/board")
    public async createBoard(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const board = NameAndDescriptionSchema.parse(req.body);
        await this._boardManager.createBoard({ projectId, boardMetadata: board});
        return res.sendStatus(201);
    }

    @httpPost("/:projectId/board/columns") 
    public async addBoardColumn(req: AuthenticatedRequest, res: Response) {
        const columnToAdd = BoardColumnCreateSchema.parse(req.body);
        const projectId = Number(req.params.projectId);
        await this._boardManager.addBoardColumn({columnDTO: columnToAdd, projectId});
        return res.sendStatus(201);
    }

    @httpDelete("/:projectId/board/columns/:columnId") 
    public async deleteBoardColumn(req: AuthenticatedRequest, res: Response) {
        const columnToDeleteId = Number(req.params.columnId);
        const projectId = Number(req.params.projectId);
        await this._boardManager.deleteBoardColumn({columnId: columnToDeleteId, projectId});
        return res.sendStatus(204);
    }

    @httpPost("/:projectId/members") 
    public async inviteUser(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const userEmail = req.body.userEmail;
        await this._projectManager.inviteUser(projectId, userEmail);
        return res.sendStatus(201);
    }

    @httpPatch("/:projectId/members/accept") 
    public async acceptInvitation(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        await this._projectManager.acceptInvitation(projectId, req.user.id);
        return res.sendStatus(201);
    }

    @httpPatch("/:projectId/members/decline") 
    public async declineInvitation(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        await this._projectManager.declineInvitation(projectId, req.user.id);
        return res.sendStatus(204);
    }

    @httpPost("/:projectId/board/issues") 
    public addIssueToBoard(req: AuthenticatedRequest, res: Response) {
        
    }

    @httpGet("/:projectId/issueTypes")
    public getIssueTypes(req: Request, res: Response) {

    }

    @httpPost("/:projectId/issueTypes")
    public createIssueType(req: Request, res: Response) {

    }

    @httpDelete("/:projectId/issueTypes/:issueTypeId")
    public deleteIssueType(req: Request, res: Response) {

    }

    @httpPatch("/:projectId/issueTypes/:issueTypeId")
    public updateIssueType(req: Request, res: Response) {

    }

    @httpGet("/:projectId/issueTypes/:issueTypeId")
    public getIssueType(req: Request, res: Response) {

    }

    @httpPost("/:projectId/issueTypes/:issueTypeId/fields")
    public addIssueField(req: Request, res: Response) {

    }

    @httpDelete("/:projectId/issueTypes/:issueTypeId/fields")
    public deleteIssueField(req: Request, res: Response) {

    }

    @httpPatch("/:projectId/issueTypes/:issueTypeId/fields")
    public updateIssueField(req: Request, res: Response) {

    }
}

export default ProjectController;