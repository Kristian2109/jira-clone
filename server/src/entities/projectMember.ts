import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import UserAccount from "./userAccount";
import Project from "./project";

@Entity()
export default class ProjectMember extends BaseEntity {
    @ManyToOne(() => Project)
    @JoinColumn()
    project!: Project

    @ManyToOne(() => UserAccount)
    @JoinColumn()
    user!: UserAccount;

    @Column()
    status!: "Accepted" | "Rejected" | "Pending"

    @Column()
    role!: "Owner" | "Worker"
}