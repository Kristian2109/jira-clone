import { injectable } from "inversify";
import { IntegerType, Repository } from "typeorm";
import UserAccount from "../entities/userAccount";
import { AppDataSource } from "../config/datasource";
import { RegisterUser } from "../types/auth";
import UserMapper from "../mappers/userMapper";
import { RegisterUserSchema } from "../types/account";

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

    public async getUserByIdWithException(id: number): Promise<UserAccount> {
        const foundUser = await this._userRepository.findOneBy({id});
        if (!foundUser) {
            throw new Error("User not found!");
        }
        return foundUser;
    }

    public async getUserProjects(userId: number) {
        const memberships = await (await this.getUserByIdWithException(userId)).memberships;
        return memberships.map(membership => membership.project);
    }
}

export default UserManager;