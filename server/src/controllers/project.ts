import { Controller, controller, httpDelete, httpGet, httpPatch, httpPost, interfaces } from "inversify-express-utils";
import container from "../config/inversify.config";
import { Response } from "express";
import { ProjectCreateSchema, NameAndDescriptionSchema, BoardColumnCreateSchema } from "../types/project";
import ProjectManager from "../services/projectManager";
import { AuthenticatedRequest } from "../types/auth";
import JwtResolver from "../middleware/jwtResolver";
import BoardManager from "../services/boardManager";
import IssueManager from "../services/issueManager";
import { IssueCreateSchema, IssueFieldCreateSchema, IssueUpdateSchema } from "../types/issue";
import { IdSchema } from "../types/genericTypes";

@controller("/projects")
class ProjectController {
    private _projectManager: ProjectManager;
    private _boardManager: BoardManager;
    private _issueManager: IssueManager;

    constructor(
        projectManager: ProjectManager, 
        boardManager: BoardManager,
        issueManager: IssueManager
        ) 
        {
            this._projectManager = projectManager;
            this._boardManager = boardManager;
            this._issueManager = issueManager;
        }

    @httpPost("/")
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

    @httpPatch("/:projectId/boardColumns/:boardColumnId/addIssue") 
    public async addIssueToBoard(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const boardColumnId = Number(req.params.boardColumnId);
        const issueId = Number(req.body.issueId)
        const issue = await this._issueManager.addIssueToBoard({projectId, boardColumnId, issueId})
        return res.status(200).json({
            data: {
                issue
            }
        })
    }

    @httpPost("/:projectId/issueTypes")
    public async createIssueType(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const issueDetails = NameAndDescriptionSchema.parse(req.body);
        const newIssueType = await this._issueManager.createIssueType(projectId, issueDetails);
        return res.status(201).json({
            data: {
                newIssueType
            }
        })
    }

    // @httpDelete("/:projectId/issueTypes/:issueTypeId")
    // public deleteIssueType(req: Request, res: Response) {

    // }

    // @httpPatch("/:projectId/issueTypes/:issueTypeId")
    // public updateIssueType(req: Request, res: Response) {

    // }

    @httpGet("/:projectId/issueTypes/:issueTypeId")
    public async getIssueType(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const issueTypeId = Number(req.params.issueTypeId);
        const issueType = await this._issueManager.findIssueType(projectId, issueTypeId);

        return res.status(200).json({
            data: {
                issueType
            }
        })
    }

    @httpPost("/:projectId/issueTypes/:issueTypeId/fields")
    public async addIssueField(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const issueTypeId = Number(req.params.issueTypeId);
        const fieldToCreate = IssueFieldCreateSchema.parse(req.body)

        const updatedIssueType = await this._issueManager.createIssueField({projectId, issueTypeId, issueField: fieldToCreate});

        return res.status(201).json({
            data: {
                issueType: updatedIssueType
            }
        })
    }

    // @httpDelete("/:projectId/issueTypes/:issueTypeId/fields")
    // public deleteIssueField(req: Request, res: Response) {
        
    // }

    // @httpPatch("/:projectId/issueTypes/:issueTypeId/fields")
    // public updateIssueField(req: Request, res: Response) {

    // }

    @httpPost("/:projectId/issues")
    public async createIssue(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const issueToCreate = IssueCreateSchema.parse(req.body);
        
        const createdIssue = await this._issueManager.createIssue({projectId, createdById: req.user.id, issueToCreate});
        
        return res.status(201).json({
            data: {
                createdIssue
            }
        })
    }

    @httpGet("/:projectId/issues/:issueId")
    public async getIssue(req: AuthenticatedRequest, res: Response) {
        const projectId = Number(req.params.projectId);
        const issueId = Number(req.params.issueId);
        const foundIssue = await this._issueManager.findIssue(projectId, issueId);

        return res.status(200).json({
            data: {
                issue: foundIssue
            }
        })
    }

    @httpPatch("/:projectId/issues/:issueId") 
    public async updateIssue(req: AuthenticatedRequest, res: Response) {
        const updateInfo = IssueUpdateSchema.parse(req.body);
        const projectId = Number(req.params.projectId);
        const issueId = Number(req.params.issueId);

        const updatedIssue = await this._issueManager.updateIssueField({projectId, issueId, updateInfo});

        return res.status(200).json({
            data: {
                issue: updatedIssue
            }
        })
    }

    @httpGet("/:projectId/issues")
    public async getIssues(req: AuthenticatedRequest, res: Response) {
        const idParam = Number(req.params.projectId);
        const queryParams = req.query;
        const filters = Object.entries(queryParams).map(entry => {
            return {key: String(entry[0]), value: String(entry[1])}
        })
        console.log(filters);

        const projectId = IdSchema.parse(idParam)
        const issues = await this._issueManager.findIssuesByProject(projectId, filters);

        return res.status(200).json({
            data: {
                issues
            }
        })
    }

}

export default ProjectController;