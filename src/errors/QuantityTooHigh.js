class QuantityTooHigh extends Error {
    constructor() {
        super("Quantity too high");
        this.name = "Quantity Too High";
        this.id = 4;
    }
}

module.exports = QuantityTooHigh;