import dotenv from "dotenv";
import { injectable } from "inversify";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/datasource";
import ExternalUserLogin from "../entities/account/externalUserLogin";
import { IntegerType, Repository } from "typeorm";
import UserManager from "./userManager";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { signToken } from "../utils/jwt";
import ExternalAuthRepository from "../repositories/externalAuthRepository";

dotenv.config();

@injectable()
class ExternalAuthManager {
  private _oauth2Client: OAuth2Client;
  private _externalUserLogin: Repository<ExternalUserLogin>;
  private _userManager: UserManager;
  private _externalAuthRepo: ExternalAuthRepository;

  constructor(
    userManager: UserManager,
    externalAuthRepo: ExternalAuthRepository
  ) {
    this._oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    this._externalUserLogin = AppDataSource.getRepository(ExternalUserLogin);
    this._userManager = userManager;
    this._externalAuthRepo = externalAuthRepo;
  }

  public generateRedirectUrl() {
    const scopes = ["email", "profile", "openid"];

    return this._oauth2Client.generateAuthUrl({
      scope: scopes,
    });
  }

  public async authenticate(authCode: string) {
    const response = await this._oauth2Client.getToken(authCode);
    const extractedData = await this.extractDataFromResponse(response);

    let externalUserLogin = await this._externalAuthRepo.findByIdWithUser(
      extractedData.externalId
    );
    let userAccount;
    if (!externalUserLogin) {
      const userWithSameEmail =
        await this._userManager.getUserByEmailWithoutException(
          extractedData.email
        );
      if (userWithSameEmail) {
        throw new Error("The user with this email is already authenticated!");
      }

      userAccount = await this._userManager.createUser({
        email: extractedData.email,
        name: extractedData.name,
        displayName: extractedData.name,
      });
      externalUserLogin = new ExternalUserLogin();
      externalUserLogin.user = userAccount;
      externalUserLogin.externalId = extractedData.externalId;
    } else {
      userAccount = externalUserLogin.user;
    }
    externalUserLogin.expiryDate = new Date(extractedData.expiryDate);
    externalUserLogin.token = extractedData.accessToken;
    await this._externalUserLogin.save(externalUserLogin);

    const token = signToken({
      userId: externalUserLogin.user.id,
      role: userAccount.role,
    });
    return token;
  }

  private async extractDataFromResponse(response: GetTokenResponse) {
    const {
      access_token: accessToken,
      expiry_date: expiryDate,
      id_token: idToken,
    } = response.tokens;
    if (!idToken) {
      throw new Error("No id token");
    }
    const payload = jwt.decode(idToken);
    if (!payload) {
      throw new Error("Error decoding!");
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
      expiryDate,
    };
  }
}

export default ExternalAuthManager;
