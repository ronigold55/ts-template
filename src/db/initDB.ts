import runQuery from "./dal";

export async function createTables(): Promise<void> {
    await runQuery(`
        CREATE TABLE  IF NOT EXISTS address (
            id SERIAL PRIMARY KEY,
            city VARCHAR(50) NOT NULL ,
            street VARCHAR(50) NOT NULL ,
            number INT NOT NULL
        );
    `);

    await runQuery(`
        CREATE TABLE IF NOT EXISTS  park (
            id SERIAL PRIMARY KEY,
            isFree BOOLEAN,
            isTaken BOOLEAN,
            address_id INT REFERENCES address(id)
        );
    `);
}

export async function createSampleData(): Promise<void> {
    await runQuery(`
        INSERT INTO address (city, street, number) 
        VALUES ('Grapevine', 'Main St', 101),
               ('Grapevine', '2nd St', 202),
               ('jerusalem', 'hakhmi St', 5),
               ('tel-aviv', 'Alenbi St', 69);
              
    `);

    await runQuery(`
        INSERT INTO park (isFree, isTaken, address_id) 
        VALUES (true, false, 1),
               (false, true, 2),
               (true, true, 3),
               (false, true, 4),
               (true, false, 1),
               (false, false, 2),
               (true, false, 3),
               (false, false,4)
    `);
    
}

async function init() {
    await createTables();
    await createSampleData();
    
}

init()
