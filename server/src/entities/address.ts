import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./baseEntity";

@Entity()
export default class Address extends BaseEntity{
    @Column()
    country!: string;
    
    @Column()
    state!: string;

    @Column()
    city!: string;
    
    @Column()
    streetName?: string;

    @Column()
    streetNumber?: number;
    
    @Column()
    postalCode?: string;

}