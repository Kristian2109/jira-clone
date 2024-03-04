import { Request, Response } from "express";
import InternalAuthManager from "../services/internalAuthManager";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { LoginSchema, UserAccountSchema, UserAccountSchemaWithPass } from "../types/zodTypes";
import ExternalAuthManager from "../services/externalAuthManager";

@controller("/users")
class UserController {
    private _authManager: InternalAuthManager;
    private _oAuthManager: ExternalAuthManager;

    constructor(authManager: InternalAuthManager, oAuthManager: ExternalAuthManager) {
        this._authManager = authManager;
        this._oAuthManager = oAuthManager;
    }
    
    @httpPost("/register")
    public async register(req: Request, res: Response) {
        try {
            const registerData = UserAccountSchemaWithPass.parse(req.body);
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
            return await this._oAuthManager.authenticate(authCode);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpPost("/auth/login")
    public async loginInternal(req: Request, res: Response) {
        try {
            const loginForm = LoginSchema.parse(req.body);
            return await this._authManager.login(loginForm);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

export default UserController;