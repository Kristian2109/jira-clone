import { PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

export default abstract class BaseEntity {
    @PrimaryGeneratedColumn("identity")
    id!: number

    @CreateDateColumn()
    createdAt!: string
}