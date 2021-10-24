const ProductsTable = require('./ProductsTable');
const DataNotProvided = require('../../../errors/DataNotProvided');
const InvalidField = require('../../../errors/InvalidField');

class Product {
    constructor({ id, title, description, price, inventory, provider_id, createdAt, updatedAt, version }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.inventory = inventory;
        this.provider_id = provider_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.version = version;
    }

    async create() {
        this.validate();

        const data = {
            title: this.title,
            description: this.description,
            price: this.price,
            inventory: this.inventory,
            provider_id: this.provider_id
        }

        const result = await ProductsTable.create(data);
        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.version;
    }

    async load() {
        const result = await ProductsTable.searchById(this.id, this.provider_id);
        this.title = result.title;
        this.description = result.description;
        this.price = result.price;
        this.inventory = result.inventory;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        this.version = result.version;
    }

    remove() {
        return ProductsTable.remove(this.id, this.provider_id);
    }

    update() {

        let data = {};
        
        if(typeof this.title == "string" && this.title.length > 0) {
            data["title"] = this.title;
        }

        if(typeof this.description == "string" && this.description.length > 0) {
            data["description"] = this.description;
        }

        if(typeof this.price == "number" && this.price > 0) {
            data["price"] = this.price;
        }

        if(typeof this.inventory == "number") {
            data["inventory"] = this.inventory;
        }

        if(Object.keys(data).length == 0){
            throw new DataNotProvided();
        }

        return ProductsTable.update(this.id, this.provider_id, data);

    }
    
    async decreaseInventory({quantity}) {
        if(!quantity) {
            throw new DataNotProvided();
        }
        
        return ProductsTable.decrease(
            this.id,
            this.provider_id,
            "inventory",
            quantity
        )
    }

    validate() {
        let fields = ["title", "description"];
        fields.forEach( field => {
            if( typeof this[field] != "string" || this[field].length == 0 ) {
                throw new InvalidField(field);
            }
        })

        fields = ["price", "inventory"]
        fields.forEach( field => {
            if( typeof this[field] != "number" || this[field] <= 0 ) {
                throw new InvalidField(field);
            }
        })
    }
}

module.exports = Product;