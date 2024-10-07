import express, { Request, Response } from "express"
import handleScketIO from "./services/socket-service";

const server = express();

const expressServer = server.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
})

handleScketIO(expressServer);
