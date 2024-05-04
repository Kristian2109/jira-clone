export type FieldContentCreate = {
  content: string;
  issueFieldId: number;
};

export type IssueCreate = {
  summary: string;
  issueTypeId: number;
  fields: FieldContentCreate[];
};
