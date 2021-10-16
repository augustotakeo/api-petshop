const jsontoxml = require('jsontoxml');
const ValueNotSupported = require('./errors/ValueNotSupported');

class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {

        let tag = this.tagSingular;

        if( Array.isArray(data) ) {
            data = data.map( element => {
                return { [tag]: element };
            })

            tag = this.tagPlural;
        }
        
        data = { [tag]: data };

        return jsontoxml(data);
    }

    filterObject(data) {
        let filteredData = {};
        
        this.publicFields.forEach( field => {
            if( data.hasOwnProperty(field) ) {
                filteredData[field] = data[field];
            };
        });

        return filteredData;
    }

    filter(data) {
        
        if(!Array.isArray(data)) {
            return this.filterObject(data);
        }

        return data.map( element => this.filterObject(element) );

    }

    serialize(data) {

        data = this.filter(data);
        
        if( this.contentType == "application/json" ) {
            return this.json(data);
        }

        if( this.contentType == "application/xml" ) {
            return this.xml(data);
        }

        throw new ValueNotSupported();

    }
}

class ProviderSerializer extends Serializer {
    constructor( contentType, extraField ) {
        super();
        this.contentType = contentType;
        this.publicFields = ["id", "company", "category"].concat( extraField || [] );
        this.tagSingular = "provider";
        this.tagPlural = "providers";
    }
}

class ErrorSerializer extends Serializer {
    constructor( contentType, extraField ) {
        super();
        this.contentType = contentType;
        this.publicFields = ["error", "id"].concat( extraField || [] );
        this.tagSingular = "error";
        this.tagPlural = "errors";
    }
}

module.exports = {
    Serializer,
    ProviderSerializer,
    ErrorSerializer,
    Accept: ["application/json", "application/xml"]
}