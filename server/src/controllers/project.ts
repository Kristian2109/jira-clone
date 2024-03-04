import { controller, httpDelete, httpGet, httpPatch, httpPost } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { ProjectCreateSchema } from "../types/project";
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
    public getProject(req: Request, res: Response) {
        const projectId = req.params.projectId;
    }

    @httpGet("/:projectId/views") 
    public getViews(req: Request, res: Response) {

    }

    @httpPost("/:projectId/views")
    public addView(req: Request, res: Response) {

    }

    @httpGet("/:projectId/views/:viewId") 
    public getView(req: Request, res: Response) {

    }

    @httpPatch("/:projectId/views/:viewId") 
    public updateView(req: Request, res: Response) {

    }

    @httpDelete("/:projectId/views/:viewId") 
    public deleteView(req: Request, res: Response) {

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