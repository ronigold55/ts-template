"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = __importDefault(require("./dal"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    let Q = `
        CREATE TABLE IF NOT EXISTS user  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL ,
            isAdmin BOOLEAN DEFAULT false,
            token VARCHAR(255)
        );
    `;
    yield (0, dal_1.default)(Q);
    Q = `
        CREATE TABLE IF NOT EXISTS product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(1000),
            price DECIMAL(10, 2) NOT NULL
        )
    `;
    yield (0, dal_1.default)(Q);
    Q = `
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL, 
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        comments VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES user(id)
            )
            `;
    yield (0, dal_1.default)(Q);
    Q = `
    CREATE TABLE IF NOT EXISTS orderItem (
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
        )
        `;
    yield (0, dal_1.default)(Q);
});
const createSampleData = () => __awaiter(void 0, void 0, void 0, function* () {
    // the password is encripted version of "1234"
    let Q = `
        INSERT INTO user (username, password, email, isAdmin) values 
        ('David', '$2b$10$UgS9FHNjmQcUJ8y1FPnWvOpW4T7vgCgCvj7CEMjhDfGBiOtNdO.My', 'david@gmail.com', false),  
        ('Moshe', '$2b$10$UgS9FHNjmQcUJ8y1FPnWvOpW4T7vgCgCvj7CEMjhDfGBiOtNdO.My', 'moshe@gmail.com', false),
        ('Ori', '$2b$10$UgS9FHNjmQcUJ8y1FPnWvOpW4T7vgCgCvj7CEMjhDfGBiOtNdO.My', 'ori@gmail.com', true);        
    `;
    yield (0, dal_1.default)(Q);
    Q = `
    INSERT INTO product (name, price, description) values 
        ('apple', 3.5, 'Greate apple from the OTEF'),
        ('banana', 7, 'Greate Banana from the OTEF'),
        ('orange', 2, ''),
        ('bamba', 1, 'Isreali bamba')
    `;
    yield (0, dal_1.default)(Q);
    Q = `
    INSERT INTO orders (user_id, comments) values 
            (1, 'please do not ring the bell!'),
            (2, ''),
            (2, 'hurry up!')
            `;
    yield (0, dal_1.default)(Q);
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
            `;
    yield (0, dal_1.default)(Q);
});
// createTables().then(() => {
//     console.log("Done creating tables");
//     createSampleData().then(()=>{
//         console.log("Done adding data");
//         closeDB()
//     })
// })
