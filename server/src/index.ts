import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app: Application = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("server is listening on port: " + 3000);
});
