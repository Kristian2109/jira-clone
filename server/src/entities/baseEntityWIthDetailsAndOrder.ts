import {Column, Entity } from "typeorm";
import BaseEntityWithDetails from "./baseEntityWithDetails";
import { OrderNumber } from "../types/project";

@Entity()
export default class BaseEntityWithDetailsAndOrder extends BaseEntityWithDetails {
    @Column()
    orderNumber!: OrderNumber;
}