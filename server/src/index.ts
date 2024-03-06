import "reflect-metadata"
import container from "./inversify.config";
import express, { Application, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv'

import { AppDataSource } from "./config/datasource";
import ErrorHandler from "./middleware/errorHandler";
import ViewCategoriesInserted from "./bootstrap/categoriesInserter";

dotenv.config()
const PORT = process.env.PORT || 8080;

const myApp = express();
myApp.use(bodyParser.urlencoded({extended: true}));
myApp.use(express.json());
myApp.use(cors());

const config = new InversifyExpressServer(container, myApp)
const app: Application = config.build();
app.use(ErrorHandler.handleError);

app.listen(PORT, async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source running on port: " + process.env.MYSQL_PORT);
        await ViewCategoriesInserted.setUpViewCategories();
    } catch (error) {
        console.error("Data Source cannot be loaded!")
        console.error(error);
    }

    console.log(`Server is listening on port: ${PORT}`);
});
