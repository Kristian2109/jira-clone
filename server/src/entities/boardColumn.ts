import {  Column, Unique, Entity, ManyToOne, JoinColumn } from "typeorm"
import Board from "./board";
import BaseEntityWithDetails from "./baseEntityWithDetails";

@Entity()
export default class BoardColumn extends BaseEntityWithDetails {
    @ManyToOne(() => Board)
    @JoinColumn()
    board!: Board

    @Column("int")
    orderNumber!: number

    constructor(name?: string, description?: string, order?: number) {
        super()
        this.name = name || "";
        this.description = description || "";
        this.orderNumber = order || 0;
    }
}