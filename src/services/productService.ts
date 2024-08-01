import runQuery from "../db/dal";
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

export async function addProdcut(p:ProdcutModel) {
    const q = `INSERT INTO product (name, description, price) 
                VALUES ('${p.name}', '${p.description || ""}', ${p.price})`;
        
    await runQuery(q);
}