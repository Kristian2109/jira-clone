import { Column } from "typeorm"

export default class NameAndDescription {
    @Column({type: "varchar" , length: 128})
    name!: string;

    @Column({type: "varchar", length: 1024})
    description!: string;
}
