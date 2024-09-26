"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
if (!(0, fs_1.existsSync)(".env")) {
    throw new Error("ENV file is missing (.env)");
}
// load enviroment variables
dotenv_1.default.config();
class BaseAppConfig {
    constructor() {
        this.routePrefix = "/api/v1";
        this.errorLogFile = __dirname + "\\..\\logs\\error.log";
        this.accessLogFile = __dirname + "\\..\\logs\\access.log";
        this.doormanKey = process.env.DOORMAN_KEY;
        this.jwtSecrete = process.env.JWT_SECRET;
        this.dbConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        };
    }
}
class DevAppconfig extends BaseAppConfig {
    constructor() {
        super(...arguments);
        this.port = 4000;
        this.dbConfig = Object.assign(Object.assign({}, this.dbConfig), { host: process.env.DB_HOST, port: 3306, database: 'store' });
    }
}
class ProdAppconfig extends BaseAppConfig {
    constructor() {
        super(...arguments);
        this.errorLogFile = "/app/logs/error.log";
        this.accessLogFile = "/app/logs/access.log";
        this.port = 4000;
        this.dbConfig = Object.assign(Object.assign({}, this.dbConfig), { host: process.env.DB_HOST, port: 3306, database: 'store' });
    }
}
exports.appConfig = process.env.IS_PRODUCTION === "true"
    ? new ProdAppconfig()
    : new DevAppconfig();
