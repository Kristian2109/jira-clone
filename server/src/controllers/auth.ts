import { Request, Response } from "express";
import InternalAuthManager from "../services/internalAuthManager";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import {
  LoginSchema,
  UserAccountSchema,
  UserAccountSchemaWithPass,
} from "../types/account";
import ExternalAuthManager from "../services/externalAuthManager";

@controller("/auth")
class AuthController {
  private _authManager: InternalAuthManager;
  private _oAuthManager: ExternalAuthManager;

  constructor(
    authManager: InternalAuthManager,
    oAuthManager: ExternalAuthManager
  ) {
    this._authManager = authManager;
    this._oAuthManager = oAuthManager;
  }

  @httpPost("/register")
  public async register(req: Request, res: Response) {
    const registerData = UserAccountSchemaWithPass.parse(req.body);
    const tokenAndId = await this._authManager.register(registerData);
    return res.status(200).json({
      data: {
        jsonWebToken: tokenAndId.token,
        userId: tokenAndId.userId,
      },
    });
  }

  @httpGet("/external")
  public async registerGoogle(req: Request, res: Response) {
    const authUrl = this._oAuthManager.generateRedirectUrl();
    return res.status(200).json({ data: { authUrl } });
  }

  @httpGet("/google/callback")
  public async googleCallback(req: Request, res: Response) {
    const authCode = String(req.query.code);
    const token = await this._oAuthManager.authenticate(authCode);
    return res.status(200).json({ data: { token } });
  }

  @httpPost("/login")
  public async loginInternal(req: Request, res: Response) {
    const loginForm = LoginSchema.parse(req.body);
    const jwtToken = await this._authManager.login(loginForm);
    return res.status(200).json({
      data: { jsonWebToken: jwtToken.token, userId: jwtToken.userId },
    });
  }
}

export default AuthController;
