import { UserFields } from "./forms";

export interface ProjectType {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  key: string;
}

export type IssueField = {
  name: string;
  description: string;
  orderNumber: number;
  dataType: string;
  id: number;
  createdAtc: string;
};

export interface IssueTypeWithFields extends IssueType {
  issueFields: IssueField[];
}

export type IssueFieldDataType = "string" | "number" | "person";

export type IssueFieldCreate = {
  name: string;
  description: string;
  dataType: string;
  orderNumber: number;
};

export type ProjectMember = {
  user: UserFields;
  status: string;
  role: string;
  id: number;
  createdAt: string;
};

export interface ProjectWithAllData extends ProjectType {
  members: ProjectMember[];
  issueTypes: IssueType[];
}

export type CreateProject = {
  name: string;
  description: string;
  key: string;
};

export type Issue = {
  id: number;
  createdAt: string;
  summary: string;
  key: string;
  isCompleted: boolean;
  issueType: IssueType;
};

export interface IssueType {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  project: ProjectType;
}
