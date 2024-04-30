import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { AuthenticatedRequest, UserRole, UserRoleSchema } from "../types/auth";
import { Id, IdSchema } from "../types/genericTypes";
import BadRequestError from "../exceptions/badRequestError";

dotenv.config();

class JwtResolver {
  public static async resolve(req: AuthenticatedRequest) {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return;
    }

    const [tokenType, token] = authHeader.split(" ");
    if (tokenType !== "Bearer") {
      return;
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
      if (typeof payload === "string") {
        throw new Error();
      }
    } catch (error) {
      throw new BadRequestError({
        message: "Cannot verify token",
        statusCode: 401,
      });
    }

    let userId: Id;
    let role: UserRole;
    try {
      userId = IdSchema.parse(payload.userId);
      role = UserRoleSchema.parse(payload.role);
    } catch (error) {
      throw new BadRequestError({
        message: "Cannot parse token payload",
        statusCode: 401,
      });
    }

    req.user = {
      id: userId,
      role,
    };
  }
}

export default JwtResolver;
