import { DataSource, DataSourceOptions } from "typeorm";
import UserAccount from "../entities/userAccount";
import dotenv from "dotenv"
import UserAddress from "../entities/address";
dotenv.config()

const mysqlConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [UserAccount, UserAddress],
    synchronize: true,
    dropSchema: true,
    
}

export const AppDataSource = new DataSource(mysqlConfig);