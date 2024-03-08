import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import UserAccount from "./userAccount";
import Project from "./project";
import { Exclude, classToPlain, instanceToPlain } from "class-transformer";
import { MemberRole, MemberStatus } from "../types/account";

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
    status!: MemberStatus;

    @Column()
    role!: MemberRole;

    toJSON() {
        return instanceToPlain(this);
    }

    constructor(project: Project, user: UserAccount, status: MemberStatus, role: MemberRole) {
        super();
        this.project = project;
        this.user = user;
        this.status = status;
        this.role = role;
    }
}