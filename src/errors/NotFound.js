class NotFound extends Error {
    constructor() {
        super("Resource not found.");
        this.name = "Not Found";
        this.id = 1;
    }
}

module.exports = NotFound;