class ProductModel {
    static deleteProduct(id: string) {
        throw new Error("Method not implemented.");
    }
    id: number;
    name: string;
    price: number;
    description: string;
    findById: number



    constructor(pm: ProductModel){
        this.id = pm.id;
        this.name = pm.name;
        this.description = pm.description;
        this.price = pm.price;
    }
}

export default ProductModel;