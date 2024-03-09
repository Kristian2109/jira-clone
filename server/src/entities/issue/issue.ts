import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "../baseEntity";
import IssueType from "./issueType";
import UserAccount from "../account/userAccount";
import IssueFieldContent from "./issueFieldContent";
import BoardColumn from "../project/boardColumn";

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

    @JoinColumn()
    @OneToMany(() => IssueFieldContent, issueField => issueField.issue, {cascade: true})
    fields!: IssueFieldContent[];

    @ManyToOne(() => BoardColumn)
    boardColumn?: BoardColumn;
}