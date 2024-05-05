import { NamedObject } from "./generic";

export interface BoardColumn extends NamedObject {
  orderNumber: number;
}

export interface Board extends NamedObject {
  boardColumns: BoardColumn[];
}
