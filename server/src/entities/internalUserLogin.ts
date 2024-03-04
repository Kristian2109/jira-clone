import { Entity, Column, JoinColumn, OneToOne} from "typeorm";
import UserAccount from "./userAccount";
import BaseEntity from "./baseEntity";

@Entity()
export default class InternalUserLogin extends BaseEntity {
    @OneToOne(() => UserAccount, {eager: true})
    @JoinColumn()
    user!: UserAccount;

    @Column({type: "varchar", length: 512})
    passwordHash!: string;

    constructor(user: UserAccount, passwordHash: string) {
        super();
        this.user = user;
        this.passwordHash = passwordHash;
    }
}