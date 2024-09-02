import runQuery from "../db/dal";
import { promises as fs } from "fs";
import { appConfig } from "./appConfig";

export async function isDbServerUp() {    
    try {
        await runQuery("select 1;");
        return true;
    } catch (error) {
        return false;        
    }
}

async function writeToFile(filepath: string, content: string) {
    await fs.appendFile(filepath, content + "\n");
}

export async function writeErrorLog(errMsg: string) {    
    writeToFile(appConfig.errorLogFile, errMsg);
}

export async function writeAccessLog(msg: string) {
    writeToFile(appConfig.accessLogFile, msg);
}
