import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import reflectMetadata from 'reflect-metadata'
import BaseEntity from "./baseEntity"
import UserAddress from "./address";

@Entity()
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
    position!: string;

    @OneToOne(() => UserAddress)
    @JoinColumn()
    address!: UserAddress
}