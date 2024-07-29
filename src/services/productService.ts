import runQuery from "../db/dal";
import ProdcutModel from "../models/productModel";

export async function getProducts(id: number=undefined): Promise<ProdcutModel[]> {
    let q = `SELECT * FROM product`

    if (id)
        q += ` WHERE id = ${id}`

    const res = await runQuery(q);

    if (res.length === 0){
        throw Error("product id not found")
    }

    const products = res.map((p) => new ProdcutModel(p));
    return products
}