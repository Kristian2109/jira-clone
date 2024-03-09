import { injectable } from "inversify";
import BaseEntityWithDetailsAndOrder from "../entities/baseEntityWIthDetailsAndOrder";

@injectable()
export default class OrderNumberManager<TypeOfElement extends BaseEntityWithDetailsAndOrder> {
    public addNewColumnAndSetOrder(columns: TypeOfElement[], newColumn: TypeOfElement) {
        const currentColumnsCount = columns.length;
        if (currentColumnsCount < newColumn.orderNumber) {
            newColumn.orderNumber = currentColumnsCount + 1;
        } else {
            columns.forEach(column => {
                if (column.orderNumber >= newColumn.orderNumber) {
                    column.orderNumber++;
                }
            })
        }
        columns.push(newColumn);
    }

    public deleteColumnAndSetOrder(columns: TypeOfElement[], columnToDeleteIndex: number) {
        const toDeleteOrder = columns[columnToDeleteIndex].orderNumber;
        columns.forEach(column => {
            if (column.orderNumber > toDeleteOrder) {
                column.orderNumber--;
            }
        })

        columns.splice(columnToDeleteIndex, 1);
    }
}