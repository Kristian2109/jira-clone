import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import UserAccount from "./userAccount";

@Entity()
@Unique("unique_key", ["key"])
export default class Project extends BaseEntity {
    @Column()
    key!: string;

    @Column(() => NameAndDescription)
    project!: NameAndDescription

    @ManyToOne(() => UserAccount)
    @JoinColumn()
    owner!: UserAccount
}