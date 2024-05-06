import { Board, BoardColumn, BoardColumnWithIssues } from "./board";
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
  createdAt: string;
};

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
  board: Board;
}

export type CreateProject = {
  name: string;
  description: string;
  key: string;
};

export interface Issue {
  id: number;
  createdAt: string;
  summary: string;
  key: string;
  isCompleted: boolean;
  issueType: IssueType;
  boardColumn?: BoardColumn;
}

export interface IssueType {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  project: ProjectType;
}
