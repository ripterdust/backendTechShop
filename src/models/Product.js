export class Product{


    constructor(id, name = null, category = null, price = null, quantity = null, imgLink = null, description = null){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price,
        this.quantity = quantity;
        this.imgLink = imgLink;
        this.description = description;
    }
}