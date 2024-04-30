export type ProjectType = {
  id: number;
  createdAt: string;
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
