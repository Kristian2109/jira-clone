import {  Column, Unique, Entity, ManyToOne, JoinColumn, GeoJSON, OneToMany } from "typeorm"
import BaseEntity from "../baseEntity"
import UserAccount from "../account/userAccount";
import Project from "./project";
import BoardColumn from "./boardColumn";
import BaseEntityWithDetails from "../baseEntityWithDetails";

@Entity()
export default class Board extends BaseEntityWithDetails {
    @OneToMany(() => BoardColumn, boardColumn => boardColumn.board, {cascade: true && ["insert", "update", "remove", "soft-remove", "recover"]})
    boardColumns!: BoardColumn[];
}