import runQuery from "../db/dal";

type ServerData = {
    id: number;
    name: string;
    ip: string;
    status: 'active' | 'inactive';
    created_at: string;
    company_name: string;
};

export async function getAllServers ():Promise<ServerData[]> {
    const q = `SELECT server.id, server.name, server.ip, server.status, server.created_at, company.name as company_name 
    FROM server JOIN company ON server.hosting_id = company.id`;
    const servers = await runQuery(q);
    return servers;
}

export async function updateServerStatus(id: number, newStatus: 'active' | 'inactive') {
    const q = `
        UPDATE server SET status = '${newStatus}' WHERE id = ${id};
    `;
    await runQuery(q, [newStatus, id]);
} 