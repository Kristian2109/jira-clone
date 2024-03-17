import "reflect-metadata";
import container from "./config/inversify.config";
import express, { Application, NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { AppDataSource } from "./config/datasource";
import ErrorHandler from "./middleware/errorHandler";
import { AuthenticatedRequest } from "./types/auth";
import AuthorizationManager from "./middleware/authorizationManager";
import trebble from "@treblle/express";
import JwtResolver from "./middleware/jwtResolver";
import tryCatch from "./utils/tryCatch";

dotenv.config();
const PORT = process.env.PORT || 8080;

const authManager =
  container.resolve<AuthorizationManager>(AuthorizationManager);

const config = new InversifyExpressServer(container);
config.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use(trebble());
  app.use(tryCatch(JwtResolver.resolve));
  app.use(tryCatch(authManager.authorize));
});

const app: Application = config.build();
app.use(ErrorHandler.handleError);

app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source running on port: " + process.env.MYSQL_PORT);
  } catch (error) {
    console.error("Data Source cannot be loaded!");
    console.error(error);
  }

  console.log(`Server is listening on port: ${PORT}`);
});
