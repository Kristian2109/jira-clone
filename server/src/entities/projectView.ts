import {  Column, Unique, Entity, ManyToOne, JoinColumn, GeoJSON, OneToMany } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import UserAccount from "./userAccount";
import Project from "./project";
import ProjectViewCategory from "./projectViewCategory";
import BoardColumn from "./boardColumn";
@Entity()
export default class ProjectView extends BaseEntity {
    @Column(() => NameAndDescription)
    details!: NameAndDescription

    @ManyToOne(() => Project)
    @JoinColumn()
    project!: Project;

    @ManyToOne(() => ProjectViewCategory)
    @JoinColumn()
    viewCategory!: ProjectViewCategory;

    @OneToMany(() => BoardColumn, boardColumn => boardColumn.board, {cascade: true && ["insert", "update", "remove", "soft-remove", "recover"]})
    boardColumns!: BoardColumn[];
}