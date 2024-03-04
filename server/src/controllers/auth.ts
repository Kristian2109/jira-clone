import { Request, Response } from "express";
import InternalAuthManager from "../services/internalAuthManager";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { LoginSchema, UserAccountSchema, UserAccountSchemaWithPass } from "../types/zodTypes";
import ExternalAuthManager from "../services/externalAuthManager";

@controller("/auth")
class AuthController {
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
            const tokenAndId = await this._authManager.register(registerData)
            return res.status(200).json({
                data: tokenAndId,
                message: "success"
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpGet("/external")
    public async registerGoogle(req: Request, res: Response) {
        try {
            const authUrl = this._oAuthManager.generateRedirectUrl()
            return res.status(200).json(authUrl);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpGet("/google/callback")
    public async googleCallback(req: Request, res: Response) {
        try {
            const authCode = String(req.query.code);
            return await this._oAuthManager.authenticate(authCode);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    @httpPost("/login")
    public async loginInternal(req: Request, res: Response) {
        try {
            const loginForm = LoginSchema.parse(req.body);
            const jwtToken = await this._authManager.login(loginForm);;
            return res.status(200).json({
                data: jwtToken,
                message: "success"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

}

export default AuthController;