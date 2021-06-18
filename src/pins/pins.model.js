const mongoose = require("mongoose");

const pinModelSchema = mongoose.Schema({
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BoardModel",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  source: mongoose.Schema.Types.String,
  urlImage: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
});

const PinModel = mongoose.model("PinModel", pinModelSchema);

const create = async (pin) => {
  const pinCreated = await PinModel.create(pin);
  return pinCreated;
};

const getAll = async () => {
  const pins = await PinModel.find();
  return pins;
};

const search = async (query) => {
  return await PinModel.find(query);
};

const getAllOfUser = (module.exports = {
  create,
  getAll,
  search,
});
