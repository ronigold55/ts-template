import express, { Request, Response } from "express"
import { prodcutRouter } from "./controllers/productControllers";
import { appConfig } from "./utils/appConfig";
import { isDbServerUp } from "./utils/helpers";

const server = express();

// load body
server.use(express.json());

// register controllers
server.use("/", prodcutRouter)


isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})
