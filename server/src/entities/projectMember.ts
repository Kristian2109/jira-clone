import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import UserAccount from "./userAccount";
import Project from "./project";
import { Exclude, classToPlain, instanceToPlain } from "class-transformer";

@Entity()
export default class ProjectMember extends BaseEntity {
    @ManyToOne(() => Project)
    @JoinColumn()
    @Exclude()
    project!: Project;

    @ManyToOne(() => UserAccount)
    @JoinColumn()
    user!: UserAccount;

    @Column()
    status!: "Accepted" | "Rejected" | "Pending"

    @Column()
    role!: "Owner" | "Worker"

    toJSON() {
        return instanceToPlain(this);
    }
}