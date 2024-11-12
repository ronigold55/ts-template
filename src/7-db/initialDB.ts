import execute, { closeDB } from "../2-utils/dal";

const createTables = async () => {

    // Create the roles table first
    let Q = `
        CREATE TABLE IF NOT EXISTS roles (
            roleId INT(11) NOT NULL PRIMARY KEY,
            roleName VARCHAR(10) NOT NULL
        );
    `;
    await execute(Q);

    // Create the users table
     Q = `
        CREATE TABLE IF NOT EXISTS users (
            userId INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
            firstName VARCHAR(100) NOT NULL,
            lastName VARCHAR(100) NOT NULL,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(128) NOT NULL,
            phoneNumber varchar(10) NOT NULL, 
            password VARCHAR(128) NOT NULL,  
            roleId INT(11) NOT NULL,
            FOREIGN KEY (roleId) REFERENCES roles(roleId)
        );
    `;
    await execute(Q);

    // Create the vacations table
    Q = `
        CREATE TABLE IF NOT EXISTS vacations (
            vacationId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            destination VARCHAR(50) NOT NULL,
            description VARCHAR(300) NOT NULL,
            imageName VARCHAR(50) NOT NULL,
            arrivalDate DATE NOT NULL,
            departureDate DATE NOT NULL,
            price DECIMAL(6,2) NOT NULL
        );
    `;
    await execute(Q);

    // Create the followers table
    Q = `
        CREATE TABLE IF NOT EXISTS followers (
            userId INT(11) NOT NULL,
            vacationId INT(11) NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(userId),
            FOREIGN KEY (vacationId) REFERENCES vacations(vacationId),
            PRIMARY KEY (userId, vacationId)
        );
    `;
    await execute(Q);

};



const createSampleData = async () => {

    let Q = `
    INSERT INTO roles (roleId, roleName) VALUES 
    (1, 'Admin'),
    (2, 'User');
`;
  
await execute(Q);

     Q = `
        INSERT INTO users (firstName, lastName, username, email, phoneNumber, password, roleId) VALUES 
        ('Roni', 'Gefner', 'ronigef', 'ronigef@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
        ('Avi', 'Levi', 'avilevi', 'avilevi@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2),
        ('fred', 'fred', 'fredG', 'fredG@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 1),
        ('yehi', 'guir', 'yehiG', 'yehiG@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 1),
        ('israel', 'israeli', 'israel', 'israel@gmail.com', '0545454544', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 2);
    `;

    await execute(Q);

// insert into vacations table

Q =`

         INSERT INTO vacations (destination, description, imageName, arrivalDate, departureDate, price) VALUES 

         ( 'Roma', 'The first day in Rome should be devoted to an introductory tour of the historic center of the city.', '63947fba-4cce-11ed-bdc3-0242ac120002.jpg', '2025-01-02', '2025-01-05', 450.00),
('Barcelona', 'An excellent choice for those who want to enjoy art, landscapes, food, architecture and shopping.', '20ff1e37-44e2-47f9-a1e7-bd50609cbb43.jpg', '2024-12-22', '2024-12-31', 670.00),
( 'Alaska', 'Alaska is unique and combines sea and glaciers, mountains, forests and animals.', '121c4711-1298-4420-a5de-cef088cea49b.jpg', '2025-02-10', '2025-02-20', 850.00),
( 'Budapest', 'The capital of Hungary is one of the friendliest destinations for Israelis.', '4ea33a85-0251-4ddc-a239-fd835919c9c4.jpg', '2024-11-29', '2024-12-04', 500.00),
( 'Maroco', 'Just sand and mountains? Absolutely not, fascinating culture and landscapes that are out of this world.', '8c203bc5-7152-4e57-a940-b9a5e4c7cf21.jpg', '2025-04-05', '2025-04-19', 580.00),
( 'London', 'Attracts many tourists especially to the Queens Guard and the famous Big Ben.', 'be11f594-2272-4862-9f94-e17e2244d6c3.jpg', '2024-12-04', '2024-12-12', 680.00),
( 'Sinai', 'The Sinai Peninsula enchants the Israeli traveler with great beaches and a lot of peace.', '360d7bb1-1138-4f04-a150-1942a8c62a71.jpg', '2025-02-10', '2025-03-11', 350.00),
( 'Japan', 'In recent years, Japan has become one of the most desirable and popular destinations in the world.', '3151d150-b0f1-4e39-ae60-b8f36cdf5fc0.jpg', '2025-02-22', '2025-03-05', 1100.00),
( 'Cyprus', 'The relatively cheap price makes Cyprus a popular and sought-after destination for a perfect summer vacation.', '2953b2f2-e47e-4c68-9f17-f2f1dcd64fa2.jpg', '2024-12-25', '2025-01-14', 220.00),
( 'Dubai', 'The charm of this place - from a small fishing village, has become in 60 years no less than a powerhouse.', '5412b65f-a7b0-4263-9231-e76bcb3af814.jpg', '2025-01-02', '2025-01-15', 800.00),
( 'Dublin', 'One of the most intriguing destinations in Europe for the Israeli traveler.', 'c0b87b22-4d90-40c6-bfe7-9d78e674ee4f.jpg', '2024-12-26', '2025-01-09', 580.00),
( 'Paris', 'The city of lights, romantic and chic, beauty and French style.', '3bed5d3a-f184-4700-a001-5a459de852b8.jpg', '2025-02-05', '2025-02-10', 420.00),
( 'Brazil', 'A beautiful tropical land, a land of carnivals, samba, football and a lot of shades and colors.', '3c2d15f0-949f-4f82-903e-b87691c68de2.jpg', '2025-02-26', '2025-03-10', 880.00),
( 'Arizona', 'The Grand Canyon, in northern Arizona, is one of the most impressive natural sites in the world.', '18330429-b227-4d59-9a7b-127ef9991a87.jpg', '2025-01-14', '2025-01-31', 750.00),
( 'India', 'You can decide what India is for you after you taste everything it has to offer.', '725dfb8e-dbcf-413f-b52f-7b0aa28b3869.jpg', '2025-01-01', '2025-01-13', 672.00),
( 'eilat', 'At the south of Israel.the right place to  do : sea sport ,diving  with beautiful hotels and restaurants', 'c74c1b11-7522-4103-9589-6dabb86fd56f.jpg', '2025-02-11', '2025-02-20', 550.00);


`;
await execute(Q);








//insert to followers table

 Q = `
INSERT INTO followers (userId, vacationId) VALUES 
(5, 13),
(5, 14),
(5,4);
`;

await execute(Q);


  
};        


// createTables().then(() => {
//    console.log("Done creating tables");
//     closeDB();
// })


//  createSampleData().then(()=>{console.log("Done adding data");
//     closeDB();
//  })
