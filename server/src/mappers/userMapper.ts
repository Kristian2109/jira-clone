import UserAccount from "../entities/account/userAccount";
import { FullUserDetails, RegisterUser } from "../types/auth";
import { RegisterUserSchema } from "../types/account";
import AddressMapper from "./addressMapper";

export default class UserMapper {
    public static toUser(userToRegister: RegisterUserSchema): UserAccount {
        let userToCreate = new UserAccount();

        userToCreate.name = userToRegister.name;
        userToCreate.dateOfBirth = (userToRegister.dateOfBirth) ? new Date(userToRegister.dateOfBirth) : undefined;
        userToCreate.organization = userToRegister.organization;
        userToCreate.position = userToRegister.position;
        userToCreate.email = userToRegister.email;
        userToCreate.address = userToRegister.address && AddressMapper.toAddress(userToRegister.address);
        userToCreate.displayName = userToRegister.displayName;
        
        return userToCreate;
    }

    public static toFullUserDetails(user: UserAccount): FullUserDetails {
        return {
            id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            organization: user.organization,
            position: user.position,
            displayName: user.displayName,
            address: user.address,
            role: user.role
        }
    }
}