import { IntegerType, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/datasource";
import InternalUserLogin from "../entities/account/internalUserLogin";
import { injectable } from "inversify";
import { Login, RegisterUserSchemaWIthPass } from "../types/account";
import UserManager from "./userManager";
import { signToken } from "../utils/jwt";
import GenericException from "../exceptions/genericException";
import UserAccount from "../entities/account/userAccount";
import BadRequestError from "../exceptions/badRequestError";

@injectable()
export default class InternalAuthManager {
  protected userRepository: Repository<UserAccount>;
  protected internalLoginRepository: Repository<InternalUserLogin>;
  protected userManager: UserManager;

  constructor(userManager: UserManager) {
    this.userRepository = AppDataSource.getRepository(UserAccount);
    this.internalLoginRepository =
      AppDataSource.getRepository(InternalUserLogin);
    this.userManager = userManager;
  }

  public async register(
    registerInfo: RegisterUserSchemaWIthPass
  ): Promise<{ token: string; userId: IntegerType }> {
    const email = registerInfo.email;
    const userWithEmail = await this.userRepository.findOneBy({
      email,
    });

    if (userWithEmail) {
      throw new GenericException("Duplicate Email!", 401);
    }

    const createdUser = await this.userManager.createUser(registerInfo);
    await this.saveInternalLoginData(registerInfo.password, createdUser);
    return {
      token: signToken({ userId: createdUser.id, role: createdUser.role }),
      userId: createdUser.id,
    };
  }

  public async login(
    loginForm: Login
  ): Promise<{ token: string; userId: IntegerType }> {
    const userToLogin = await this.userRepository.findOneBy({
      email: loginForm.email,
    });
    if (!userToLogin) {
      throw new BadRequestError({
        message: "Invalid email or password",
        statusCode: 400,
      });
    }
    const loginData = await this.internalLoginRepository
      .createQueryBuilder(
        `select * from internal_user_login where userId = ${userToLogin.id}`
      )
      .getOne();
    if (!loginData) {
      throw new BadRequestError({
        message: "Invalid email or password",
        statusCode: 400,
      });
    }
    const isPasswordValid = bcrypt.compareSync(
      loginForm.password,
      loginData.passwordHash
    );
    if (!isPasswordValid) {
      throw new BadRequestError({
        message: "Invalid email or password",
        statusCode: 400,
      });
    }
    return {
      token: signToken({ userId: userToLogin.id, role: userToLogin.role }),
      userId: userToLogin.id,
    };
  }

  private async saveInternalLoginData(
    password: string,
    user: UserAccount
  ): Promise<void> {
    const passwordHash = bcrypt.hashSync(password, 10);
    const userLoginData = new InternalUserLogin(user, passwordHash);
    this.internalLoginRepository.save(userLoginData);
  }
}
