import runQuery from "./dal";

export async function createTables ():Promise<void> {
    let Q = `
       CREATE TABLE IF NOT EXISTS nameServer (
       id INT AUTO_INCREMENT PRIMARY KEY,
           serverName VARCHAR(255) NOT NULL,
           IP VARCHAR(15) NOT NULL,
           nameServer_id INT NOT NULL,
           FOREIGN KEY (nameServer_id) REFERENCES nameServer(id),
           created_at DATETIME DEFAULT CURRENT_TIMESTAMP
           
       );
    `;
    await runQuery(Q);

    Q = `
       CREATE TABLE IF NOT EXISTS companyNameServer (
       id INT AUTO_INCREMENT PRIMARY KEY,
           isOnline BOOLEAN NOT NULL,
           isFree BOOLEAN NOT NULL,
           hostingCompany INT NOT NULL
           
       );
    `;
    await runQuery(Q);
};

export async function createSampleData():Promise<void>{
    let Q = `
        INSERT INTO serverName (serverName, IP, nameServer_id) VALUES         
        ('Jerusalem Server', '192.168.1.1', 1),
        ('TelAviv Server', '192.168.1.2', 2),
        ('Jerusalem Backup', '192.168.1.3', 3),
        ('Ashdod Server', '192.168.1.4', 4),
        ('Batyam Server', '192.168.1.5', 5)
    `;
    await runQuery(Q);

    Q = `
    INSERT INTO nameServer (isOnline, isFree, hostingCompany) VALUES 
        (true, false, 1),
        (true, false, 2),
        (true, true, 3),
        (true, true, 2),
        (false, false, 4),
        (false, false, 5),
        (false, true, 5),
        (false, true, 1)
    `;
    await runQuery(Q);
};

async function init(){
    await createTables();
    await createSampleData();
}
init()