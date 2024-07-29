import runQuery from "./dal"

const createTables = async () => {
    let Q = `
        CREATE TABLE IF NOT EXISTS user  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            isAdmin BOOLEAN DEFAULT false,
            token VARCHAR(255)
        );
    `
    await runQuery(Q);

    Q = `
        CREATE TABLE IF NOT EXISTS product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(1000),
            price DECIMAL(10, 2) NOT NULL
        )
    `
    await runQuery(Q)

    Q = `
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL, 
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        comments VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES user(id)
            )
            `
    await runQuery(Q)

    Q = `
    CREATE TABLE IF NOT EXISTS orderItem (
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
        )
        `
    await runQuery(Q)
}

const createSampleData = async ()=>{
    let Q = `
        INSERT INTO user (username, password, email, isAdmin, token) values 
        ('David', '123', 'david@gmail.com', false, 'awvasnvsae45rtq23wf'),
        ('Moshe', '123', 'moshe@gmail.com', false, 'awvasnvsae45rtq23wf564'),
        ('Ori', '123', 'ori@gmail.com', true, 'awvasnvsae45rtq2323rsdcvwf');        
    `
    await runQuery(Q);
    
    Q = `
    INSERT INTO product (name, price, description) values 
        ('apple', 3.5, 'Greate apple from the OTEF'),
        ('banana', 7, 'Greate Banana from the OTEF'),
        ('orange', 2, ''),
        ('bamba', 1, 'Isreali bamba')
    `
    await runQuery(Q);
    
    Q = `
    INSERT INTO orders (user_id, comments) values 
            (1, 'please do not ring the bell!'),
            (2, ''),
            (2, 'hurry up!')
            `   
    await runQuery(Q);
    
    Q = `
    INSERT INTO orderItem (order_id, product_id, quantity) values
            (1, 2, 1),
            (1, 1, 2),
            (1, 3, 4),
            
            (2, 1, 4),
            (2, 3, 4),            
            
            (3, 1, 2),
            (3, 2, 1),
            (3, 3, 4),
            (3, 4, 2)
            `
    await runQuery(Q);            
}

// createTables().then(() => {
//     console.log("Done creating tables");
// })

// createSampleData().then(()=>{console.log("Done adding data");})
