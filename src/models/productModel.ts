class ProdcutModel {
    id: number;
    name: string;
    price: number;
    description: string;

    constructor(pm: ProdcutModel){
        this.id = pm.id;
        this.name = pm.name;
        this.description = pm.description;
        this.price = pm.price;
    }
}

export default ProdcutModel;