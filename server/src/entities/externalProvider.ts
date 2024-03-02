import {  Column, Entity} from "typeorm"
import BaseEntity from "./baseEntity"

@Entity()
export default class ExternalProvider extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    webServiceEndpoint!: string
}