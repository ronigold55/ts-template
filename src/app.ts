import cors from "cors"
import express from "express";
import { appConfig } from "./utils/appConfig";
import { serverRoutes } from "./controllers/server.controller";
import catchAll from "./middlewares/catchAll";


const server = express();

// server.use(cors())
// cors
server.use(cors({origin: ["http://localhost:3000", "http://localhost:3001"]}));

//use json
server.use(express.json());


// server.use(express.json());

server.use("/", serverRoutes);

server.use(catchAll);

server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`)})