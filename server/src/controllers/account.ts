import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import UserManager from "../services/userManager";
import JwtResolver from "../middleware/jwtResolver";
import { AuthenticatedRequest } from "../types/auth";

@controller("/accounts", JwtResolver.resolve)
class AccountController {
    protected _userManager: UserManager;

    constructor(userManager: UserManager) {
        this._userManager = userManager;
    }

    @httpGet("/me")
    public getUserAccount() {
        
    }

}

export default AccountController;