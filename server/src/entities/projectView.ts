import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import UserAccount from "./userAccount";
import Project from "./project";
import ProjectViewCategory from "./projectViewCategory";

@Entity()
export default class ProjectView extends BaseEntity {
    @Column(() => NameAndDescription)
    view!: NameAndDescription

    @ManyToOne(() => Project)
    @JoinColumn()
    project!: Project

    @ManyToOne(() => ProjectViewCategory)
    @JoinColumn()
    viewCategory!: ProjectViewCategory
}