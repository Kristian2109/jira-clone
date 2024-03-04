import dotenv from "dotenv"
import { injectable } from "inversify";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken"
import UserAccount from "../entities/userAccount";
import { AppDataSource } from "../config/datasource";
import ExternalUserLogin from "../entities/externalUserLogin";
import { Repository } from "typeorm";
import UserManager from "./userManager";

dotenv.config()

@injectable()
class ExternalAuthManager {
    private _oauth2Client: OAuth2Client;
    private _externalUserLogin: Repository<ExternalUserLogin>;
    private _userManager: UserManager;

    constructor(userManager: UserManager) {
         this._oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        )

        this._externalUserLogin = AppDataSource.getRepository(ExternalUserLogin);
        this._userManager = userManager;
    }

    public generateRedirectUrl() {
        const scopes = [
            "email",
            "profile",
            "openid"
        ]

        return this._oauth2Client.generateAuthUrl({
            scope: scopes
        })
    }

    public async saveProfileAndAuth(authCode: string) {
        const response = await this._oauth2Client.getToken(authCode);
        const { access_token: accessToken, expiry_date: expiryDate, id_token: idToken } = response.tokens;
        if (!idToken) {
            throw new Error("No id token");
        }
        const payload = jwt.decode(idToken);
        if (!payload) {
            throw new Error("Error decoding!")
        }
        if (typeof payload === "string") {
            throw new Error("Invalid type!");
        }

        if (!expiryDate || !accessToken || !payload.sub) {
            throw new Error("Error loading the expiry date and access token!");
        }

        let externalUserLogin = await this._externalUserLogin.findOneBy({externalId: payload.sub})
        if (!externalUserLogin) {
            const userAccount = await this._userManager.createUser({
                email: payload.email,
                name: payload.name,
                displayName: payload.name
            })
            externalUserLogin = new ExternalUserLogin();
            externalUserLogin.user = userAccount;
            externalUserLogin.externalId = payload.sub;
        }
        externalUserLogin.expiryDate = new Date(expiryDate);
        externalUserLogin.token = accessToken;
        this._externalUserLogin.save(externalUserLogin);

        return accessToken;
    }
}


export default ExternalAuthManager;