import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../baseEntity";
import Issue from "./issue";
import IssueField from "./issueField";

@Entity()
export default class IssueFieldContent extends BaseEntity {
    @ManyToOne(() => Issue)
    issue!: Issue;

    @ManyToOne(() => IssueField) 
    issueField!: IssueField;

    @Column()
    content!: string;

    constructor(issueField: IssueField, content: string) {
        super();
        this.issueField = issueField;
        this.content = content;
    }
}