import { Request, Response } from "express";
import AuthManager from "../services/authManager";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserAccountSchema } from "../types/zodTypes";
import OAuthManager from "../services/oAuthManager";

@controller("/users")
class UserController {
    private _authManager: AuthManager;
    private _oAuthManager: OAuthManager;

    constructor(authManager: AuthManager, oAuthManager: OAuthManager) {
        this._authManager = authManager;
        this._oAuthManager = oAuthManager;
    }
    
    @httpPost("/register")
    public async register(req: Request, res: Response) {
        try {
            const registerData = UserAccountSchema.parse(req.body);
            return res.status(200).json(await this._authManager.register(registerData));
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpPost("/register/google")
    public async registerGoogle(req: Request, res: Response) {
        try {
            const authUrl = this._oAuthManager.generateRedirectUrl()
            return res.status(200).json(authUrl);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpGet("/auth/google/callback")
    public async googleCallback(req: Request, res: Response) {
        try {
            const authCode = String(req.query.code);
            return await this._oAuthManager.getToken(authCode);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

export default UserController;