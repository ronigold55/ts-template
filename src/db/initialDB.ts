import runQuery from "./dal";
import { closeDB } from "./dal";

const createTables = async () => {
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
            FOREIGN KEY (hosting_id) REFERENCES company(id)
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
        ('Apollo', 'http://apollo', 1, 'active'),
        ('Zeus', 'http://zeus', 2, 'inactive'),
        ('Hermes', 'http://hermes', 3, 'active'),
        ('Athena', 'http://athena', 4, 'inactive');
    `;
    await runQuery(q);
};

const createMoreSampleData = async ()=>{
    let q = `
        INSERT INTO server (name, ip, hosting_id, status) VALUES 
        ('MosheSharatim', 'http://moshe', 1, 'active'),
        ('Avi', 'http://avu', 2, 'inactive'),
        ('Baruch', 'http://baruch', 3, 'active'),
        ('BambaSharatim', 'http://bamba', 4, 'inactive');
    `;
    await runQuery(q);
};

// // createTables().then(() => console.log("Done Table!!!"));
// // createSampleData().then(() => console.log("Done Data!!!"));
// createMoreSampleData().then(() => console.log("Done Data!!!"));

async function init() {
    await createTables().then(() => console.log("Done Table!!!"));
    await createSampleData().then(() =>console.log("Done Data!!!"));
    createMoreSampleData().then(() => console.log("Done Data!!!")).then(()=> {
        closeDB();
    });
}

init();