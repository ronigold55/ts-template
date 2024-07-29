import express, { Request, Response } from "express"
import { prodcutRouter } from "./controllers/productControllers";
import { appConfig } from "./utils/appConfig";

const server = express();

// load body
server.use(express.json());

// register controllers
server.use("/", prodcutRouter)

server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
})
