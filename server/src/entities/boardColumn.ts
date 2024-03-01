import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import UserAccount from "./userAccount";
import Project from "./project";
import ProjectViewCategory from "./projectViewCategory";
import ProjectView from "./projectView";

@Entity()
export default class BoardColumn extends BaseEntity {
    @Column(() => NameAndDescription)
    column!: NameAndDescription

    @ManyToOne(() => ProjectView)
    @JoinColumn()
    project!: ProjectView

    @Column("int")
    orderNumber!: number
}