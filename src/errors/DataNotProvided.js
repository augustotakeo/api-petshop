class DataNotProvided extends Error{
    constructor() {
        super("Data Not Provided");
        this.name = "Data Not Provided";
        this.id = 2;
    }
}

module.exports = DataNotProvided;