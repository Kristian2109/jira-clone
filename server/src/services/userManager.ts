import { injectable } from "inversify";
import { Repository } from "typeorm";
import UserAccount from "../entities/userAccount";
import { AppDataSource } from "../config/datasource";
import { RegisterUser } from "../types/auth";
import UserMapper from "../mappers/userMapper";
import { RegisterUserSchema } from "../types/zodTypes";

@injectable()
class UserManager{
    protected _userRepository: Repository<UserAccount>;

    constructor() {
        this._userRepository = AppDataSource.getRepository(UserAccount);
    }

    public async createUser(registerInfo: RegisterUserSchema): Promise<UserAccount> {
        const userToCreate = UserMapper.toUser(registerInfo);
        return this._userRepository.save(userToCreate);
    } 

    public async getUserByEmail(email: string) {
        return this._userRepository.findOneBy({email});
    }
}

export default UserManager;