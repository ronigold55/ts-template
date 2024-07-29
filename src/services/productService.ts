import runQuery from "../db/dal";
import ProdcutModel from "../models/productModel";

export async function getAllProducts(): Promise<ProdcutModel[]> {
    const q = `SELECT * FROM product;`
    const res = await runQuery(q);
    
    const products = res.map((p)=>new ProdcutModel(p));        
    return products
}