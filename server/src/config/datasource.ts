import { DataSource, DataSourceOptions } from "typeorm";
import UserAccount from "../entities/userAccount";
import dotenv from "dotenv"
import UserAddress from "../entities/address";
import Project from "../entities/project";
import Board from "../entities/board";
import ProjectMember from "../entities/projectMember";
import BoardColumn from "../entities/boardColumn";
import InternalUserLogin from "../entities/internalUserLogin";
import ExternalUserLogin from "../entities/externalUserLogin";
import ExternalProvider from "../entities/externalProvider";
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
        Board, 
        ProjectMember,
        BoardColumn,
        ExternalProvider,
        InternalUserLogin,
        ExternalUserLogin
    ],
    synchronize: true
}

export const AppDataSource = new DataSource(mysqlConfig);