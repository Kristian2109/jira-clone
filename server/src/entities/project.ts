import {  Column, Unique, Entity, OneToMany, AfterLoad, AfterRecover, OneToOne, JoinColumn } from "typeorm"
import ProjectMember from "./projectMember";
import { Exclude, instanceToPlain } from "class-transformer";
import BaseEntityWithDetails from "./baseEntityWithDetails";
import Board from "./board";

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

    @JoinColumn()
    @OneToOne(() => Board, {cascade: true}) 
    board!: Board

    toJSON() {
        return instanceToPlain(this);
    }
}