import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log("server is listening on port: " + PORT);
});
