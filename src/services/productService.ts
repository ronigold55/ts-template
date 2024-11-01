import assert from "assert";
import { runQuery } from "../db/dal";
import ProdcutModel from "../models/productModel";

export async function getProducts(id?: number): Promise<ProdcutModel[]> {
    let q = `SELECT * FROM product`;

    if (id)
        q += ` WHERE id = ${id}`

    const res = await runQuery(q);

    if (res.length === 0 && id){
        throw new Error("product id not found")
    }

    const products = res.map((p) => new ProdcutModel(p));
    return products
}

export async function addProduct(p:ProdcutModel) {
    const q = `INSERT INTO product (name, description, price) 
                VALUES ('${p.name}', '${p.description || ""}', ${p.price})`;
        
    await runQuery(q);
}

export async function updateProduct(p: Partial<ProdcutModel>, id: number) {
    let q = `SELECT id FROM product WHERE id=${id};`;
    const res = await runQuery(q);    
    assert(res.length === 1, "product id not found");    
    
    q = `UPDATE product SET `;
    if (p.name){
        q += `name = '${p.name}'`;
        if (p.description || p.price){
            q += ", ";
        }
    }
    if (p.price){
        q += `price = ${p.price}`;
        if (p.description){
            q += ", ";
        }
    }
    if (p.description){
        q += `description = '${p.description}'`;
    }

    if (! (p.description || p.name || p.price)){
        throw new Error("No filed specify to update.")
    }

    q += ` WHERE id=${id};`;
    console.log(q);
    
    await runQuery(q);    
}

export async function deleteProduct(p: ProdcutModel): Promise<void> {
    try {
        let q = 'DELETE FROM product WHERE ID = ?';
       
        console.log(`Product with ID ${p.id} has been deleted successfully.`);
        await runQuery(q);
    } catch (error) {
        console.error(`Error deleting product with ID ${p.id}:`, error);
        throw error; // Re-throw error to handle it in higher levels if needed
         // Pass the product ID as a parameter
    }
}

