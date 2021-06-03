const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    name: String,
    urlImg: String,
    subTitle: String,
    userId: mongoose.Schema.Types.ObjectId
});

const PinModel = mongoose.model("pins", PinSchema);

const create = async (pin) => {
    const pinCreated = await PinModel.create(pin);
    return pinCreated;
};

const getAll = async () => {
    const pins = await PinModel.find();
    return pins;
};

module.exports = {
    create,
    getAll,
};
