import dotenv from "dotenv"
import { injectable } from "inversify";
import { OAuth2Client } from "google-auth-library";

dotenv.config()

@injectable()
class OAuthManager {
    private _oauth2Client: OAuth2Client;

    constructor() {
         this._oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        )
    }

    public generateRedirectUrl() {
        const scopes = [
            "https://www.googleapis.com/auth/userinfo.profile"
        ]

        return this._oauth2Client.generateAuthUrl({
            scope: scopes
        })
    }

    public async getToken(authCode: string) {
        return this._oauth2Client.getToken(authCode)
    }

    // public async saveProfileAndAuth(authCode: string) {
    //     const response = await this._oauth2Client.getToken(authCode);
    //     const { access_token: accessToken, expiry_date: expiryDate, id_token: idToken } = response.tokens;
    //     if (!idToken) {
    //         throw new Error("No id token");
    //     }
    //     const payload = jwt.decode(idToken);
    //     if (!payload) {
    //         throw new Error("Error decoding!")
    //     }
    //     const decodedPayload = await JSON.parse(String(payload))
    //     console.log(decodedPayload);
    // }
}


export default OAuthManager;