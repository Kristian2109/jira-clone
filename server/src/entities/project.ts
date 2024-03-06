import {  Column, Unique, Entity, OneToMany, AfterLoad, AfterRecover } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import ProjectMember from "./projectMember";
import { Exclude, classToPlain, classToPlainFromExist, instanceToPlain } from "class-transformer";
import ProjectView from "./projectView";
import BaseEntityWithDetails from "./baseEntityWithDetails";

@Entity()
@Unique("unique_key", ["key"])
export default class Project extends BaseEntityWithDetails {
    @Column()
    key?: string;

    @Exclude()
    @OneToMany(() => ProjectMember, projectMember => projectMember.project, {cascade: true})
    members!: ProjectMember[];

    @AfterLoad()
    async nullChecks() {
      if (!this.members) {
        this.members = [];
      } 
    }

    toJSON() {
        return instanceToPlain(this);
    }
}