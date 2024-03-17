import { Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import UserManager from "../services/userManager";
import { AuthenticatedRequest } from "../types/auth";

@controller("/accounts")
class AccountController {
  protected _userManager: UserManager;

  constructor(userManager: UserManager) {
    this._userManager = userManager;
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
}

export default AccountController;
