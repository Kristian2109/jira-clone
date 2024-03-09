import { PrimaryGeneratedColumn, CreateDateColumn, Entity } from "typeorm"
import { OrderNumber } from "../types/project"

@Entity()
export default abstract class EntityWithOrder {
    orderNumber!: OrderNumber;
}