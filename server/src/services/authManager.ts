import { IntegerType, Repository } from "typeorm";
import bcrypt from "bcrypt"
import { FullUserDetails, RegisterUser } from "../types/auth";
import { AppDataSource } from "../config/datasource";
import UserAccount from "../entities/userAccount";
import DuplicateResourceException from "../exceptions/duplicateResourceException";
import UserMapper from "../mappers/userMapper";
import InternalUserLogin from "../entities/internalUserLogin";
import { injectable } from "inversify";
import { RegisterUserSchema } from "../types/zodTypes";

@injectable()
export default class AuthManager {
    protected userRepository: Repository<UserAccount>;
    protected internalLoginRepository: Repository<InternalUserLogin>; 

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserAccount);
        this.internalLoginRepository = AppDataSource.getRepository(InternalUserLogin);
    }

    public async register (registerInfo: RegisterUserSchema): Promise<FullUserDetails> {

        const email = registerInfo.email;
        const userWithEmail = await this.userRepository.findOneBy({
            email
        })

        if (userWithEmail) {
            throw new DuplicateResourceException("Duplicate Email!");
        }

        const userToCreate = UserMapper.toUser(registerInfo);
        console.log(userToCreate)
        const User = await this.userRepository.save(userToCreate);
        console.log(User)
        await this.saveInternalLoginData(registerInfo.password, userToCreate);
        return UserMapper.toFullUserDetails(User);
    }

    private async saveInternalLoginData(password: string,  user: UserAccount): Promise<void> {
        const passwordHash = bcrypt.hashSync(password, 10);
        const userLoginData = new InternalUserLogin(user, passwordHash);
        this.internalLoginRepository.save(userLoginData);
    }
}