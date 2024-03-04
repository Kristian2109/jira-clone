import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from "typeorm"
import BaseEntity from "./baseEntity"
import UserAddress from "./address";

@Entity()
@Unique("unique_email", ["email"])
export default class UserAccount extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({default: "None"})
    organization?: string;

    @Column({default: "1970-01-01"})
    dateOfBirth?: Date;

    @Column({default: "None"})
    displayName?: string;

    @Column({default: "None"})
    position?: string;

    @OneToOne(() => UserAddress, {cascade: true, nullable: true})
    @JoinColumn()
    address?: UserAddress
}