class NotFound extends Error {
    constructor(resource) {
        super(`${resource.toUpperCase()} not found.`);
        this.name = "Not Found";
        this.id = 1;
    }
}

module.exports = NotFound;