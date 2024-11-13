import { NextFunction, Request, Response } from "express";
import { appendFile } from 'fs';
import config from "../2-utils/config";
import logger from "../2-utils/logger";
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // Log error to console:
    console.log(err);

    const status = err.status || 500;

    if (status === 500) {

        logger.logError("catchAll error", err);

    }    

    // log error to log file...

    appendFile(config.errorLog, `${err}\n`, (err) => {
        if (err) console.error('Error writing to log:', err);
      });
    // Get status code: 
    const statusCode = err.status ? err.status : 500;

    // Return error to frontend: 
    response.status(statusCode).send("Something wrong ! please try later");
}

export default catchAll;


