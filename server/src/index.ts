import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv'

import { AppDataSource } from "./config/datasource";

dotenv.config()
const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source running on port: " + process.env.MYSQL_PORT);
    } catch (error) {
        console.error("Data Source cannot be loaded!")
        console.error(error);
    }

    console.log("Server is listening on port: " + PORT);
});
