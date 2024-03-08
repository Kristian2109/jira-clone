import { Entity, ManyToOne } from "typeorm";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import Project from "../project/project";

@Entity()
export default class IssueType extends BaseEntityWithDetails {
    @ManyToOne(() => Project) 
    project!: Project;
};