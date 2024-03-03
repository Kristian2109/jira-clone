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

    @Column()
    organization!: string;

    @Column()
    dateOfBirth!: Date;

    @Column()
    displayName?: string;

    @Column()
    position!: string;

    @OneToOne(() => UserAddress, {cascade: true})
    @JoinColumn()
    address!: UserAddress
}