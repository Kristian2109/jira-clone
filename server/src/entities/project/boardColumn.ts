import { Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import Board from "./board";
import { OrderNumber } from "../../types/project";
import BaseEntityWithDetailsAndOrder from "../baseEntityWIthDetailsAndOrder";
import Issue from "../issue/issue";

@Entity()
export default class BoardColumn extends BaseEntityWithDetailsAndOrder {
    @ManyToOne(() => Board)
    board!: Board;

    @JoinColumn()
    @OneToMany(() => Issue, issue => issue.boardColumn)
    issues!: Issue[];

    constructor(name?: string, description?: string, order?: OrderNumber) {
        super()
        this.name = name || "";
        this.description = description || "";
        this.orderNumber = order || 0;
    }
}