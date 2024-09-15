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



export async function updateOnLine(
    id: number,
    statusOnline: boolean
  ): Promise<void> {
    await runQuery(`
          UPDATE serverName
          SET statusOnline = ${statusOnline}
          WHERE id = ${id}
      `);
  }