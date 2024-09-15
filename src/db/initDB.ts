import runQuery, { closeDB } from "./dal";

export async function createTables(): Promise<void> {
    let Q = `
       CREATE TABLE IF NOT EXISTS companyNameServer (
           id INT AUTO_INCREMENT PRIMARY KEY,
           hostingCompany VARCHAR(255) NOT NULL
       );
    `;
    await runQuery(Q);

    Q = `
       CREATE TABLE IF NOT EXISTS serverName (
           id INT AUTO_INCREMENT PRIMARY KEY,
           serverName VARCHAR(255) NOT NULL,
           IP VARCHAR(15) NOT NULL,
           companyNameServer_id INT,
           FOREIGN KEY (companyNameServer_id) REFERENCES companyNameServer(id),
           statusOnline BOOLEAN NOT NULL,          
           created dateTime DEFAULT CURRENT_TIMESTAMP
       );
    `;
    await runQuery(Q);
}

export async function createSampleData(): Promise<void> {
    let Q = `
        INSERT INTO companyNameServer (hostingCompany) VALUES         
        ('Microsoft'),
        ('IBM'),
        ('GoDaddy'),
        ('BDigitalO');
    `;
    await runQuery(Q);

    Q = `
        INSERT INTO serverName (serverName, IP, companyNameServer_id , statusOnline) VALUES         
        ('Microsoft', '192.168.1.1', 1,1),
        ('IBM', '192.168.1.2', 2,0),
        ('GoDaddy', '192.168.1.4', 3,1),
        ('BDigitalO', '192.168.1.5', 4,0);
    `;
    await runQuery(Q);
}

async function init() {
    await createTables();
    await createSampleData().then(() => {
        closeDB();
    });
}

init();
