import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import BaseEntity from "./baseEntity"
import NameAndDescription from "./nameAndDescription";
import ProjectView from "./projectView";

@Entity()
export default class BoardColumn extends BaseEntity {
    @Column(() => NameAndDescription)
    details!: NameAndDescription

    @ManyToOne(() => ProjectView)
    @JoinColumn()
    board!: ProjectView

    @Column("int")
    orderNumber!: number

    constructor(name?: string, description?: string, order?: number) {
        super()
        this.details = {
            name: name || "",
            description: description || ""
        }
        this.orderNumber = order || 0;
    }
}