import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../baseEntity";
import IssueType from "./issueType";
import UserAccount from "../account/userAccount";

@Entity()
export default class Issue extends BaseEntity {
    @ManyToOne(() => IssueType)
    issueType!: IssueType;

    @Column()
    summary!: string;

    @Column()
    key!: string;

    @ManyToOne(() => UserAccount)
    createdBy!: UserAccount;
}