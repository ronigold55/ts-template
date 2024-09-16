import cors from "cors"
import express from "express";
import { appConfig } from "./utils/appConfig";
import catchAll from "./middlewares/catchAll";
import { serverRoutes } from "./controllers/serverControllers";


const server = express();

server.use(cors())

server.use(express.json());

server.use("/", serverRoutes);

server.use(catchAll);

server.listen(appConfig.port, ()=>{console.log(`Listening on http://localhost:${appConfig.port}`)})
