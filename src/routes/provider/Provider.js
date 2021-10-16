const ProviderTable = require('./ProviderTable');
const InvalidField = require('../../errors/InvalidField');
const DataNotProvided = require('../../errors/DataNotProvided');

class Provider {
    constructor({ id, company, email, category, createdAt, updatedAt}) {
        this.id = id;
        this.company = company;
        this.email = email;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async create() {
        this.validate();

        const data = {
            company: this.company,
            email: this.email,
            category: this.category
        }

        const result = await ProviderTable.create(data);

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;

    }

    async searchById(id) {
        const result =  await ProviderTable.searchById(id);
        this.company = result.company;
        this.email = result.email;
        this.category = result.category;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

    async update() {
        await ProviderTable.searchById(this.id);
        const fields = ["company", "email", "category"];
        const data = {};

        fields.forEach( field => {
            if(this[field]){
                data[field] = this[field];
            }
        })

        if(Object.keys(data).length == 0){
            throw new DataNotProvided();
        }
        await ProviderTable.update(this.id, data);
    }

    delete() {
        ProviderTable.delete(this.id);
    }

    validate() {
        const fields = ["company", "email", "category"];
        fields.forEach( field => {
            const value = this[field];
            if( typeof value != "string" || value.length == 0) {
                throw new InvalidField(field);
            }
        } )
    }
}

module.exports = Provider;