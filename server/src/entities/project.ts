import {  Column, Unique, Entity, OneToMany, AfterLoad, AfterRecover } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import ProjectMember from "./projectMember";
import { Exclude, classToPlain, classToPlainFromExist, instanceToPlain } from "class-transformer";

@Entity()
@Unique("unique_key", ["key"])
export default class Project extends BaseEntity {
    @Column()
    key?: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

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