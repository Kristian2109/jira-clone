import dotenv from "dotenv"
import { injectable } from "inversify";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken"
import UserAccount from "../entities/account/userAccount";
import { AppDataSource } from "../config/datasource";
import ExternalUserLogin from "../entities/account/externalUserLogin";
import { IntegerType, Repository } from "typeorm";
import UserManager from "./userManager";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { signToken } from "../utils/jwt";

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

    public async authenticate(authCode: string): Promise<{token: string, userId: IntegerType}> {
        const response = await this._oauth2Client.getToken(authCode);
        const extractedData  = await this.extractDataFromResponse(response)

        let externalUserLogin = await this._externalUserLogin.findOneBy({externalId: extractedData.externalId})
        if (!externalUserLogin) {
            const userWithSameEmail = await this._userManager.getUserByEmail(extractedData.email);
            if (userWithSameEmail) {
                throw new Error("The user with this email is already authenticated!")
            }

            const userAccount = await this._userManager.createUser({
                email: extractedData.email,
                name: extractedData.name,
                displayName: extractedData.name
            })
            externalUserLogin = new ExternalUserLogin();
            externalUserLogin.user = userAccount;
            externalUserLogin.externalId = extractedData.externalId;
        }
        externalUserLogin.expiryDate = new Date(extractedData.expiryDate);
        externalUserLogin.token = extractedData.accessToken;
        this._externalUserLogin.save(externalUserLogin);

        const token = signToken({userId: externalUserLogin.user.id});
        return {
            token,
            userId: externalUserLogin.user.id
        };
    }

    private async extractDataFromResponse(response: GetTokenResponse) {
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

        if (!expiryDate || !accessToken || !payload.sub || !payload.email) {
            throw new Error("Error loading the expiry date and access token!");
        }

        return {
            email: payload.email,
            name: payload.name,
            externalId: payload.sub,
            accessToken,
            expiryDate
        }
    }
}


export default ExternalAuthManager;