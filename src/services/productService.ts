import assert from "assert";
import runQuery from "../db/dal";
import ProductModel from "../models/productModel";
import { ValidationError } from "../models/exceptions";

export async function getProducts(id?: number): Promise<ProductModel[]> {
    let q = `SELECT * FROM product`;

    if (id)
        q += ` WHERE id = ${id}`
    
    const res = await runQuery(q);    
    
    if (res.length === 0 && id){
        throw new Error("product id not found")
    }

    const products = res.map((p) => new ProductModel(p));
    return products
}

export async function addProduct(p:ProductModel) {

    p.validate()

    const q = `INSERT INTO product (name, description, price) 
                VALUES ('${p.name}', '${p.description || ""}', ${p.price})`;
        
    await runQuery(q);
}

export async function updateProduct(p: Partial<ProductModel>, id: number) {
    
    if(! p.name && !p.price && !p.description){
        throw new ValidationError("No field specified to update!");
    }

    let products = await getProducts(id);
    const product = {...products[0], ...p};
    
    product.validate()

    const updateQuery = `
    UPDATE product SET name=${product.name }, 
                       price=${product.price},
                       description=${product.description}
            WHERE id=${product.id};`

    await runQuery(updateQuery);   
}