import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import IssueType from "./issueType";
import { OrderNumber } from "../../types/project";

@Entity()
export default class IssueField extends BaseEntityWithDetails {
    @ManyToOne(() => IssueType)
    issueType!: IssueType;

    @Column() 
    orderNumber!: OrderNumber;
}