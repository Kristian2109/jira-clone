import { Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import UserManager from "../services/userManager";
import { AuthenticatedRequest } from "../types/auth";
import IssueManager from "../services/issueManager";

@controller("/accounts")
class AccountController {
  protected _userManager: UserManager;
  protected _issueManager: IssueManager;

  constructor(userManager: UserManager, issueManager: IssueManager) {
    this._userManager = userManager;
    this._issueManager = issueManager;
  }

  @httpGet("/me")
  public async getUserAccount(req: AuthenticatedRequest, res: Response) {
    const foundUser = await this._userManager.getUserByIdWithException(
      req.user.id
    );
    return res.status(200).json({
      data: { user: foundUser },
    });
  }

  @httpGet("/me/issues")
  public async getUserIssues(req: AuthenticatedRequest, res: Response) {
    const queryParams = req.query;
    const pagination = {
      begin: Number(queryParams.begin),
      end: Number(queryParams.end),
    };

    let result;

    if (
      pagination.begin &&
      pagination.end &&
      pagination.begin < pagination.end
    ) {
      result = await this._issueManager.findIssuesByUser(
        req.user.id,
        pagination
      );
    } else {
      result = await this._issueManager.findIssuesByUser(req.user.id);
    }

    return res.status(200).json({
      data: { issues: result },
    });
  }
}

export default AccountController;
