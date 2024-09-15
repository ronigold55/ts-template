import express, { Request, Response } from "express"
import { appConfig } from "./utils/appConfig";
import { serverRouters } from "./controllers/serverController";
import catchAll from "./middlewares/catchAll";
import  cors  from "cors";

// create server
const server = express();

// cors
server.use(cors({origin: ["http://localhost:3000", "http://localhost:3001"]}));

//use json
server.use(express.json());



// load body
server.use(express.json());

// register controllers:
server.use("/", serverRouters)

// catch error
server.use(catchAll)

server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
})