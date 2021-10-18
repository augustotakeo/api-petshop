const ProductsTable = require('./ProductsTable');

class Product {
    constructor({ id, title, description, price, inventory, provider_id, createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.inventory = inventory;
        this.provider_id = provider_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async create() {
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
    }
}

module.exports = Product;