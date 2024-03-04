import { IntegerType, Repository } from "typeorm";
import bcrypt from "bcrypt"
import { FullUserDetails, RegisterUser } from "../types/auth";
import { AppDataSource } from "../config/datasource";
import UserAccount from "../entities/userAccount";
import DuplicateResourceException from "../exceptions/duplicateResourceException";
import UserMapper from "../mappers/userMapper";
import InternalUserLogin from "../entities/internalUserLogin";
import { injectable } from "inversify";
import { RegisterUserSchema, RegisterUserSchemaWIthPass } from "../types/zodTypes";
import UserManager from "./userManager";

@injectable()
export default class InternalAuthManager {
    protected userRepository: Repository<UserAccount>;
    protected internalLoginRepository: Repository<InternalUserLogin>; 
    protected userManager: UserManager;

    constructor(userManager: UserManager) {
        this.userRepository = AppDataSource.getRepository(UserAccount);
        this.internalLoginRepository = AppDataSource.getRepository(InternalUserLogin);
        this.userManager = userManager;
    }

    public async register (registerInfo: RegisterUserSchemaWIthPass): Promise<FullUserDetails> {

        const email = registerInfo.email;
        const userWithEmail = await this.userRepository.findOneBy({
            email
        })

        if (userWithEmail) {
            throw new DuplicateResourceException("Duplicate Email!");
        }

        const createdUser = await this.userManager.createUser(registerInfo);
        await this.saveInternalLoginData(registerInfo.password, createdUser);
        return UserMapper.toFullUserDetails(createdUser);
    }

    private async saveInternalLoginData(password: string,  user: UserAccount): Promise<void> {
        const passwordHash = bcrypt.hashSync(password, 10);
        const userLoginData = new InternalUserLogin(user, passwordHash);
        this.internalLoginRepository.save(userLoginData);
    }
}