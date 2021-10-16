class ValueNotSupported extends Error {
    constructor( contentType) {
        super(`The Content-Type ${contentType} is not supported`);
        this.name = "ValueNotSupported";
        this.id = 3;
    }
}

module.exports = ValueNotSupported;