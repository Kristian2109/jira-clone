import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, Unique, ManyToMany, ManyToOne } from "typeorm";
import UserAccount from "./userAccount";
import BaseEntity from "./baseEntity";

@Entity()
export default class InternalUserLogin extends BaseEntity {
    @OneToOne(() => UserAccount)
    @JoinColumn()
    user!: UserAccount;

    @Column({type: "varchar", length: 512})
    passwordHash!: string;
}