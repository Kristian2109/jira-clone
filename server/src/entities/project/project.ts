import {  Column, Unique, Entity, OneToMany, AfterLoad, AfterRecover, OneToOne, JoinColumn } from "typeorm"
import ProjectMember from "./projectMember";
import { Exclude, instanceToPlain } from "class-transformer";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import Board from "./board";
import IssueType from "../issue/issueType";

@Entity()
@Unique("unique_key", ["key"])
export default class Project extends BaseEntityWithDetails {
    @Column()
    key?: string;

    @OneToMany(() => ProjectMember, projectMember => projectMember.project, {cascade: true})
    members!: ProjectMember[];

    @JoinColumn()
    @OneToOne(() => Board, {cascade: ["insert", "update"]}) 
    board!: Board

    @OneToMany(() => IssueType, issueType => issueType.project)
    issueTypes!: IssueType[];

    toJSON() {
        return instanceToPlain(this);
    }
}