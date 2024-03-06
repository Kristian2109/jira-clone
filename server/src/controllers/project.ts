import { controller, httpDelete, httpGet, httpPatch, httpPost } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { ProjectCreateSchema, ViewCreateSchema } from "../types/project";
import ProjectManager from "../services/projectManaget";
import { AuthenticatedRequest } from "../types/auth";
import JwtResolver from "../middleware/jwtResolver";

@controller("/projects", JwtResolver.resolve)
class ProjectController {
    private _projectManager: ProjectManager;

    constructor(projectManager: ProjectManager) {
        this._projectManager = projectManager;
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
        const project = await this._projectManager.getProjectByIdWithException(projectId);
        return res.status(200).json({data: {project}});
    }

    @httpGet("/:projectId/views") 
    public async getViews(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const views = await this._projectManager.getProjectViews(projectId);
        return res.status(200).json({data: {views}});
    }

    @httpPost("/:projectId/views/board")
    public async addView(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const board = ViewCreateSchema.parse(req.body);
        await this._projectManager.createBoardView({ projectId, boardMetadata: board});
        return res.sendStatus(201);
    }

    @httpGet("/:projectId/views/:viewId") 
    public async getView(req: AuthenticatedRequest, res: Response) {
        const {projectId, viewId} = req.params;
        const projectView = await this._projectManager.getProjectView({projectId: Number(projectId), viewId: Number(viewId)});
        return res.status(200).json({data: {projectView}})
    }

    @httpPatch("/:projectId/views/:viewId/addIssues") 
    public addIssueToView(req: AuthenticatedRequest, res: Response) {

    }

    @httpDelete("/:projectId/views/:viewId") 
    public deleteView(req: AuthenticatedRequest, res: Response) {
        const {viewId, projectId } = req.params;
        const result = this._projectManager.deleteView({projectId: Number(projectId), viewId: Number(viewId)});
        return res.status(201).json({data: {result}})
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