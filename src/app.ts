import express, { Request, Response } from "express"
import { appConfig } from "./utils/appConfig";
import { parkRouter } from "./controllers/parkControllers";
import catchAll from "./controllers/catchAll";
import cors from "cors";

const server = express();

// // allow cors
// let corsOption = {
//     origin :['http://localhost:${appConfig.port}'],
//     // origin :['http://localhost:3500'],
// }
// server.use(cors(corsOption));
// cors
server.use(cors({origin: ["http://localhost:3000", "http://localhost:3001"]}));

server.use(cors());

// load body
server.use(express.json());

// register controllers
server.use(parkRouter)

// catch-all
server.use(catchAll)

// run server
server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`);
})