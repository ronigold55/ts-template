import runQuery from "../db/dal";
import { ResultSetHeader } from 'mysql2/promise';


type serverData = {
    id: number;
    serverName : string;
    ip:number;
    hostingCompany: string;
    dateTime: number;    
    num: number;
    companyNameServer_id: number;
    statusOnline: boolean;

}

export async function getServer(): Promise<serverData[]> {
    let q = `SELECT servername.id, servername.serverName, servername.IP, servername.companyNameServer_id, servername.statusOnline ,servername.created
             FROM serverName
             JOIN companyNameServer ON servername.companyNameServer_id = companyNameServer.id;`;
    const servers = await runQuery(q);
    return servers;
}



export async function updateOnLine(id: number, newValue: boolean) {
    let q = `UPDATE servers  SET statusOnline= ${newValue} WHERE id=${id};`;
    const res = (await runQuery(q)) as ResultSetHeader | any;
    if (res.affectedRows === 0){
        console.log("Warning: try to update non-exists servers");        
    }    
}