import { DataSource, DataSourceOptions } from "typeorm";
import UserAccount from "../entities/userAccount";
import dotenv from "dotenv"
import UserAddress from "../entities/address";
import Project from "../entities/project";
import ProjectView from "../entities/projectView";
import ProjectViewCategory from "../entities/projectViewCategory";
import ProjectMember from "../entities/projectMember";
import BoardColumn from "../entities/boardColumn";
dotenv.config()

const mysqlConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
        UserAccount,
        UserAddress, 
        Project, 
        ProjectView, 
        ProjectViewCategory,
        ProjectMember,
        BoardColumn
    ],
    synchronize: true,
    dropSchema: true,
    
}

export const AppDataSource = new DataSource(mysqlConfig);