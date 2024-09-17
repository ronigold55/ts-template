import runQuery from "./dal";
import { closeDB } from "./dal";

export async function createTables(): Promise<void> {
    let query = `
        CREATE TABLE IF NOT EXISTS company (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name ENUM('Microsoft', 'IBM', 'GoDaddy', 'DigitalO') NOT NULL
        );
    `;
    await runQuery(query);
    query = `
        CREATE TABLE IF NOT EXISTS server (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            ip VARCHAR(45) NOT NULL,
            hosting_id INT,
            status ENUM('active', 'inactive') NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY  (hosting_id) REFERENCES company(id)
        );
    `;
    await runQuery(query);
}

const createSampleData = async ()=>{
    let q = `
        INSERT INTO company (name) VALUES 
        ('Microsoft'),
        ('IBM'),
        ('GoDaddy'),
        ('DigitalO');
    `;
    await runQuery(q);
    q = `
        INSERT INTO server (name, ip, hosting_id, status) VALUES 
        ('Mineville', '192.168.1.1', 1, 'active'),
        ('The Hive', '192.168.1.2', 2, 'inactive'),
        ('LifeBoat', '192.168.1.3', 3, 'active'),
        ('The Sandlot', '192.168.1.4', 4, 'inactive'),
        ('Skyblock', '192.168.1.5', 4, 'active'),
        ('SootMC', '192.168.1.6', 3, 'inactive'),
        ('Verdux', '192.168.1.7', 2, 'active'),
        ('Manacube', '192.168.1.8', 1, 'inactive'),
        ('PixelmonCraft', '192.168.1.9', 1, 'active'),
        ('PirateCraft', '192.168.1.10', 2, 'inactive'),
        ('Westeros', '192.168.1.11', 3, 'active'),
        ('GrandAuto', '192.168.1.12', 4, 'inactive'),
        ('OplLegends', '192.168.1.13', 4, 'active'),
        ('Pnguin', '192.168.1.14', 2, 'inactive'),
        ('MNR', '192.168.1.15', 3, 'active'),
        ('RanchWarrior', '192.168.1.16', 1, 'inactive');
    `;
    await runQuery(q);
};

const createMoreSampleData = async ()=>{
    let q = `
        INSERT INTO server (name, ip, hosting_id, status) VALUES 
        ('Netherite', '192.168.1.17', 1, 'active'),
        ('Minro', '192.168.1.18', 2, 'inactive'),
        ('VortexIl', '192.168.1.19', 3, 'active'),
        ('IntensityCraft', '192.168.1.20', 4, 'inactive');
    `;
    await runQuery(q);
};

// // createTables().then(() => console.log("Done Table!!!"));
// // createSampleData().then(() => console.log("Done Data!!!"));
// createMoreSampleData().then(() => console.log("Done Data!!!"));

async function init() {
    // await createTables().then(() => console.log("Done Table!!!"));
    // await createSampleData().then(() =>console.log("Done Data!!!"))
     createMoreSampleData().then(() => console.log("Done Data!!!")).then(()=> {
        closeDB();
    
    });
}

init();