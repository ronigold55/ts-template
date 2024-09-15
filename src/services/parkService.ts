import runQuery from "../db/dal";
import { ParkModel } from "../models/parkModel";
import { ResultSetHeader } from "mysql2";

export async function updateParkIsTaken(
  id: number,
  isTaken: boolean
): Promise<void> {
  await runQuery(`
        UPDATE park
        SET isTaken = ${isTaken}
        WHERE id = ${id}
    `);
}

export async function getAllParks(): Promise<any[]> {
    const result = await runQuery(`
        SELECT park.id, park.isFree, park.isTaken, 
               address.city, address.street, address.number
        FROM park
        JOIN address ON park.address_id = address.id
    `);
    
    return result;
}