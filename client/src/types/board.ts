import { NamedObject } from "./generic";
import { Issue } from "./project";

export interface BoardColumn extends NamedObject {
  orderNumber: number;
}

export interface BoardColumnWithIssues extends BoardColumn {
  issues: Issue[];
}

export interface Board extends NamedObject {
  boardColumns: BoardColumnWithIssues[];
}

export interface BoardColumnCreate {
  name: string;
  description: string;
  orderNumber: number;
}
