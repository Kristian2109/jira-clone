import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntityWithDetails from "../baseEntityWithDetails";
import IssueType from "./issueType";
import { OrderNumber } from "../../types/project";
import BaseEntityWithDetailsAndOrder from "../baseEntityWIthDetailsAndOrder";
import { IssueFieldDataType } from "../../types/issue";

@Entity()
export default class IssueField extends BaseEntityWithDetailsAndOrder {
    @ManyToOne(() => IssueType)
    issueType!: IssueType;

    @Column()
    dataType!: IssueFieldDataType;
}