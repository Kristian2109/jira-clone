import { DataSource, DataSourceOptions } from "typeorm";
import UserAccount from "../entities/account/userAccount";
import dotenv from "dotenv";
import UserAddress from "../entities/account/address";
import Project from "../entities/project/project";
import Board from "../entities/project/board";
import ProjectMember from "../entities/project/projectMember";
import BoardColumn from "../entities/project/boardColumn";
import InternalUserLogin from "../entities/account/internalUserLogin";
import ExternalUserLogin from "../entities/account/externalUserLogin";
import ExternalProvider from "../entities/account/externalProvider";
import Issue from "../entities/issue/issue";
import IssueType from "../entities/issue/issueType";
import IssueField from "../entities/issue/issueField";
import IssueFieldContent from "../entities/issue/issueFieldContent";
dotenv.config();

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
    ExternalUserLogin,
    IssueType,
    IssueField,
    Issue,
    IssueFieldContent,
  ],
  synchronize: true,
};

export const AppDataSource = new DataSource(mysqlConfig);
