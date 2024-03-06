import { PrimaryGeneratedColumn, CreateDateColumn, Entity } from "typeorm"

@Entity()
export default abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;
}