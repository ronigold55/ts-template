import { appConfig } from "../utils/appConfig";
import mysql from "mysql2";


const connection = mysql.createPool({
    host: appConfig.dbConfig.host,
    user: appConfig.dbConfig.user,
    password: appConfig.dbConfig.password,
    database: appConfig.dbConfig.database,
    port: appConfig.dbConfig.port
})

export default function runQuery(q: string, p0?: (number | "active" | "inactive")[]): Promise<any[]> {
    return new Promise((resolve, reject) => {

        connection.query(q, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res as any[]);
        })
    });
}