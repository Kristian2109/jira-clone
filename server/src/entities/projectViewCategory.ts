import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import UserAccount from "./userAccount";

@Entity()
export default class ProjectViewCategory extends BaseEntity {
    @Column(() => NameAndDescription)
    category!: NameAndDescription
}