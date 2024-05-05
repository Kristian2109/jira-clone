import { NamedObject } from "./generic";
import { Issue } from "./project";

export interface BoardColumn extends NamedObject {
  orderNumber: number;
  issues: Issue[];
}

export interface Board extends NamedObject {
  boardColumns: BoardColumn[];
}

export interface BoardColumnCreate {
  name: string;
  description: string;
  orderNumber: number;
}
