import { UserFields } from "./forms";

export interface ProjectType {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  key: string;
}

export type ProjectMember = {
  user: UserFields;
  status: string;
  role: string;
  id: number;
  createdAt: string;
};

export interface ProjectWithMembers extends ProjectType {
  members: ProjectMember[];
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

export type IssueType = {
  id: number;
  createdAt: string;
  name: string;
  description: string;
  project: ProjectType;
};
