import { PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

export default abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    createdAt!: Date
}