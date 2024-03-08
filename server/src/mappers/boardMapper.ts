import BoardColumn from "../entities/project/boardColumn";
import { BorderColumnCreate } from "../types/project";

export default class BoardColumnMapper {
    public static toColumn(columnDTO: BorderColumnCreate): BoardColumn {
        let columnToCreate = new BoardColumn();

        columnToCreate.name = columnDTO.name;
        columnToCreate.description = columnDTO.description || "";
        columnToCreate.orderNumber = columnDTO.orderNumber;

        return columnToCreate;
    }

}