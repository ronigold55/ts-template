import runQuery from "../db/dal";
import { ResultSetHeader } from "mysql2";


type serverData = {
    id: number;
    serverName : string;
    ip:number;
    isOnLine: boolean;
    isFree: boolean;
    hostingCompany: string;
    datetime: number;    
    num: number;
}

export async function getServer(): Promise<serverData[]> {
    let q = `SELECT servers.id, servers.isOnLine, servers.isFree, address.city, address.street, address.num FROM serverName JOIN address ON park.address_id = address.id;`;
    const servers = await runQuery(q);
    return servers
}

export async function updateOnLine(id: number, newValue: boolean) {
    let q = `UPDATE server SET  isOnLine = ${newValue} WHERE id=${id};`;
    const res = (await runQuery(q)) as ResultSetHeader | any;
    if (res.affectedRows === 0){
        console.log("Warning: try to update non-exists server");        
    }    
}

// updateOccupied(100, false).then(()=>{console.log("Done");
// })