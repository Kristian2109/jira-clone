import { UserFields } from "./forms";
import { Issue, IssueField, IssueType, ProjectType } from "./project";

export type FieldContentCreate = {
  content: string;
  issueFieldId: number;
};

export type IssueCreate = {
  summary: string;
  issueTypeId: number;
  fields: FieldContentCreate[];
};

export type IssueFieldContent = {
  issueField: IssueField;
  content: string;
  id: number;
  createdAt: string;
};

export interface IssueTypeWithFields extends IssueType {
  issueFields: IssueField[];
}

export interface IssueWithFields extends Issue {
  fields: IssueFieldContent[];
  issueType: IssueType;
  createdBy: UserFields;
  project: ProjectType;
}
