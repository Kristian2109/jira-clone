import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import Board from "./board";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import { OrderNumber } from "../../types/project";

@Entity()
export default class BoardColumn extends BaseEntityWithDetails {
    @ManyToOne(() => Board)
    @JoinColumn()
    board!: Board

    @Column("int")
    orderNumber!: OrderNumber;

    constructor(name?: string, description?: string, order?: OrderNumber) {
        super()
        this.name = name || "";
        this.description = description || "";
        this.orderNumber = order || 0;
    }
}