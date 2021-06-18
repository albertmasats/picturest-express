const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  password: String,
  username: String,
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  ],
});

const UserModel = mongoose.model("UserModel", UserSchema);

const create = async (user) => {
  const userCreated = await UserModel.create(user);
  return userCreated;
};

const getAll = async () => {
  const users = await UserModel.find();
  return users;
};

const search = async (query) => {
  const user = await UserModel.findOne(query);
  return user;
};

const getOne = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

module.exports = {
  create,
  getAll,
  getOne,
  search,
};
