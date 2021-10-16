class InvalidField extends Error {
    constructor(field) {
        super(`Field ${field} is invalid`);
        this.name = "Invalid Field";
        this.id = 0;
    }
}

module.exports = InvalidField;