import {  Column, Unique, Entity, ManyToOne, JoinColumn, GeoJSON, OneToMany } from "typeorm"
import BoardColumn from "./boardColumn";
import BaseEntityWithDetails from "../baseEntityWithDetails";

@Entity()
export default class Board extends BaseEntityWithDetails {
    @JoinColumn()
    @OneToMany(() => BoardColumn, boardColumn => boardColumn.board, {cascade: true && ["insert", "update", "remove", "soft-remove", "recover"]})
    boardColumns!: BoardColumn[];
}