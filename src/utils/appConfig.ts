import dotenv from "dotenv"
import { existsSync } from "fs";

if (!existsSync(".env")){
    throw new Error("ENV file is missing (.env)")
}


// load enviroment variables
dotenv.config()

class BaseAppConfig {
    readonly routePrefix = "/api/v1";
    readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly doormanKey = process.env.DOORMAN_KEY;
    readonly jwtSecrete = process.env.JWT_SECRET;

    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'store',
        user: 'root',
        password: ''
    }

}

class DevAppconfig extends BaseAppConfig {
    readonly port: number = 4000
    readonly dbConfig = {
        ...this.dbConfig,
        host: 'localhost',
        port: 3306,
        database: 'store',
        user: 'root',
        password: ''
    }
}

class ProdAppconfig extends BaseAppConfig {
    readonly errorLogFile = "/app/logs/error.log";
    readonly accessLogFile = "/app/logs/access.log";
    readonly port: number = 4000
    readonly dbConfig = {
        ...this.dbConfig,
        host: 'localhost',
        port: 3306,
        database: 'store',
        user: 'root',
        password: ''
    }
}


export const appConfig = process.env.IS_PRODUCTION === "true"
    ? new ProdAppconfig()
    : new DevAppconfig();