import { UserFields } from "./forms";
import { Issue, IssueField, IssueType, ProjectType } from "./project";

export type FieldContent = {
  content: string;
  issueFieldId: number;
};

export type IssueCreate = {
  summary: string;
  issueTypeId: number;
  fields: FieldContent[];
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

export interface IssueUpdate {
  summary: string;
  fields: FieldContent[];
}
