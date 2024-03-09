import { Entity, ManyToOne, OneToMany } from "typeorm";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import Project from "../project/project";
import IssueField from "./issueField";

@Entity()
export default class IssueType extends BaseEntityWithDetails {
    @ManyToOne(() => Project) 
    project!: Project;

    @OneToMany(() => IssueField, issueField => issueField.issueType, {cascade: true})
    issueFields!: IssueField[];
};