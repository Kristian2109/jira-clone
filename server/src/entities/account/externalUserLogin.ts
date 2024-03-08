import {  PrimaryColumn, Entity, OneToOne, JoinColumn, ManyToOne, Column } from "typeorm"
import BaseEntity from "../baseEntity"
import UserAccount from "./userAccount";
import ExternalProvider from "./externalProvider";

@Entity()
export default class ExternalUserLogin extends BaseEntity {
    @OneToOne(() => UserAccount, {eager: true})
    @JoinColumn()
    user!: UserAccount;

    // @ManyToOne(() => ExternalProvider)
    // @JoinColumn()
    // provider!: ExternalProvider;

    @Column({type: "varchar", length: 256})
    token!: string;

    @Column()
    expiryDate!: Date;

    @Column()
    externalId!: string;
}