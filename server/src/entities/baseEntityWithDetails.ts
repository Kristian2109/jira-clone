import { Column } from "typeorm"
import BaseEntity from "./baseEntity";

export default abstract class BaseEntityWithDetails extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    description!: string;
}